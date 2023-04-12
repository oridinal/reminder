import { utcToZonedTime } from 'date-fns-tz';

import { ROO_TIME_ZONE, rooEvent, getRooEventTime } from './roo/event';
import { DiscordWebhookPayload, getPayloadKind, generatePayload } from './roo/payload';

const scheduled = ((_controller, env, ctx) => {
	const date = utcToZonedTime(Date.now(), ROO_TIME_ZONE);

	const events = rooEvent[date.getDay() as Day];
	const payloads = [] as DiscordWebhookPayload[];
	for (const event of events) {
		const eventTime = getRooEventTime(event);
		const payloadKind = getPayloadKind(eventTime, date);
		if (payloadKind !== undefined) {
			payloads.push(generatePayload(event, payloadKind, env));
		}
	}

	if (payloads.length > 0) {
		const promises = payloads.map((payload) =>
			fetch(env.DISCORD_WEBHOOK_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			}),
		);

		ctx.waitUntil(Promise.all(promises));
	}
}) satisfies ExportedHandlerScheduledHandler<Env>;

export default { scheduled } satisfies ExportedHandler<Env>;
