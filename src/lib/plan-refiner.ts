import type { PlanActivity, PlanDay, RefinedTripPlan, UserPlanInput } from "./types";

/** Destination-specific activity pools for local refinement */
const destinationActivities: Record<string, PlanActivity[]> = {
  trivandrum: [
    { id: "a1", time: "7:30 AM", title: "Padmanabhaswamy Temple", description: "Guided heritage walk with dress code guidance.", location: "East Fort", estimatedCost: 0 },
    { id: "a2", time: "10:00 AM", title: "Chalai Market food trail", description: "Local snacks, banana chips, and filter coffee.", location: "Chalai", estimatedCost: 400 },
    { id: "a3", time: "1:00 PM", title: "Traditional Sadya lunch", description: "Sit-down meal on banana leaf at a heritage restaurant.", location: "Statue Junction", estimatedCost: 350 },
    { id: "a4", time: "4:00 PM", title: "Kovalam beach sunset", description: "Lighthouse viewpoint and coastal walk.", location: "Kovalam", estimatedCost: 200 },
    { id: "a5", time: "9:00 AM", title: "Napier Museum & Zoo", description: "Colonial architecture and Kerala art collections.", location: "Museum", estimatedCost: 100 },
    { id: "a6", time: "3:00 PM", title: "Vizhinjam fishing village", description: "Working harbour, fresh seafood, local life.", location: "Vizhinjam", estimatedCost: 300 },
  ],
  munnar: [
    { id: "m1", time: "6:00 AM", title: "Sunrise at Top Station", description: "Early drive to panoramic viewpoint.", location: "Top Station", estimatedCost: 800 },
    { id: "m2", time: "9:30 AM", title: "Tea plantation walk", description: "Estate tour with plucking demo and tasting.", location: "KDHP Estate", estimatedCost: 500 },
    { id: "m3", time: "1:00 PM", title: "Local Kerala lunch", description: "Home-style meals near Mattupetty.", location: "Mattupetty", estimatedCost: 300 },
    { id: "m4", time: "3:30 PM", title: "Mattupetty Dam & echo point", description: "Scenic stops with short nature walks.", location: "Mattupetty", estimatedCost: 200 },
    { id: "m5", time: "8:00 AM", title: "Eravikulam National Park", description: "Nilgiri Tahr habitat; book slots in advance.", location: "Rajamalai", estimatedCost: 600 },
    { id: "m6", time: "4:00 PM", title: "Hidden waterfall trek", description: "Short guided trek off the main tourist route.", location: "Devikulam", estimatedCost: 400 },
  ],
  wayanad: [
    { id: "w1", time: "7:00 AM", title: "Chembra Peak trek", description: "Moderate trek to heart-shaped lake.", location: "Chembra", estimatedCost: 700 },
    { id: "w2", time: "2:00 PM", title: "Edakkal Caves", description: "Prehistoric petroglyphs with guided history.", location: "Edakkal", estimatedCost: 150 },
    { id: "w3", time: "9:00 AM", title: "Wildlife safari", description: "Morning slot at Muthanga or Tholpetty.", location: "Wayanad Wildlife", estimatedCost: 900 },
    { id: "w4", time: "5:00 PM", title: "Tribal village visit", description: "Respectful cultural exchange with local community.", location: "Panamaram", estimatedCost: 500 },
    { id: "w5", time: "11:00 AM", title: "Bamboo rafting", description: "Calm river stretch through forest.", location: "Kuruva Island", estimatedCost: 600 },
  ],
  varkala: [
    { id: "v1", time: "6:30 AM", title: "Cliff path sunrise walk", description: "North cliff to Black Beach stretch.", location: "North Cliff", estimatedCost: 0 },
    { id: "v2", time: "10:00 AM", title: "Janardhana Temple visit", description: "2000-year-old seaside temple.", location: "Varkala", estimatedCost: 0 },
    { id: "v3", time: "1:00 PM", title: "Cliff-side seafood lunch", description: "Fresh catch with Arabian Sea views.", location: "Cliff", estimatedCost: 600 },
    { id: "v4", time: "4:00 PM", title: "Ayurvedic consultation", description: "Intro session at a certified centre.", location: "Varkala", estimatedCost: 800 },
  ],
  default: [
    { id: "d1", time: "8:00 AM", title: "Local breakfast & market walk", description: "Start with puttu-kadala and explore morning markets.", estimatedCost: 250 },
    { id: "d2", time: "11:00 AM", title: "Heritage or nature highlight", description: "Key landmark matched to your interests.", estimatedCost: 300 },
    { id: "d3", time: "1:30 PM", title: "Authentic Kerala lunch", description: "Regional thali or seafood based on location.", estimatedCost: 400 },
    { id: "d4", time: "4:00 PM", title: "Sunset viewpoint", description: "Scenic end to the day with photo stops.", estimatedCost: 150 },
  ],
};

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

