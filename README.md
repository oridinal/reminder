# oridinal/reminder

Ragnarok Origin Global reminder using Discord webhook. Check out my [discord server](https://discord.gg/GTxyAaHXtt) to see it in action.

## Deployment

You need a [GitHub account](https://github.com/signup) and [Cloudflare Account](https://dash.cloudflare.com/sign-up) to deploy this.

1. Follow ALL instructions in the button below

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/oridinal/reminder)

Your first deploy should fail because we need additional configuration in the newly forked repository.

2. Add the required secrets

In your fork, go to `Settings` then `Secrets and Variable > Actions`. It should be like the image below.

![2023-05-26-173033_1366x768_scrot](https://github.com/oridinal/reminder/assets/99479536/35547a62-78c6-47f9-bb7f-303e7ccd3e5d)

Here, you need to add 2 additional secrets.

| `DISCORD_WEBHOOK_URL`          | `DISCORD_ROLE_MENTION_ID`  |
| ------------------------------ | -------------------------- |
| The webhook url to send to[^1] | The role id to mention[^2] |

[^1]: see `Making a Webhook` at https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks to create one in your discord server
[^2]: check https://discordhelp.net/role-id for a guide to get the role id

By the end it should look like this.

![2023-05-26-173548_1366x768_scrot](https://github.com/oridinal/reminder/assets/99479536/b043581b-c600-4210-a25d-ae1d3595615e)

3. Retry the deployment

In your fork, go to `Actions` then `Deploy` and click on `Run workflow`.

![2023-05-26-175258_1366x768_scrot](https://github.com/oridinal/reminder/assets/99479536/eb95532c-05cb-40e9-8646-1006eb943ef1)

> After this it should works now and it will automatically send the reminder to your discord webhook. If it's not working or you got an error somewhere, feel free to @ me in my discord server.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
