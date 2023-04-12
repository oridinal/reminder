import { describe, expect, it } from 'vitest';

import { set } from 'date-fns';

import { PayloadKind, getPayloadKind } from './payload';

describe('checkRooEventTime', () => {
	it('should handle tenMinutesBeforeEvent', () => {
		expect(
			getPayloadKind({ hours: 20, minutes: 55 }, set(Date.now(), { hours: 20, minutes: 45 })),
			'in the same hour',
		).toBe(PayloadKind.tenMinutesBeforeEvent);
		expect(getPayloadKind({ hours: 5, minutes: 0 }, set(Date.now(), { hours: 4, minutes: 50 })), 'an hour before').toBe(
			PayloadKind.tenMinutesBeforeEvent,
		);

		expect(
			getPayloadKind({ hours: 20, minutes: 0 }, set(Date.now(), { hours: 20, minutes: 10 })),
			'not before',
		).not.toBe(PayloadKind.tenMinutesBeforeEvent);
	});

	it('should handle eventStart', () => {
		expect(
			getPayloadKind({ hours: 20, minutes: 0 }, set(Date.now(), { hours: 20, minutes: 0 })),
			'exact hour and minute',
		).toBe(PayloadKind.eventStart);
	});
});
