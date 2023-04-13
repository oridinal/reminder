import { RooDailyEvent, getRooDailyEventTime } from './daily-event';
import { RooTradeInventoryReset, getRooTradeInventoryResetTime } from './trade-inventory-reset';

export const ROO_TIME_ZONE = '+07:00';

export interface ScheduleTime {
	hours: number;
	minutes: number;
}

export enum RooScheduleKind {
	DailyEvent,
	TradeInventoryReset,
}

export type RooSchedule =
	| [RooDailyEvent, RooScheduleKind.DailyEvent]
	| [RooTradeInventoryReset, RooScheduleKind.TradeInventoryReset];

export const getScheduleTime = ([value, kind]: RooSchedule): ScheduleTime => {
	switch (kind) {
		case RooScheduleKind.DailyEvent:
			return getRooDailyEventTime(value);

		case RooScheduleKind.TradeInventoryReset:
			return getRooTradeInventoryResetTime(value);
	}
};

export const getScheduleValue = ([value, kind]: RooSchedule) => {
	switch (kind) {
		case RooScheduleKind.DailyEvent:
			return RooDailyEvent[value];

		case RooScheduleKind.TradeInventoryReset:
			return RooTradeInventoryReset[value];
	}
};
