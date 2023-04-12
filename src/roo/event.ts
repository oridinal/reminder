export const ROO_TIME_ZONE = '+07:00';

export enum RooEvent {
	'Arena',
	'Extreme Challenge',
	'Guild Expedition',
	'Guild Feast',
	'Rune Fashion',
	'The Guild League',
	'Themed Party',
	'Time-Space Abnormality',
	'Weekend Banquet',
}

export const rooEvent = {
	0: /* sunday */ [RooEvent['Themed Party'], RooEvent['Guild Expedition']],
	1: /* monday */ [RooEvent['Guild Feast'], RooEvent['Extreme Challenge']],
	2: /* tuesday */ [RooEvent['Guild Feast'], RooEvent['Time-Space Abnormality'], RooEvent['The Guild League']],
	3: /* wednesday */ [RooEvent['Rune Fashion'], RooEvent['Guild Feast'], RooEvent.Arena],
	4: /* thursday */ [RooEvent['Guild Feast'], RooEvent['Guild Expedition'], RooEvent['The Guild League']],
	5: /* friday */ [RooEvent['Guild Feast'], RooEvent['Time-Space Abnormality']],
	6: /* saturday */ [RooEvent['Weekend Banquet'], RooEvent['Time-Space Abnormality'], RooEvent['The Guild League']],
} satisfies Record<Day, RooEvent[]>;

export interface RooEventTime {
	hours: number;
	minutes: number;
}

export const getRooEventTime = (event: RooEvent): RooEventTime => {
	switch (event) {
		case RooEvent['Rune Fashion']:
			return { hours: 5, minutes: 0 };

		case RooEvent['Guild Feast']:
		case RooEvent['Themed Party']:
		case RooEvent['Weekend Banquet']:
			return { hours: 20, minutes: 0 };

		case RooEvent.Arena:
			return { hours: 20, minutes: 25 };

		case RooEvent['Extreme Challenge']:
		case RooEvent['Guild Expedition']:
		case RooEvent['Time-Space Abnormality']:
			return { hours: 20, minutes: 30 };

		case RooEvent['The Guild League']:
			return { hours: 20, minutes: 55 };
	}
};
