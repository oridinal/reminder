import { RooDaily, getRooDailyTime } from './daily';
import { RooTrade, getRooTradeTime } from './trade';

export const ROO_TIME_ZONE = '+07:00';

export interface ScheduleTime {
	hours: number;
	minutes: number;
}

export enum RooScheduleKind {
	Daily,
	Trade,
}

export type RooSchedule = [RooDaily, RooScheduleKind.Daily] | [RooTrade, RooScheduleKind.Trade];

export const getScheduleTime = ([value, kind]: RooSchedule): ScheduleTime => {
	switch (kind) {
		case RooScheduleKind.Daily:
			return getRooDailyTime(value);

		case RooScheduleKind.Trade:
			return getRooTradeTime(value);
	}
};

export const getScheduleValue = ([value, kind]: RooSchedule) => {
	switch (kind) {
		case RooScheduleKind.Daily:
			return RooDaily[value];

		case RooScheduleKind.Trade:
			return RooTrade[value];
	}
};
