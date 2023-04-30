import { isWithinInterval, set } from 'date-fns';

import { ScheduleTime } from '.';

export enum Event {
	VeinsStrategicBattle,
}

export const getEvents = (date: Date): Event[] => {
	return (
		[
			[
				{
					start: set(date, { year: 2023, month: 4, date: 27, hours: 5, minutes: 0, seconds: 0, milliseconds: 0 }),
					end: set(date, { year: 2023, month: 5, date: 4, hours: 4, minutes: 59, seconds: 59, milliseconds: 59 }),
				},
				Event.VeinsStrategicBattle,
			],
		] satisfies [Interval, Event][]
	)
		.filter(([interval]) => isWithinInterval(date, interval))
		.map(([, event]) => event);
};

export const getEventTime = (value: Event): ScheduleTime => {
	switch (value) {
		case Event.VeinsStrategicBattle:
			return { hours: 21, minutes: 30 };
	}
};
