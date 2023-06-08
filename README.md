# sumire

Misskey WebHook を Discord へ転送する Cloudflare Worker スクリプト。

名前の由来は、このスクリプトが必要になった[うちのこすきー](https://uchinoko.club)お知らせアカウント「すみれ」から。

## 使い方

Cloudflare Worker の使い方は省くので各自調べること。

Wrangler CLI を使って以下のキーのシークレット変数をセットする。

| 変数                   | 説明                                    |
| ---------------------- | --------------------------------------- |
| DISCORD_WEBHOOK_URL    | Discord の WebHook URL                  |
| MISSKEY_WEBHOOK_SECRET | Misskey Hook に設定したシークレット値。 |
| HOST                   | 対象とする Misskey サーバーのホスト。   |

設定後、Cloudflare Workers にデプロイする。

完了したら、デプロイ先の URL + /sumire にリクエストが飛ぶように Misskey 側で WebHook を作成する。

## LICENSE

MIT ライセンス。
