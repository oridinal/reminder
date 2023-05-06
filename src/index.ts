import { utcToZonedTime } from 'date-fns-tz';

import { generateEmbed } from './roo/embed';
import { matchSchedule } from './roo/match';

import { ROO_TIME_ZONE, Schedule, ScheduleKind, getScheduleDuration, getScheduleTime } from './roo/schedule';
import { getDailies } from './roo/schedule/daily';
import { getEvents } from './roo/schedule/event';
import { getResets } from './roo/schedule/reset';
import { trades } from './roo/schedule/trade';

const scheduled = ((_controller, env, ctx) => {
	const date = utcToZonedTime(Date.now(), ROO_TIME_ZONE);

	const dailies = getDailies(date);
	const events = getEvents(date);
	const resets = getResets(date);

	const schedules = [
		...dailies.map((value): Schedule => ({ kind: ScheduleKind.Daily, value })),
		...events.map((value): Schedule => ({ kind: ScheduleKind.Event, value })),
		...resets.map((value): Schedule => ({ kind: ScheduleKind.Reset, value })),
		...trades.map((value): Schedule => ({ kind: ScheduleKind.Trade, value })),
	] satisfies Schedule[];

	const embeds = [] as KindValue<ScheduleKind, DiscordWebhookEmbed>[];
	for (const schedule of schedules) {
		const time = getScheduleTime(schedule);
		const match = matchSchedule(time, date);
		if (match !== undefined) {
			const duration = getScheduleDuration(schedule);
			const embed = generateEmbed(schedule, match.kind, date, match.time, duration);
			embeds.push({ kind: schedule.kind, value: embed });
		}
	}

	if (embeds.length > 0) {
		// <@&{ID}> is role mention
		// ref:  https://discord.com/developers/docs/reference#message-formatting-formats
		const mention = `<@&${env.DISCORD_ROLE_MENTION_ID}>`;
		const kinds = [...new Set(embeds.map(({ kind: key }) => ScheduleKind[key]))]
			.sort((a, b) => a.localeCompare(b))
			.join(' & ');

		const payload = {
			content: `${mention} ${kinds}`,
			embeds: embeds.map(({ value }) => value),
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
