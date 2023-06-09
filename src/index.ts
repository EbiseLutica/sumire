import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Payload } from './types/payload';
import { webhook } from './webhook';
import { buildDiscordPayload, buildNoteEmbed, buildUserEmbed } from './build-embed';

export type Bindings = {
  DISCORD_WEBHOOK_URL: string;

  MISSKEY_WEBHOOK_SECRET: string;

  HOST: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('/*', cors());

app.post('/sumire', async (ctx) => {
  try {
    const host = ctx.env.HOST;

    const payload = await ctx.req.json<Payload>();

    if (ctx.req.headers.get('X-Misskey-Hook-Secret') != ctx.env.MISSKEY_WEBHOOK_SECRET) {
      ctx.status(400);
      console.log(`Invalid hook secret.`);
      return ctx.text('bad request');
    }
    console.log(payload.body);

    switch (payload.type) {
      case 'follow':
        await webhook(ctx.env.DISCORD_WEBHOOK_URL, buildDiscordPayload('**フォローしました。**', buildUserEmbed(payload.body.user, host)));
        break;
      case 'followed':
        await webhook(
          ctx.env.DISCORD_WEBHOOK_URL,
          buildDiscordPayload('**フォローされました。**', buildUserEmbed(payload.body.user, host))
        );
        break;
      case 'unfollow':
        await webhook(
          ctx.env.DISCORD_WEBHOOK_URL,
          buildDiscordPayload('**フォローを解除しました。**', buildUserEmbed(payload.body.user, host))
        );
        break;
      case 'note':
        await webhook(
          ctx.env.DISCORD_WEBHOOK_URL,
          buildDiscordPayload('**ノートを投稿しました。**', buildNoteEmbed(payload.body.note, host))
        );
        break;
      case 'reply':
        await webhook(ctx.env.DISCORD_WEBHOOK_URL, buildDiscordPayload('**返信があります。**', buildNoteEmbed(payload.body.note, host)));
        break;
      case 'renote':
        const discordPayload = payload.body.note.text ? (
          buildDiscordPayload('**引用されました。**', buildNoteEmbed(payload.body.note, host))
        ) : (
          buildDiscordPayload('**Renoteされました。**', buildUserEmbed(payload.body.note.user, host))
        );
        await webhook(ctx.env.DISCORD_WEBHOOK_URL, discordPayload);
        break;
      case 'mention':
        await webhook(
          ctx.env.DISCORD_WEBHOOK_URL,
          buildDiscordPayload('**メンションを受信しました。**', buildNoteEmbed(payload.body.note, host))
        );
        break;
      default:
        const p = payload as any;
        await webhook(ctx.env.DISCORD_WEBHOOK_URL, {
          content: `謎のメッセージ \`${p.type}\`\n\`\`\`\n${JSON.stringify(p.body, null, '  ')}\n\`\`\``,
        });
    }
    return ctx.text('successfully processed');
  } catch (e) {
    console.error(e);
    ctx.status(500);
    return ctx.text('failed');
  }
});

export default app;
