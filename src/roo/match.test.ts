import { describe, expect, it } from 'vitest';

import { set } from 'date-fns';

import { MatchKind, matchSchedule } from './match';

describe('matchSchedule', () => {
	it('should handle "starting in 10 minutes"', () => {
		expect(
			matchSchedule({ hours: 20, minutes: 55 }, set(Date.now(), { hours: 20, minutes: 45 })),
			'in the same hour',
		).toStrictEqual({ kind: MatchKind.StartsIn10Minutes, time: { hours: 20, minutes: 55 } });
		expect(
			matchSchedule(
				[
					{ hours: 5, minutes: 0 },
					{ hours: 20, minutes: 55 },
				],
				set(Date.now(), { hours: 20, minutes: 45 }),
			),
			'in the same hour (multiple)',
		).toStrictEqual({ kind: MatchKind.StartsIn10Minutes, time: { hours: 20, minutes: 55 } });

		expect(
			matchSchedule({ hours: 5, minutes: 0 }, set(Date.now(), { hours: 4, minutes: 50 })),
			'an hour before',
		).toStrictEqual({ kind: MatchKind.StartsIn10Minutes, time: { hours: 5, minutes: 0 } });
		expect(
			matchSchedule(
				[
					{ hours: 5, minutes: 0 },
					{ hours: 20, minutes: 55 },
				],
				set(Date.now(), { hours: 4, minutes: 50 }),
			),
			'an hour before (multiple)',
		).toStrictEqual({ kind: MatchKind.StartsIn10Minutes, time: { hours: 5, minutes: 0 } });

		expect(
			matchSchedule({ hours: 20, minutes: 0 }, set(Date.now(), { hours: 20, minutes: 10 })),
			'not before',
		).not.toStrictEqual({ kind: MatchKind.StartsIn10Minutes, time: { hours: 20, minutes: 0 } });
	});

	it('should handle "starts now"', () => {
		expect(
			matchSchedule({ hours: 20, minutes: 0 }, set(Date.now(), { hours: 20, minutes: 0 })),
			'exact hour and minute',
		).toStrictEqual({ kind: MatchKind.StartsNow, time: { hours: 20, minutes: 0 } });
		expect(
			matchSchedule(
				[
					{ hours: 5, minutes: 0 },
					{ hours: 20, minutes: 0 },
				],
				set(Date.now(), { hours: 20, minutes: 0 }),
			),
			'exact hour and minutes (multiple)',
		).toStrictEqual({ kind: MatchKind.StartsNow, time: { hours: 20, minutes: 0 } });
	});
});
