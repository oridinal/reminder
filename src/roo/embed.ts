import { MatchKind } from './match';
import { RooSchedule, RooScheduleKind, getScheduleValue } from './schedule';

import { DiscordWebhookEmbed } from '../types';
import { toSpaceSeparatedPascalCase, toTitleCase } from '../utilities';

const colors = {
	[MatchKind.StartsNow]: 0x77dd77, // pastel green
	[MatchKind.StartingIn10Minutes]: 0x8bd3e6, // pastel blue
} satisfies Record<MatchKind, number>;

const images = {
	[RooScheduleKind.Trade]: 'https://b.cgas.io/dQCoeklKFKs7.jpg',
	[RooScheduleKind.Reset]: 'https://b.cgas.io/RcUSRL3-9gug.jpg',
	[RooScheduleKind.Daily]: 'https://b.cgas.io/LprtTW9DcVG-.png',
} satisfies Record<RooScheduleKind, string>;

export const generateEmbed = (value: RooSchedule, match: MatchKind): DiscordWebhookEmbed => {
	const schedule = value[1];
	const [title, description, footer] = [getScheduleValue(value), MatchKind[match], RooScheduleKind[schedule]].map(
		toSpaceSeparatedPascalCase,
	);

	return {
		title,
		description: toTitleCase(description),
		footer: { text: footer },
		color: colors[match],
		image: { url: images[schedule] },
		timestamp: new Date().toISOString(),
		thumbnail: { url: 'https://b.cgas.io/mVhvd_L8tHq1.png' },
	};
};
