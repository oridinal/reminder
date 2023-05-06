import { Daily, getDailyDuration, getDailyTime } from './daily';
import { Event, getEventDuration, getEventTime } from './event';
import { Reset, getResetTime } from './reset';
import { Trade, getTradeTime } from './trade';

export const ROO_TIME_ZONE = '+07:00';

export interface ScheduleTime {
	hours: number;
	minutes: number;
}

export enum ScheduleKind {
	Daily,
	Event,
	Reset,
	Trade,
}

export type Schedule =
	| KindValue<ScheduleKind.Daily, Daily>
	| KindValue<ScheduleKind.Event, Event>
	| KindValue<ScheduleKind.Reset, Reset>
	| KindValue<ScheduleKind.Trade, Trade>;

export const getScheduleDuration = ({ kind, value }: Schedule): Duration | undefined => {
	switch (kind) {
		case ScheduleKind.Daily:
			return getDailyDuration(value);

		case ScheduleKind.Event:
			return getEventDuration(value);
	}
};

export const getScheduleTime = ({ kind, value }: Schedule): MaybeArray<ScheduleTime> => {
	switch (kind) {
		case ScheduleKind.Daily:
			return getDailyTime(value);

		case ScheduleKind.Event:
			return getEventTime(value);

		case ScheduleKind.Reset:
			return getResetTime(value);

		case ScheduleKind.Trade:
			return getTradeTime(value);
	}
};

export const getScheduleValue = ({ kind, value }: Schedule): string => {
	switch (kind) {
		case ScheduleKind.Daily:
			return Daily[value];

		case ScheduleKind.Event:
			return Event[value];

		case ScheduleKind.Reset:
			return Reset[value];

		case ScheduleKind.Trade:
			return Trade[value];
	}
};
