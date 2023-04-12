import { utcToZonedTime } from 'date-fns-tz';

import { generateEmbed } from './roo/embed';
import { ROO_TIME_ZONE, getRooEventTime, rooEvent } from './roo/events';
import { matchEvent } from './roo/match';

import { DiscordWebhookEmbed, DiscordWebhookPayload } from './types';

const scheduled = ((_controller, env, ctx) => {
	const date = utcToZonedTime(Date.now(), ROO_TIME_ZONE);

	const events = rooEvent[date.getDay() as Day];
	const embeds = [] as DiscordWebhookEmbed[];
	for (const event of events) {
		const eventTime = getRooEventTime(event);
		const matchKind = matchEvent(eventTime, date);
		if (matchKind !== undefined) {
			embeds.push(generateEmbed(event, matchKind));
		}
	}

	if (embeds.length > 0) {
		const payload = {
			// <@&{ID}> is role mention
			// ref:  https://discord.com/developers/docs/reference#message-formatting-formats
			content: `<@&${env.ROLE_MENTION_ID}>`,
			embeds,
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
