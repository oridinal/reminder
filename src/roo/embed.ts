import { getUnixTime, set } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import { MatchKind } from './match';
import { ROO_TIME_ZONE, Schedule, ScheduleKind, ScheduleTime, getScheduleValue } from './schedule';

import { DiscordWebhookEmbed } from '../types';
import { toSpaceSeparatedPascalCase } from '../utilities';

const colors = {
	[MatchKind.StartsIn10Minutes]: 0x8bd3e6, // pastel blue
	[MatchKind.StartsNow]: 0xff6961, // pastel red
} satisfies Record<MatchKind, number>;

export const generateEmbed = (
	value: Schedule,
	match: MatchKind,
	time: ScheduleTime,
	date: Date,
): DiscordWebhookEmbed => {
	const schedule = value[1];
	const [title, footer] = [getScheduleValue(value), ScheduleKind[schedule]].map(toSpaceSeparatedPascalCase);

	const date_ = set(date, time);
	const dateUtc = zonedTimeToUtc(date_, ROO_TIME_ZONE);
	const unixTime = getUnixTime(dateUtc);
	// description will be shown like `20:00 (in 10 minutes)`
	// see https://discord.com/developers/docs/reference#message-formatting-timestamp-styles
	const description = `<t:${unixTime}:t> (<t:${unixTime}:R>)`;

	return {
		title,
		description,
		footer: { text: footer, icon_url: 'https://b.cgas.io/mVhvd_L8tHq1.png' },
		color: colors[match],
		timestamp: new Date().toISOString(),
	};
};
