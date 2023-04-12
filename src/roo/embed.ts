import { RooEvent } from './events';
import { MatchKind } from './match';

import { DiscordWebhookEmbed } from '../types';

const embedColors = {
	[MatchKind['starts now']]: 0x77dd77, // pastel green
	[MatchKind['starting in 10 minutes']]: 0x8bd3e6, // pastel blue
} satisfies Record<MatchKind, number>;

export const generateEmbed = (event: RooEvent, kind: MatchKind): DiscordWebhookEmbed => {
	return {
		title: RooEvent[event],
		description: MatchKind[kind],
		color: embedColors[kind],
		timestamp: new Date().toISOString(),
		image: { url: 'https://b.cgas.io/LprtTW9DcVG-.png' },
	};
};
