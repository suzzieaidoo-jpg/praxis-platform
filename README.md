# Praxis Platform

Participant-facing application for Praxis simulations.

## Research Leadership Lab 01 — The Research Puzzle

The default experience is a 25–35 minute individual research-development simulation for early career researchers.

Participants work through eight linked research decisions involving:

- developing and revising explanations
- choosing and combining forms of evidence
- responding to contradictory information
- refining a research question
- identifying evidence that could challenge an explanation
- considering the circumstances in which an explanation applies
- matching conclusions to the available evidence
- deciding what a follow-on study should investigate

Each decision follows the same learning sequence:

**Evidence → Decision → Adaptive reason → Reflection → Tailored feedback → Next evidence**

The simulation deliberately does not produce an overall score, researcher type, rank or competence judgement.

## Response library

`src/researchPuzzle.js` is the single source of truth for:

- all eight decisions
- every decision option
- every adaptive reason
- option-specific and reason-specific feedback
- next-stage transitions
- confidence and limitation prompts
- internal interpretation signals
- final Research Decision Profile rules

This allows participant feedback to be deterministic and auditable instead of being improvised by a language model.

## Current participant experience

- staged evidence packets
- eight consequential research decisions
- adaptive reason selection after every decision
- optional written reflection
- confidence capture at selected points
- conclusion-limitation prompt
- tailored learning feedback after every decision
- final cross-simulation reflection
- deterministic Research Decision Profile
- transfer prompts back to the participant's own research
- responsive layout and keyboard focus states

## Run locally

```bash
npm install
npm run dev
```

## Validation before pilot

Before using the simulation as a formal developmental intervention:

1. complete construct/domain expert review;
2. conduct ECR cognitive interviews across several SHAPE disciplines;
3. test whether participants interpret the options and feedback as intended;
4. check that no option is experienced as an obvious 'correct' answer;
5. review accessibility across keyboard, screen reader, mobile and zoom/reflow;
6. verify the interpretation rules against participant explanations;
7. pilot the cohort-level aggregate outputs separately from individual developmental feedback.

The profile is developmental and refers only to decisions made within this simulation.
