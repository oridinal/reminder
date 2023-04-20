import { ScheduleTime } from '.';

export enum Trade {
	AuctionConclude,
	AuctionRefresh,
	AuctionStart,
	FirstStoreRefresh,
	SecondStoreRefresh,
	ThirdStoreRefresh,
}

export const trades = [
	Trade.AuctionConclude,
	Trade.AuctionRefresh,
	Trade.AuctionStart,
	Trade.FirstStoreRefresh,
	Trade.SecondStoreRefresh,
	Trade.ThirdStoreRefresh,
];

export const getTradeTime = (value: Trade): ScheduleTime => {
	switch (value) {
		case Trade.AuctionRefresh:
			return { hours: 5, minutes: 0 };

		case Trade.FirstStoreRefresh:
			return { hours: 12, minutes: 0 };

		case Trade.SecondStoreRefresh:
			return { hours: 16, minutes: 0 };

		case Trade.AuctionStart:
		case Trade.ThirdStoreRefresh:
			return { hours: 20, minutes: 0 };

		case Trade.AuctionConclude:
			return { hours: 22, minutes: 0 };
	}
};
