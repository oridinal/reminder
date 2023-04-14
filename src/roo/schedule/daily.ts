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

export const getRooDailies = (date: Date): RooDaily[] => {
	const day = date.getDay() as Day;

	switch (day) {
		case 0:
			// sunday
			return [RooDaily.ThemedParty, RooDaily.GuildExpedition];

		case 1:
			// monday
			return [RooDaily.GuildFeast, RooDaily.ExtremeChallenge];

		case 2:
			// tuesday
			return [RooDaily.GuildFeast, RooDaily.TimeSpaceAbnormality, RooDaily.TheGuildLeague];

		case 3:
			// wednesday
			return [RooDaily.RuneFashion, RooDaily.GuildFeast, RooDaily.Arena];

		case 4:
			// thursday
			return [RooDaily.GuildFeast, RooDaily.GuildExpedition, RooDaily.TheGuildLeague];

		case 5:
			// friday
			return [RooDaily.GuildFeast, RooDaily.TimeSpaceAbnormality];

		case 6:
			// saturday
			return [RooDaily.WeekendBanquet, RooDaily.TimeSpaceAbnormality, RooDaily.TheGuildLeague];
	}
};

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
