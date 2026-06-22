import { NextResponse } from "next/server";
import {
  buildAIPrompt,
  parseAIPlanResponse,
  refinePlanLocally,
} from "@/lib/plan-refiner";
import type { UserPlanInput } from "@/lib/types";

async function callGemini(prompt: string): Promise<string | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
      }),
    }
  );

  if (!res.ok) return null;
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
}

async function callOpenAI(prompt: string): Promise<string | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You output only valid JSON for Kerala trip itineraries." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? null;
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as UserPlanInput;

    if (!input.destination || !input.roughPlan?.trim()) {
      return NextResponse.json(
        { error: "Destination and rough plan are required." },
        { status: 400 }
      );
    }

    const prompt = buildAIPrompt(input);
    const aiRaw = (await callGemini(prompt)) ?? (await callOpenAI(prompt));
    const refined = aiRaw ? parseAIPlanResponse(aiRaw, input) : null;
    const plan = refined ?? refinePlanLocally(input);

    return NextResponse.json({
      plan,
      source: refined ? "ai" : "local",
    });
  } catch {
    return NextResponse.json({ error: "Failed to refine plan." }, { status: 500 });
  }
}
