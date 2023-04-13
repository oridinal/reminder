import { ScheduleTime } from '.';

export enum RooDailyEvent {
	Arena,
	ExtremeChallenge,
	GuildExpedition,
	GuildFeast,
	RuneFashion,
	TheGuildLeague,
	ThemedParty,
	TimeSpaceAbnormality,
	WeekendBanquet,
}

export const dailyEvents = {
	// sunday
	0: [RooDailyEvent.ThemedParty, RooDailyEvent.GuildExpedition],

	// monday
	1: [RooDailyEvent.GuildFeast, RooDailyEvent.ExtremeChallenge],

	// tuesday
	2: [RooDailyEvent.GuildFeast, RooDailyEvent.TimeSpaceAbnormality, RooDailyEvent.TheGuildLeague],

	// wednesday
	3: [RooDailyEvent.RuneFashion, RooDailyEvent.GuildFeast, RooDailyEvent.Arena],

	// thursday
	4: [RooDailyEvent.GuildFeast, RooDailyEvent.GuildExpedition, RooDailyEvent.TheGuildLeague],

	// friday
	5: [RooDailyEvent.GuildFeast, RooDailyEvent.TimeSpaceAbnormality],

	// saturday
	6: [RooDailyEvent.WeekendBanquet, RooDailyEvent.TimeSpaceAbnormality, RooDailyEvent.TheGuildLeague],
} satisfies Record<Day, RooDailyEvent[]>;

export const getRooDailyEventTime = (event: RooDailyEvent): ScheduleTime => {
	switch (event) {
		case RooDailyEvent.RuneFashion:
			return { hours: 5, minutes: 0 };

		case RooDailyEvent.GuildFeast:
		case RooDailyEvent.ThemedParty:
		case RooDailyEvent.WeekendBanquet:
			return { hours: 20, minutes: 0 };

		case RooDailyEvent.Arena:
			return { hours: 20, minutes: 25 };

		case RooDailyEvent.ExtremeChallenge:
		case RooDailyEvent.GuildExpedition:
		case RooDailyEvent.TimeSpaceAbnormality:
			return { hours: 20, minutes: 30 };

		case RooDailyEvent.TheGuildLeague:
			return { hours: 20, minutes: 55 };
	}
};
