import { ScheduleTime } from '.';

export enum Daily {
	Arena,
	DuoBattleOfYggdrasil,
	ExtremeChallenge,
	GuildExpedition,
	GuildFeast,
	RuneFashion,
	TheGuildLeague,
	ThemedParty,
	TimeSpaceAbnormality,
	WeekendBanquet,
}

export const getDailies = (date: Date): Daily[] => {
	const day = date.getDay() as Day;

	switch (day) {
		case 0:
			// sunday
			return [Daily.DuoBattleOfYggdrasil, Daily.ThemedParty, Daily.GuildExpedition];

		case 1:
			// monday
			return [Daily.GuildFeast, Daily.ExtremeChallenge];

		case 2:
			// tuesday
			return [Daily.GuildFeast, Daily.TimeSpaceAbnormality, Daily.TheGuildLeague];

		case 3:
			// wednesday
			return [Daily.RuneFashion, Daily.GuildFeast, Daily.Arena];

		case 4:
			// thursday
			return [Daily.GuildFeast, Daily.GuildExpedition, Daily.TheGuildLeague];

		case 5:
			// friday
			return [Daily.GuildFeast];

		case 6:
			// saturday
			return [Daily.DuoBattleOfYggdrasil, Daily.WeekendBanquet, Daily.TimeSpaceAbnormality, Daily.TheGuildLeague];
	}
};

export const getDailyTime = (event: Daily): ScheduleTime => {
	switch (event) {
		case Daily.RuneFashion:
			return { hours: 5, minutes: 0 };

		case Daily.DuoBattleOfYggdrasil:
			return { hours: 10, minutes: 0 };

		case Daily.GuildFeast:
		case Daily.ThemedParty:
		case Daily.WeekendBanquet:
			return { hours: 20, minutes: 0 };

		case Daily.Arena:
			return { hours: 20, minutes: 25 };

		case Daily.ExtremeChallenge:
		case Daily.GuildExpedition:
		case Daily.TimeSpaceAbnormality:
			return { hours: 20, minutes: 30 };

		case Daily.TheGuildLeague:
			return { hours: 20, minutes: 55 };
	}
};
