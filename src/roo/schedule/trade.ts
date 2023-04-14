import { ScheduleTime } from '.';

export enum RooTrade {
	AuctionConclude,
	AuctionRefresh,
	AuctionStart,
	FirstStoreRefresh,
	SecondStoreRefresh,
	ThirdStoreRefresh,
}

export const trades = [
	RooTrade.AuctionConclude,
	RooTrade.AuctionRefresh,
	RooTrade.AuctionStart,
	RooTrade.FirstStoreRefresh,
	RooTrade.SecondStoreRefresh,
	RooTrade.ThirdStoreRefresh,
];

export const getRooTradeTime = (value: RooTrade): ScheduleTime => {
	switch (value) {
		case RooTrade.AuctionRefresh:
			return { hours: 5, minutes: 0 };

		case RooTrade.FirstStoreRefresh:
			return { hours: 12, minutes: 0 };

		case RooTrade.SecondStoreRefresh:
			return { hours: 16, minutes: 0 };

		case RooTrade.AuctionStart:
		case RooTrade.ThirdStoreRefresh:
			return { hours: 20, minutes: 0 };

		case RooTrade.AuctionConclude:
			return { hours: 22, minutes: 0 };
	}
};
