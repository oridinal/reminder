import { ScheduleTime } from '.';

export enum RooTrade {
	AuctionConclude,
	AuctionRefresh,
	AuctionStart,
	FirstStoreReset,
	SecondStoreReset,
	ThirdStoreReset,
}

export const trades = [
	RooTrade.AuctionConclude,
	RooTrade.AuctionRefresh,
	RooTrade.AuctionStart,
	RooTrade.FirstStoreReset,
	RooTrade.SecondStoreReset,
	RooTrade.ThirdStoreReset,
];

export const getRooTradeTime = (value: RooTrade): ScheduleTime => {
	switch (value) {
		case RooTrade.AuctionRefresh:
			return { hours: 5, minutes: 0 };

		case RooTrade.FirstStoreReset:
			return { hours: 12, minutes: 0 };

		case RooTrade.SecondStoreReset:
			return { hours: 16, minutes: 0 };

		case RooTrade.AuctionStart:
		case RooTrade.ThirdStoreReset:
			return { hours: 20, minutes: 0 };

		case RooTrade.AuctionConclude:
			return { hours: 22, minutes: 0 };
	}
};
