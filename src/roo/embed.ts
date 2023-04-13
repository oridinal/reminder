import { RooEvent } from './events';
import { MatchKind } from './match';

import { DiscordWebhookEmbed } from '../types';
import { pascalCaseToSpaceSeparated, toTitleCase } from '../utilities';

const embedColors = {
	[MatchKind.StartsNow]: 0x77dd77, // pastel green
	[MatchKind.StartingIn10Minutes]: 0x8bd3e6, // pastel blue
} satisfies Record<MatchKind, number>;

export const generateEmbed = (event: RooEvent, kind: MatchKind): DiscordWebhookEmbed => {
	const [title, description] = [RooEvent[event], MatchKind[kind]].map(pascalCaseToSpaceSeparated);

	return {
		title,
		description: toTitleCase(description),
		color: embedColors[kind],
		timestamp: new Date().toISOString(),
		image: { url: 'https://b.cgas.io/LprtTW9DcVG-.png' },
	};
};
