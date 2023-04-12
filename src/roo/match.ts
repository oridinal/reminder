import { intervalToDuration, isBefore, set } from 'date-fns';

import { RooEventTime } from './events';

export enum MatchKind {
	'starting in 10 minutes',
	'starts now',
}

export const matchEvent = (eventTime: RooEventTime, date: Date) => {
	const eventDate = set(date, eventTime);
	const { hours = 0, minutes = 0 } = intervalToDuration({ start: eventDate, end: date });

	if (hours === 0) {
		if (minutes === 0) {
			return MatchKind['starts now'];
		} else if (minutes === 10 && isBefore(date, eventDate)) {
			return MatchKind['starting in 10 minutes'];
		}
	}
};
