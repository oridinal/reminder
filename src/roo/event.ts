export const ROO_TIME_ZONE = '+07:00';

enum Day {
	sunday,
	monday,
	tuesday,
	wednesday,
	thursday,
	friday,
	saturday,
}

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

export const rooEventSchedule = {
	[Day.sunday]: [RooEvent['Themed Party'], RooEvent['Guild Expedition']],
	[Day.monday]: [RooEvent['Guild Feast'], RooEvent['Extreme Challenge']],
	[Day.tuesday]: [RooEvent['Guild Feast'], RooEvent['Time-Space Abnormality'], RooEvent['The Guild League']],
	[Day.wednesday]: [RooEvent['Rune Fashion'], RooEvent['Guild Feast'], RooEvent.Arena],
	[Day.thursday]: [RooEvent['Guild Feast'], RooEvent['Guild Expedition'], RooEvent['The Guild League']],
	[Day.friday]: [RooEvent['Guild Feast'], RooEvent['Time-Space Abnormality']],
	[Day.saturday]: [RooEvent['Weekend Banquet'], RooEvent['Time-Space Abnormality'], RooEvent['The Guild League']],
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
