import { ScheduleTime } from '.';

export enum Trade {
	FirstStoreRefresh,
	SecondStoreRefresh,
	ThirdStoreRefresh,
}

export const trades = [Trade.FirstStoreRefresh, Trade.SecondStoreRefresh, Trade.ThirdStoreRefresh];

export const getTradeTime = (value: Trade): ScheduleTime => {
	switch (value) {
		case Trade.FirstStoreRefresh:
			return { hours: 12, minutes: 0 };

		case Trade.SecondStoreRefresh:
			return { hours: 16, minutes: 0 };

		// case Trade.AuctionStart:
		case Trade.ThirdStoreRefresh:
			return { hours: 20, minutes: 0 };
	}
};
