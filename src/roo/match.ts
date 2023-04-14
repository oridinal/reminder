import { intervalToDuration, isBefore, set } from 'date-fns';

import { ScheduleTime } from './schedule';

export enum MatchKind {
	StartsIn10Minutes,
	StartsNow,
}

export const matchEvent = (eventTime: ScheduleTime, date: Date) => {
	const eventDate = set(date, eventTime);
	const { hours = 0, minutes = 0 } = intervalToDuration({ start: eventDate, end: date });

	if (hours === 0) {
		if (minutes === 0) {
			return MatchKind.StartsNow;
		} else if (minutes === 10 && isBefore(date, eventDate)) {
			return MatchKind.StartsIn10Minutes;
		}
	}
};
