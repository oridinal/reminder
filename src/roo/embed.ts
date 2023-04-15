import { getUnixTime, set } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import { MatchKind } from './match';
import { ROO_TIME_ZONE, RooSchedule, RooScheduleKind, ScheduleTime, getScheduleValue } from './schedule';

import { DiscordWebhookEmbed } from '../types';
import { toSpaceSeparatedPascalCase } from '../utilities';

const colors = {
	[MatchKind.StartsIn10Minutes]: 0x8bd3e6, // pastel blue
	[MatchKind.StartsNow]: 0x77dd77, // pastel green
} satisfies Record<MatchKind, number>;

const images = {
	[RooScheduleKind.Daily]: 'https://b.cgas.io/LprtTW9DcVG-.png',
	[RooScheduleKind.Reset]: 'https://b.cgas.io/RcUSRL3-9gug.jpg',
	[RooScheduleKind.Trade]: 'https://b.cgas.io/dQCoeklKFKs7.jpg',
} satisfies Record<RooScheduleKind, string>;

export const generateEmbed = (
	value: RooSchedule,
	match: MatchKind,
	time: ScheduleTime,
	date: Date,
): DiscordWebhookEmbed => {
	const schedule = value[1];
	const [title, footer] = [getScheduleValue(value), RooScheduleKind[schedule]].map(toSpaceSeparatedPascalCase);

	const date_ = set(date, time);
	const dateUtc = zonedTimeToUtc(date_, ROO_TIME_ZONE);
	const unixTime = getUnixTime(dateUtc);
	// description will be shown like `20:00 (in 10 minutes)`
	// see https://discord.com/developers/docs/reference#message-formatting-timestamp-styles
	const description = `<t:${unixTime}:t> (<t:${unixTime}:R>)`;

	return {
		title,
		description,
		footer: { text: footer },
		color: colors[match],
		image: { url: images[schedule] },
		timestamp: new Date().toISOString(),
		thumbnail: { url: 'https://b.cgas.io/mVhvd_L8tHq1.png' },
	};
};
