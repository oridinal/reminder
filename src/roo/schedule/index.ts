import { RooDaily, getRooDailyTime } from './daily';
import { RooReset, getRooResetTime } from './reset';
import { RooTrade, getRooTradeTime } from './trade';

export const ROO_TIME_ZONE = '+07:00';

export interface ScheduleTime {
	hours: number;
	minutes: number;
}

export enum RooScheduleKind {
	Daily,
	Reset,
	Trade,
}

export type RooSchedule =
	| [RooDaily, RooScheduleKind.Daily]
	| [RooReset, RooScheduleKind.Reset]
	| [RooTrade, RooScheduleKind.Trade];

export const getScheduleTime = ([value, kind]: RooSchedule): ScheduleTime => {
	switch (kind) {
		case RooScheduleKind.Daily:
			return getRooDailyTime(value);

		case RooScheduleKind.Reset:
			return getRooResetTime(value);

		case RooScheduleKind.Trade:
			return getRooTradeTime(value);
	}
};

export const getScheduleValue = ([value, kind]: RooSchedule): string => {
	switch (kind) {
		case RooScheduleKind.Daily:
			return RooDaily[value];

		case RooScheduleKind.Reset:
			return RooReset[value];

		case RooScheduleKind.Trade:
			return RooTrade[value];
	}
};
