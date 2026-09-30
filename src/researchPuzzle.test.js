import { describe, expect, it } from 'vitest';
import { DECISIONS, composeFeedback, reasonsFor, buildProfile } from './researchPuzzle.js';

describe('Research Puzzle response library', () => {
  it('contains exactly eight decisions', () => {
    expect(DECISIONS).toHaveLength(8);
  });

  it('gives every decision a transition and every option adaptive reasons', () => {
    for (const decision of DECISIONS) {
      expect(decision.transition).toBeTruthy();
      expect(decision.options.length).toBeGreaterThanOrEqual(3);
      for (const option of decision.options) {
        expect(option.baseFeedback.value).toBeTruthy();
        expect(option.baseFeedback.consider).toBeTruthy();
        expect(option.reasons.length).toBeGreaterThanOrEqual(4);
        for (const reason of option.reasons) {
          expect(reason[0]).toBeTruthy();
          expect(reason[1]).toBeTruthy();
          expect(reason[2]).toBeTruthy();
          const feedback = composeFeedback(decision, option.id, reason[0]);
          expect(feedback.value).toBeTruthy();
          expect(feedback.reason).toBeTruthy();
          expect(feedback.consider).toBeTruthy();
          expect(feedback.transition).toBe(decision.transition);
        }
      }
    }
  });

  it('provides a participant-defined reason on every option', () => {
    for (const decision of DECISIONS) {
      for (const option of decision.options) {
        expect(reasonsFor(option).some(r => r[0] === 'other')).toBe(true);
        const feedback = composeFeedback(decision, option.id, 'other');
        expect(feedback.reason).toContain('primary basis');
      }
    }
  });

  it('generates a profile without an overall score', () => {
    const records = DECISIONS.map((decision) => ({
      decisionId: decision.id,
      optionId: decision.options[0].id,
      reasonId: decision.options[0].reasons[0][0],
      reflection: 'test',
    }));
    const profile = buildProfile(records, {});
    expect(profile.score).toBeUndefined();
    expect(profile.overallScore).toBeUndefined();
    expect(profile.priorities.length).toBeGreaterThan(0);
  });

  it('keeps option and reason ids unique within each decision', () => {
    for (const decision of DECISIONS) {
      expect(new Set(decision.options.map(o => o.id)).size).toBe(decision.options.length);
      for (const option of decision.options) {
        expect(new Set(option.reasons.map(r => r[0])).size).toBe(option.reasons.length);
      }
    }
  });
});
