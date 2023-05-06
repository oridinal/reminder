import { intervalToDuration, isBefore, set } from 'date-fns';

import { ScheduleTime } from './schedule';

export enum MatchKind {
	StartsIn10Minutes,
	StartsNow,
}

export const matchSchedule = (
	time: MaybeArray<ScheduleTime>,
	date: Date,
): { kind: MatchKind; time: ScheduleTime } | undefined => {
	const times = Array.isArray(time) ? time : [time];
	for (const time_ of times) {
		const scheduleDate = set(date, time_);
		const { hours = 0, minutes = 0 } = intervalToDuration({ start: scheduleDate, end: date });

		if (hours === 0) {
			if (minutes === 0) {
				return { kind: MatchKind.StartsNow, time: time_ };
			} else if (minutes === 10 && isBefore(date, scheduleDate)) {
				return { kind: MatchKind.StartsIn10Minutes, time: time_ };
			}
		}
	}
};
