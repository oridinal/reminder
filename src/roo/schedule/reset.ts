import { isMonday } from 'date-fns';
import { ScheduleTime } from '.';

export enum Reset {
	DailyReset,
	WeeklyReset,
}

export const getResets = (date: Date) => {
	const values = [Reset.DailyReset];
	if (isMonday(date)) {
		values.push(Reset.WeeklyReset);
	}

	return values;
};

export const getResetTime = (value: Reset): ScheduleTime => {
	switch (value) {
		case Reset.DailyReset:
		case Reset.WeeklyReset:
			return { hours: 5, minutes: 0 };
	}
};