function pickActivities(slug: string, count: number, interests: string[]): PlanActivity[] {
  const pool = destinationActivities[slug] ?? destinationActivities.default;
  const text = interests.join(" ").toLowerCase();

  const scored = pool.map((a) => {
    let score = Math.random() * 0.3;
    const hay = `${a.title} ${a.description}`.toLowerCase();
    if (text.includes("food") && hay.includes("lunch")) score += 2;
    if (text.includes("trek") && hay.includes("trek")) score += 2;
    if (text.includes("temple") && hay.includes("temple")) score += 2;
    if (text.includes("beach") && hay.includes("beach")) score += 2;
    if (text.includes("wild") && hay.includes("wild")) score += 2;
    return { a, score };
  });

  scored.sort((x, y) => y.score - x.score);
  return scored.slice(0, count).map(({ a }) => ({ ...a, id: uid() }));
}

/** Rule-based refinement when no AI API key is configured */
export function refinePlanLocally(input: UserPlanInput): RefinedTripPlan {
  const slug = input.destinationSlug || "trivandrum";
  const days: PlanDay[] = [];
  const aiNotes: string[] = [
    "Spread activities across mornings and evenings to avoid midday heat.",
    "Grouped nearby locations to reduce travel time between stops.",
    "Added meal breaks at local spots instead of generic restaurants.",
  ];

  if (input.budget < input.duration * 1500) {
    aiNotes.push("Budget adjusted with free temple visits and shared transport options.");
  }

  if (input.groupSize > 4) {
    aiNotes.push("Plan paced for a group — longer lunch breaks and flexible timings.");
  }

  for (let d = 1; d <= input.duration; d++) {
    const activities = pickActivities(slug, d === 1 ? 4 : 3, input.interests);
    days.push({
      day: d,
      title: d === 1 ? "Arrival & local immersion" : d === input.duration ? "Highlights & farewell" : `Day ${d} exploration`,
      activities,
    });
  }

  const estimatedBudget = Math.min(
    input.budget,
    days.reduce(
      (sum, day) =>
        sum + day.activities.reduce((s, a) => s + (a.estimatedCost ?? 0), 0) + 1200,
      0
    )
  );

  return {
    title: `${input.duration}-Day ${input.destination} Experience`,
    destination: input.destination,
    destinationSlug: slug,
    duration: input.duration,
    summary: `A ${input.travelStyle.toLowerCase()} itinerary for ${input.groupSize} traveller${input.groupSize > 1 ? "s" : ""}, shaped around your notes: "${input.roughPlan.slice(0, 120)}${input.roughPlan.length > 120 ? "…" : ""}"`,
    estimatedBudget,
    aiNotes,
    days,
  };
}

/** Parse JSON from AI model response */
export function parseAIPlanResponse(raw: string, input: UserPlanInput): RefinedTripPlan | null {
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    const parsed = JSON.parse(jsonMatch[0]) as RefinedTripPlan;
    if (!parsed.days?.length) return null;
    parsed.days = parsed.days.map((day) => ({
      ...day,
      activities: day.activities.map((a) => ({ ...a, id: a.id || uid() })),
    }));
    parsed.destinationSlug = input.destinationSlug;
    return parsed;
  } catch {
    return null;
  }
}

export function buildAIPrompt(input: UserPlanInput): string {
  return `You are a Kerala tourism expert. Refine this rough trip plan into a practical day-by-day itinerary.

Destination: ${input.destination}
Duration: ${input.duration} days
Budget: INR ${input.budget}
Group size: ${input.groupSize}
Travel style: ${input.travelStyle}
Interests: ${input.interests.join(", ")}

Tourist's rough plan:
"""
${input.roughPlan}
"""

Return ONLY valid JSON matching this schema:
{
  "title": "string",
  "destination": "string",
  "duration": number,
  "summary": "string",
  "estimatedBudget": number,
  "aiNotes": ["string array of improvements you made"],
  "days": [
    {
      "day": 1,
      "title": "string",
      "activities": [
        {
          "id": "unique",
          "time": "8:00 AM",
          "title": "string",
          "description": "string",
          "location": "string",
          "estimatedCost": number
        }
      ]
    }
  ]
}

Use realistic Kerala locations, timings, and INR costs. Fix unrealistic pacing.`;
}
