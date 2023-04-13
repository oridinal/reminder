export interface DiscordWebhookPayload {
	/** the message contents (up to 2000 characters) */
	content?: string;

	/** embedded `rich` content */
	embeds?: DiscordWebhookEmbed[];
}

export interface DiscordWebhookEmbed {
	/** title of embed */
	title?: string;

	/** description of embed */
	description?: string;

	/** timestamp of embed content */
	timestamp?: string;

	/** color code of the embed */
	color?: number;

	/** image information */
	image?: {
		/** source url of image (only supports http(s) and attachments) */
		url: string;
	};

	/** footer information */
	footer?: {
		/** footer text */
		text: string;
	};
}
