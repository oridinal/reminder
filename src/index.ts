import { utcToZonedTime } from 'date-fns-tz';

import { ROO_TIME_ZONE, rooEventSchedule, getRooEventTime } from './roo/event';
import { DiscordWebhookPayload, checkRooEventTime, generatePayload } from './roo/payload';

interface Env {
	DISCORD_WEBHOOK_URL: string;
}

const scheduled = ((_controller, env, ctx) => {
	const now = utcToZonedTime(Date.now(), ROO_TIME_ZONE);

	const events = rooEventSchedule[now.getDay() as Day];
	const payloads = [] as DiscordWebhookPayload[];
	for (const event of events) {
		const eventTime = getRooEventTime(event);
		const payloadKind = checkRooEventTime(eventTime, now);
		if (payloadKind !== undefined) {
			const payload = generatePayload(payloadKind, event);
			payloads.push(payload);
		}
	}

	ctx.waitUntil(
		Promise.all(
			payloads.map((payload) =>
				fetch(env.DISCORD_WEBHOOK_URL, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload),
				}),
			),
		),
	);
}) satisfies ExportedHandlerScheduledHandler<Env>;

export default { scheduled } satisfies ExportedHandler<Env>;
