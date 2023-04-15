import { intervalToDuration, isBefore, set } from 'date-fns';

import { ScheduleTime } from './schedule';

export enum MatchKind {
	StartsIn10Minutes,
	StartsNow,
}

export const matchSchedule = (time: ScheduleTime, date: Date) => {
	const scheduleDate = set(date, time);
	const { hours = 0, minutes = 0 } = intervalToDuration({ start: scheduleDate, end: date });

	if (hours === 0) {
		if (minutes === 0) {
			return MatchKind.StartsNow;
		} else if (minutes === 10 && isBefore(date, scheduleDate)) {
			return MatchKind.StartsIn10Minutes;
		}
	}
};
