export const ROO_TIME_ZONE = '+07:00';

export enum RooEvent {
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

export const rooEvent = {
	0: /* sunday */ [RooEvent.ThemedParty, RooEvent.GuildExpedition],
	1: /* monday */ [RooEvent.GuildFeast, RooEvent.ExtremeChallenge],
	2: /* tuesday */ [RooEvent.GuildFeast, RooEvent.TimeSpaceAbnormality, RooEvent.TheGuildLeague],
	3: /* wednesday */ [RooEvent.RuneFashion, RooEvent.GuildFeast, RooEvent.Arena],
	4: /* thursday */ [RooEvent.GuildFeast, RooEvent.GuildExpedition, RooEvent.TheGuildLeague],
	5: /* friday */ [RooEvent.GuildFeast, RooEvent.TimeSpaceAbnormality],
	6: /* saturday */ [RooEvent.WeekendBanquet, RooEvent.TimeSpaceAbnormality, RooEvent.TheGuildLeague],
} satisfies Record<Day, RooEvent[]>;

export interface RooEventTime {
	hours: number;
	minutes: number;
}

export const getRooEventTime = (event: RooEvent): RooEventTime => {
	switch (event) {
		case RooEvent.RuneFashion:
			return { hours: 5, minutes: 0 };

		case RooEvent.GuildFeast:
		case RooEvent.ThemedParty:
		case RooEvent.WeekendBanquet:
			return { hours: 20, minutes: 0 };

		case RooEvent.Arena:
			return { hours: 20, minutes: 25 };

		case RooEvent.ExtremeChallenge:
		case RooEvent.GuildExpedition:
		case RooEvent.TimeSpaceAbnormality:
			return { hours: 20, minutes: 30 };

		case RooEvent.TheGuildLeague:
			return { hours: 20, minutes: 55 };
	}
};
