# Tourism Project - Setup & Deployment Guide

## Quick Start

### Local Development

1. **Clone and install dependencies:**
```bash
git clone https://github.com/Aswinpt2004/tourism-project.git
cd tourism-project
npm install
```

2. **Set up environment variables:**
Create a `.env.local` file in the root directory:
```bash
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Get your Gemini API key from: https://aistudio.google.com/app/apikey

3. **Run development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## AI Trip Planner Feature

### How It Works

The app features an AI-powered trip planner at `/plan-trip` that:
1. Accepts a rough travel description from users
2. Sends it to the Gemini API (or falls back to local refinement)
3. Returns a structured, day-by-day itinerary

### API Integration

**Backend Route:** `/api/plan/refine`
- **Method:** POST
- **Framework:** Next.js API Routes (Node.js)
- **Location:** `src/app/api/plan/refine/route.ts`

**How the API works from the web:**
- The frontend sends a request to `/api/plan/refine` (same origin)
- The backend runs on your Next.js server
- The server calls Google's Gemini API using your API key
- Your API key is **never exposed to the client** (only available on the server)
- Results are returned to the frontend and rendered

### Setting Up for Production

#### On Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings > Environment Variables**
3. Add the following:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Your Gemini API key
   - **Environments:** Production, Preview, Development

4. Redeploy the project or wait for the next automatic deployment

#### Important Security Notes:

- ✅ **Safe:** API keys in environment variables on Vercel are private and secure
- ✅ **Recommended:** Only expose API keys to your backend (Next.js API routes)
- ❌ **Never:** Commit `.env.local` or any `.env` file with real keys
- ❌ **Never:** Expose API keys in client-side code (frontend)

### Verifying the Setup

Once deployed:
1. Visit your production URL
2. Go to `/plan-trip`
3. Fill out the form and click "Refine with AI"
4. The app should either:
   - Show "AI refined" (Gemini API successful)
   - Show "Smart local refinement" (API key missing/invalid, using fallback)

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key to your Vercel environment variables

### Troubleshooting

**Issue: "Smart local refinement" instead of "AI refined"**
- Check if `GEMINI_API_KEY` is set in Vercel environment variables
- Verify the API key is valid at https://aistudio.google.com/app/apikey
- Check Vercel deployment logs for any errors

**Issue: Blank page or 404 errors**
- Ensure the project root directory is correct in Vercel (should be the repo root)
- Check that build command is `npm run build` and output is default
- Verify all routes are included in the build (run `npm run build` locally)

## Project Structure

- `src/app/` - Next.js App Router pages
- `src/app/api/plan/refine/` - AI trip refinement API endpoint
- `src/components/planner/TripPlanStudio.tsx` - Main UI component for plan creation
- `src/lib/plan-refiner.ts` - Local refinement logic and AI prompt builder
- `src/lib/types.ts` - TypeScript interfaces for trip data

## Environment Variables

```bash
# Required for AI features
GEMINI_API_KEY=sk-xxx...

# Optional fallback (if Gemini fails)
OPENAI_API_KEY=sk-xxx...
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment Checklist

- [ ] Set `GEMINI_API_KEY` in Vercel environment variables
- [ ] Verify project root directory is correct
- [ ] Test the AI planner locally before deploying
- [ ] Check Vercel build logs for any errors
- [ ] Test the deployed app at your production URL

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying)
- [Google Gemini API Documentation](https://ai.google.dev/docs)
