import { ScheduleTime } from '.';

export enum RooDaily {
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

export const dailies = {
	// sunday
	0: [RooDaily.ThemedParty, RooDaily.GuildExpedition],

	// monday
	1: [RooDaily.GuildFeast, RooDaily.ExtremeChallenge],

	// tuesday
	2: [RooDaily.GuildFeast, RooDaily.TimeSpaceAbnormality, RooDaily.TheGuildLeague],

	// wednesday
	3: [RooDaily.RuneFashion, RooDaily.GuildFeast, RooDaily.Arena],

	// thursday
	4: [RooDaily.GuildFeast, RooDaily.GuildExpedition, RooDaily.TheGuildLeague],

	// friday
	5: [RooDaily.GuildFeast, RooDaily.TimeSpaceAbnormality],

	// saturday
	6: [RooDaily.WeekendBanquet, RooDaily.TimeSpaceAbnormality, RooDaily.TheGuildLeague],
} satisfies Record<Day, RooDaily[]>;

export const getRooDailyTime = (event: RooDaily): ScheduleTime => {
	switch (event) {
		case RooDaily.RuneFashion:
			return { hours: 5, minutes: 0 };

		case RooDaily.GuildFeast:
		case RooDaily.ThemedParty:
		case RooDaily.WeekendBanquet:
			return { hours: 20, minutes: 0 };

		case RooDaily.Arena:
			return { hours: 20, minutes: 25 };

		case RooDaily.ExtremeChallenge:
		case RooDaily.GuildExpedition:
		case RooDaily.TimeSpaceAbnormality:
			return { hours: 20, minutes: 30 };

		case RooDaily.TheGuildLeague:
			return { hours: 20, minutes: 55 };
	}
};
