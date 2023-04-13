import { MatchKind } from './match';
import { RooSchedule, RooScheduleKind, getScheduleValue } from './schedule';

import { DiscordWebhookEmbed } from '../types';
import { toSpaceSeparatedPascalCase, toTitleCase } from '../utilities';

const colors = {
	[MatchKind.StartsNow]: 0x77dd77, // pastel green
	[MatchKind.StartingIn10Minutes]: 0x8bd3e6, // pastel blue
} satisfies Record<MatchKind, number>;

export const generateEmbed = (value: RooSchedule, match: MatchKind): DiscordWebhookEmbed => {
	const [title, description, footer] = [getScheduleValue(value), MatchKind[match], RooScheduleKind[value[1]]].map(
		toSpaceSeparatedPascalCase,
	);

	return {
		title,
		description: toTitleCase(description),
		footer: { text: footer },
		color: colors[match],
		timestamp: new Date().toISOString(),
		image: { url: 'https://b.cgas.io/LprtTW9DcVG-.png' },
	};
};
