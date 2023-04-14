import { utcToZonedTime } from 'date-fns-tz';

import { generateEmbed } from './roo/embed';
import { matchEvent } from './roo/match';

import { ROO_TIME_ZONE, RooSchedule, RooScheduleKind, getScheduleTime } from './roo/schedule';
import { dailyEvents } from './roo/schedule/daily-event';
import { allTradeInventoryReset } from './roo/schedule/trade-inventory-reset';

import { DiscordWebhookEmbed, DiscordWebhookPayload } from './types';
import { toSpaceSeparatedPascalCase } from './utilities';

const scheduled = ((_controller, env, ctx) => {
	const date = utcToZonedTime(Date.now(), ROO_TIME_ZONE);

	const events = dailyEvents[date.getDay() as Day];
	const schedules = [
		...events.map((value): RooSchedule => [value, RooScheduleKind.DailyEvent]),
		...allTradeInventoryReset.map((value): RooSchedule => [value, RooScheduleKind.TradeInventoryReset]),
	] satisfies RooSchedule[];

	const embeds = [] as [DiscordWebhookEmbed, RooScheduleKind][];
	for (const schedule of schedules) {
		const time = getScheduleTime(schedule);
		const match = matchEvent(time, date);
		if (match !== undefined) {
			const embed = generateEmbed(schedule, match);
			embeds.push([embed, schedule[1]]);
		}
	}

	if (embeds.length > 0) {
		// <@&{ID}> is role mention
		// ref:  https://discord.com/developers/docs/reference#message-formatting-formats
		const mention = `<@&${env.ROLE_MENTION_ID}>`;

		ctx.waitUntil(
			Promise.all(
				embeds
					.map(
						([embed, kind]): DiscordWebhookPayload => ({
							content: `${mention} ${toSpaceSeparatedPascalCase(RooScheduleKind[kind])}`,
							embeds: [embed],
						}),
					)
					.map((payload) =>
						fetch(env.DISCORD_WEBHOOK_URL, {
							body: JSON.stringify(payload),
							headers: { 'Content-Type': 'application/json' },
							method: 'POST',
						}),
					),
			),
		);
	}
}) satisfies ExportedHandlerScheduledHandler<Env>;

export default { scheduled } satisfies ExportedHandler<Env>;
