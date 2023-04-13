import { describe, expect, it } from 'vitest';

import { set } from 'date-fns';

import { MatchKind, matchEvent } from './match';

describe('checkRooEventTime', () => {
	it('should handle "starting in 10 minutes"', () => {
		expect(
			matchEvent({ hours: 20, minutes: 55 }, set(Date.now(), { hours: 20, minutes: 45 })),
			'in the same hour',
		).toBe(MatchKind.StartingIn10Minutes);
		expect(matchEvent({ hours: 5, minutes: 0 }, set(Date.now(), { hours: 4, minutes: 50 })), 'an hour before').toBe(
			MatchKind.StartingIn10Minutes,
		);

		expect(matchEvent({ hours: 20, minutes: 0 }, set(Date.now(), { hours: 20, minutes: 10 })), 'not before').not.toBe(
			MatchKind.StartingIn10Minutes,
		);
	});

	it('should handle "starts now"', () => {
		expect(
			matchEvent({ hours: 20, minutes: 0 }, set(Date.now(), { hours: 20, minutes: 0 })),
			'exact hour and minute',
		).toBe(MatchKind.StartsNow);
	});
});
