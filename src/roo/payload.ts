import { intervalToDuration, set } from 'date-fns';

import { RooEvent, RooEventTime } from './event';

// TODO: use discord embed with custom images for each events
export interface DiscordWebhookPayload {
	/** the message contents (up to 2000 characters) */
	content: string;
}

export enum PayloadKind {
	tenMinutesBeforeEvent,
	eventStart,
}

export const checkRooEventTime = (eventTime: RooEventTime, date: Date) => {
	const eventDate = set(date, eventTime);
	const { hours = 0, minutes = 0 } = intervalToDuration({ start: eventDate, end: date });

	if (hours === 0) {
		switch (minutes) {
			case 10:
				return PayloadKind.tenMinutesBeforeEvent;

			case 0:
				return PayloadKind.eventStart;
		}
	}
};

const payloadTemplate = {
	[PayloadKind.eventStart]: 'Event {} sudah mulai',
	[PayloadKind.tenMinutesBeforeEvent]: '10 menit lagi event {} mulai',
} satisfies Record<PayloadKind, string>;

export const generatePayload = (kind: PayloadKind, event: RooEvent): DiscordWebhookPayload => {
	return { content: payloadTemplate[kind].replace('{}', `**${RooEvent[event]}**`) };
};
