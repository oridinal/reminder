import { describe, expect, it } from 'vitest';

import { set } from 'date-fns';

import { MatchKind, matchSchedule } from './match';

describe('matchSchedule', () => {
	it('should handle "starting in 10 minutes"', () => {
		expect(
			matchSchedule({ hours: 20, minutes: 55 }, set(Date.now(), { hours: 20, minutes: 45 })),
			'in the same hour',
		).toBe(MatchKind.StartsIn10Minutes);
		expect(matchSchedule({ hours: 5, minutes: 0 }, set(Date.now(), { hours: 4, minutes: 50 })), 'an hour before').toBe(
			MatchKind.StartsIn10Minutes,
		);

		expect(
			matchSchedule({ hours: 20, minutes: 0 }, set(Date.now(), { hours: 20, minutes: 10 })),
			'not before',
		).not.toBe(MatchKind.StartsIn10Minutes);
	});

	it('should handle "starts now"', () => {
		expect(
			matchSchedule({ hours: 20, minutes: 0 }, set(Date.now(), { hours: 20, minutes: 0 })),
			'exact hour and minute',
		).toBe(MatchKind.StartsNow);
	});
});
