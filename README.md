# Praxis Platform

Participant-facing application for Praxis simulations.

## Research Leadership Lab 01 — The Project

The first cockpit implements the asynchronous ECR research-leadership experience against the `praxis-sim-api` Research Leadership namespace.

### Current UX
- six-round project frame and timeline
- qualitative project-health cockpit
- leadership-attention indicator
- consequential decision cards
- decision confidence and rationale capture
- Learn / Consult / Decide resources
- embedded reflection modal
- developmental decision-profile drawer
- responsive layout and keyboard focus states
- local save/resume run identifier
- demo adapter for UX testing without backend credentials

### Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

The example environment starts in demo mode. Set `VITE_DEMO_MODE=false`, configure `VITE_API_BASE`, and wire Firebase web authentication before connecting to the protected production API.

## Production gates

Do not expose this publicly until:
1. Firebase web authentication is wired and ID tokens are passed to the API client.
2. Backend Research Leadership PR is deployed to a staging Cloud Run revision.
3. CORS is restricted to the deployed participant origin.
4. The end-to-end 30-user and 60-user load tests pass.
5. Save/resume, duplicate-submit, expired-token and network-retry behaviour are browser-tested.
6. Accessibility review covers keyboard, screen reader, mobile, zoom/reflow and non-colour status meaning.
7. Scenario content has expert review and ECR cognitive testing.

The simulation is developmental. It must not present a single leadership score, rank, archetype or claim of validated workplace competence.
