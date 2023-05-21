import { isWithinInterval, set } from 'date-fns';

import { ScheduleTime } from '.';

export enum Event {
	CreamRevelry,
	MonthiversaryDance,
	VeinsStrategicBattle,
}

export const getEvents = (date: Date): Event[] => {
	return (
		[
			[
				Event.CreamRevelry, // 2023 (5/22 5:00 - 4/6 5:00)
				{
					start: set(date, { year: 2023, month: 5, date: 22, hours: 5, minutes: 0, seconds: 0, milliseconds: 0 }),
					end: set(date, { year: 2023, month: 6, date: 4, hours: 5, minutes: 0, seconds: 0, milliseconds: 0 }),
				},
			],
			[
				Event.VeinsStrategicBattle, // 2023 (4/27 5:00 - 5/4 4:59)
				{
					start: set(date, { year: 2023, month: 3, date: 27, hours: 5, minutes: 0, seconds: 0, milliseconds: 0 }),
					end: set(date, { year: 2023, month: 4, date: 4, hours: 4, minutes: 59, seconds: 59, milliseconds: 59 }),
				},
			],
			[
				Event.MonthiversaryDance, // 2023 (5/6 5:00 - 5/12 4:59)
				{
					start: set(date, { year: 2023, month: 4, date: 6, hours: 5, minutes: 0, seconds: 0, milliseconds: 0 }),
					end: set(date, { year: 2023, month: 4, date: 12, hours: 4, minutes: 59, seconds: 59, milliseconds: 59 }),
				},
			],
		] satisfies [Event, Interval][]
	)
		.filter(([, interval]) => isWithinInterval(date, interval))
		.map(([event]) => event);
};

export const getEventDuration = (value: Event): Duration => {
	switch (value) {
		case Event.CreamRevelry:
			return { hours: 1, minutes: 59 };
		case Event.MonthiversaryDance:
		case Event.VeinsStrategicBattle:
			return { hours: 2 };
	}
};

export const getEventTime = (value: Event): MaybeArray<ScheduleTime> => {
	switch (value) {
		case Event.CreamRevelry:
		case Event.MonthiversaryDance:
			return [
				{ hours: 12, minutes: 0 },
				{ hours: 18, minutes: 0 },
				{ hours: 22, minutes: 0 },
			];

		case Event.VeinsStrategicBattle:
			return { hours: 21, minutes: 30 };
	}
};
