import { intervalToDuration, isBefore, set } from 'date-fns';

import { RooEventTime } from './events';

export enum MatchKind {
	StartingIn10Minutes,
	StartsNow,
}

export const matchEvent = (eventTime: RooEventTime, date: Date) => {
	const eventDate = set(date, eventTime);
	const { hours = 0, minutes = 0 } = intervalToDuration({ start: eventDate, end: date });

	if (hours === 0) {
		if (minutes === 0) {
			return MatchKind.StartsNow;
		} else if (minutes === 10 && isBefore(date, eventDate)) {
			return MatchKind.StartingIn10Minutes;
		}
	}
};
