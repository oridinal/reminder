import { add, getUnixTime, set } from 'date-fns';
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
	date: Date,
	time: ScheduleTime,
	duration?: Duration,
): DiscordWebhookEmbed => {
	const schedule = value[1];
	const [title, footer] = [getScheduleValue(value), ScheduleKind[schedule]].map(toSpaceSeparatedPascalCase);

	const startDate = zonedTimeToUtc(set(date, time), ROO_TIME_ZONE);
	const start = toDiscordTimestamp(startDate);
	const fields: DiscordWebhookEmbed['fields'] = [{ name: 'START', value: start, inline: true }];
	if (duration !== undefined && match === MatchKind.StartsNow) {
		const endDate = add(startDate, duration);
		const end = toDiscordTimestamp(endDate);
		fields.push({ name: 'END', value: end, inline: true });
	}

	return {
		title,
		fields,
		footer: { text: footer, icon_url: 'https://b.cgas.io/mVhvd_L8tHq1.png' },
		color: colors[match],
		timestamp: new Date().toISOString(),
	};
};

const toDiscordTimestamp = (date: Date) => {
	const unixTime = getUnixTime(date);
	// below will be shown like `20:00 (in 10 minutes)`
	// see https://discord.com/developers/docs/reference#message-formatting-timestamp-styles
	return `<t:${unixTime}:t> (<t:${unixTime}:R>)`;
};
