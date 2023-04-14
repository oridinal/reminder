import { isMonday } from 'date-fns';
import { ScheduleTime } from '.';

export enum RooReset {
	DailyReset,
	WeeklyReset,
}

export const getRooResets = (date: Date) => {
	const values = [RooReset.DailyReset];
	if (isMonday(date)) {
		values.push(RooReset.WeeklyReset);
	}

	return values;
};

export const getRooResetTime = (value: RooReset): ScheduleTime => {
	switch (value) {
		case RooReset.DailyReset:
		case RooReset.WeeklyReset:
			return { hours: 5, minutes: 0 };
	}
};
