import { RooDailyEvent, getRooDailyEventTime } from './daily-event';
import { RooTrade, getRooTradeTime } from './trade';

export const ROO_TIME_ZONE = '+07:00';

export interface ScheduleTime {
	hours: number;
	minutes: number;
}

export enum RooScheduleKind {
	DailyEvent,
	Trade,
}

export type RooSchedule = [RooDailyEvent, RooScheduleKind.DailyEvent] | [RooTrade, RooScheduleKind.Trade];

export const getScheduleTime = ([value, kind]: RooSchedule): ScheduleTime => {
	switch (kind) {
		case RooScheduleKind.DailyEvent:
			return getRooDailyEventTime(value);

		case RooScheduleKind.Trade:
			return getRooTradeTime(value);
	}
};

export const getScheduleValue = ([value, kind]: RooSchedule) => {
	switch (kind) {
		case RooScheduleKind.DailyEvent:
			return RooDailyEvent[value];

		case RooScheduleKind.Trade:
			return RooTrade[value];
	}
};
