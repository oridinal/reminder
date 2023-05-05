export interface DiscordWebhookPayload {
	/** the message contents (up to 2000 characters) */
	content?: string;

	/** embedded `rich` content */
	embeds?: DiscordWebhookEmbed[];
}

export interface DiscordWebhookEmbed {
	/** title of embed */
	title?: string;

	/** timestamp of embed content */
	timestamp?: string;

	/** color code of the embed */
	color?: number;

	/** fields information */
	fields?: Array<{
		/** name of the field */
		name: string;

		/** value of the field */
		value: string;

		/** whether or not this field should display inline */
		inline?: boolean;
	}>;

	/** footer information */
	footer?: {
		/** footer text */
		text: string;

		/** url of footer icon (only supports http(s) and attachments) */
		icon_url?: string;
	};
}
