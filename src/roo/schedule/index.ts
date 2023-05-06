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
	| [Daily, ScheduleKind.Daily]
	| [Event, ScheduleKind.Event]
	| [Reset, ScheduleKind.Reset]
	| [Trade, ScheduleKind.Trade];

export const getScheduleDuration = ([value, kind]: Schedule): Duration | undefined => {
	switch (kind) {
		case ScheduleKind.Daily:
			return getDailyDuration(value);

		case ScheduleKind.Event:
			return getEventDuration(value);
	}
};

export const getScheduleTime = ([value, kind]: Schedule): ScheduleTime => {
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

export const getScheduleValue = ([value, kind]: Schedule): string => {
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
