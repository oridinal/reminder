import { utcToZonedTime } from 'date-fns-tz';

import { generateEmbed } from './roo/embed';
import { matchSchedule } from './roo/match';

import { ROO_TIME_ZONE, RooSchedule, RooScheduleKind, getScheduleTime } from './roo/schedule';
import { getRooDailies } from './roo/schedule/daily';
import { getRooResets } from './roo/schedule/reset';
import { trades } from './roo/schedule/trade';

import { DiscordWebhookEmbed, DiscordWebhookPayload } from './types';

const scheduled = ((_controller, env, ctx) => {
	const date = utcToZonedTime(Date.now(), ROO_TIME_ZONE);

	const dailies = getRooDailies(date);
	const resets = getRooResets(date);

	const schedules = [
		...dailies.map((value): RooSchedule => [value, RooScheduleKind.Daily]),
		...resets.map((value): RooSchedule => [value, RooScheduleKind.Reset]),
		...trades.map((value): RooSchedule => [value, RooScheduleKind.Trade]),
	] satisfies RooSchedule[];

	const embeds = [] as [DiscordWebhookEmbed, RooScheduleKind][];
	for (const schedule of schedules) {
		const time = getScheduleTime(schedule);
		const match = matchSchedule(time, date);
		if (match !== undefined) {
			const embed = generateEmbed(schedule, match, time, date);
			embeds.push([embed, schedule[1]]);
		}
	}

	if (embeds.length > 0) {
		// <@&{ID}> is role mention
		// ref:  https://discord.com/developers/docs/reference#message-formatting-formats
		const mention = `<@&${env.DISCORD_ROLE_MENTION_ID}>`;
		const kinds = [...new Set(embeds.map(([, kind]) => RooScheduleKind[kind]))]
			.sort((a, b) => a.localeCompare(b))
			.join(' & ');

		const payload = {
			content: `${mention} ${kinds}`,
			embeds: embeds.map(([embed]) => embed),
		} satisfies DiscordWebhookPayload;

		ctx.waitUntil(
			fetch(env.DISCORD_WEBHOOK_URL, {
				body: JSON.stringify(payload),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			}),
		);
	}
}) satisfies ExportedHandlerScheduledHandler<Env>;

export default { scheduled } satisfies ExportedHandler<Env>;
