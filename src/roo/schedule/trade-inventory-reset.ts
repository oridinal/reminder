import { ScheduleTime } from '.';

export enum RooTradeInventoryReset {
	FirstDailyReset,
	SecondDailyReset,
	ThirdDailyReset,
}

export const allTradeInventoryReset = [
	RooTradeInventoryReset.FirstDailyReset,
	RooTradeInventoryReset.SecondDailyReset,
	RooTradeInventoryReset.ThirdDailyReset,
];

export const getRooTradeInventoryResetTime = (value: RooTradeInventoryReset): ScheduleTime => {
	switch (value) {
		case RooTradeInventoryReset.FirstDailyReset:
			return { hours: 12, minutes: 0 };

		case RooTradeInventoryReset.SecondDailyReset:
			return { hours: 16, minutes: 0 };

		case RooTradeInventoryReset.ThirdDailyReset:
			return { hours: 20, minutes: 0 };
	}
};
