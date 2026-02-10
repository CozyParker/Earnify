# Earnify — Foundation Analyst Flow UI

A production-ready, responsive Next.js + TypeScript UI that visualizes the **Foundation Analyst (52 Weeks)** course as a 5-phase flow with expandable week groups, detail drawer, system attributes personalization, progress tracking, and JSON export.

## Tech stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Flow

## Run locally

```bash
npm i
npm run dev
```

Then open `http://localhost:3000`.

## Features
- Desktop flow canvas with phase expand/collapse and week-group nodes
- Mobile vertical phase list with expandable week groups
- Detail drawer with topics, exercise, output artifact, and checkpoint signals
- System attributes panel with personalize controls (weekly hours + experience)
- Deterministic personalization for effort/time-to-first-₹/failure probability
- Local-only progress state + phase/overall progress bars
- Export Plan button to download JSON of data + progress
