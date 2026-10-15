# 本番トップの4言語公開（2026-10-15）

公開先は `/`、`/english/`、`/portugues/`、`/gunma/`、`/contact/`、`/sitemap.xml`。日本語 `/` を標準トップとし、日本語・英語・ポルトガル語は `index, follow`、群馬弁は運営者の指定で `noindex, follow`。テスト版は従来の `noindex, nofollow` を維持する。

全言語の見学・体験・お問い合わせリンクは日本語の既存 `/contact/` に統一。各言語配下の `contact/` は `/contact/` へ308リダイレクトする。問い合わせページの翻訳は公開していない。`/test/contact/` と各言語のテストフォームは今後の検証用に維持した。

## 配信の分離

`tshr-bjj-home` Worker がトップ4ページ、新ヘッダーを実装した `/contact/`、`/sitemap.xml` と `/site/*` の静的ファイルを配信する。問い合わせページも同じ公開手順で更新できるよう、`/contact`・`/contact/*` と `/sitemap.xml` のルートを追加した。元の `local-gym-site` Worker は更新せず、`/demo/` と robots は引き続き元のWorker、`/test/` はテスト専用Workerで配信する。

最新公開version: `2f575ad5-e99e-4ffe-98fd-6be94e2ae124`

最新公開後の確認: 4言語のSEO設定、新ヘッダーとメニュー開閉、問い合わせフォームの送信先・必須項目、サイトマップ、45配信ファイルを確認。ブラウザーの警告・エラーなし。フォームの実送信は行っていない。`/demo/`・robots・`/test/`・`/test/contact/` は公開前後でHTMLのSHA-256が一致した。

追記: ヒーロー背景のパララックス開始を `top top`・移動量0に固定し、最上部で約5px下へずれて黒帯が出る症状を修正。4言語×360/1366pxで背景上端が0pxになることを確認。

## ソースとビルド

- `src/pages/index.astro` → `src/layouts/SiteLayout.astro`、`src/components/site/`、`src/styles/site.css`、`src/scripts/site/`、`src/data/site/`
- `public/site/` は既存テスト素材の複製。元の素材は変更しない。
- `scripts/site/localize.mjs` は検証済みのDOM翻訳処理を共有し、本番用データと本番URLを使用する。
- `scripts/generate-translations.mjs` は通常ビルド時に本番トップ4ページとテスト8ページを生成する。既存 `/contact/` を翻訳・上書きする処理はない。
- `scripts/promote-home-source.mjs` は今回の初期複製に使用した移行用スクリプト。通常の更新で再実行すると本番側の編集をテスト側の内容で置き換えるため、通常ビルドでは使用しない。

通常ビルドは `npm run build`。Dropboxの既存出力先ロックを避ける検証・公開用ビルドには以下を使用した。

```powershell
node docs/test-review/build-isolated.mjs
$publishBuild = (Get-Content docs/test-review/latest-build-path.txt -Raw).Trim()
node scripts/generate-translations.mjs $publishBuild
node scripts/site/prepare-deploy.mjs $publishBuild
node scripts/site/validate.mjs
node scripts/site/check.mjs
node_modules/.bin/wrangler.cmd deploy --config docs/production/wrangler.home.json
node scripts/site/verify-live.mjs
```

公開成果物は無視対象の `local-assets/production-release/` に生成する。問い合わせページを含め、使用するCSS・JS・画像は `/site/` 配下にまとめる。サイトマップには日本語・英語・ポルトガル語と `/contact/` を掲載する。日本語・英語・ポルトガル語は相互のhreflangを持ち、`x-default` は日本語 `/` を指す。

## 初回公開時の検証（以下は当時の記録）

- 隔離Astroビルド成功。本番22ファイル、既存テスト24ファイルの型診断はいずれもエラー0・警告0。
- 4言語×360・390・430・768・1366pxでブラウザー表示確認。ページ全体の横はみ出しなし。実機検証ではない。
- 全言語でメニュー開閉、Escape、フォーカス移動、動画停止、FAQ開閉を確認。新規コンソールエラーなし。
- 全言語でお問い合わせリンク8か所が `/contact/`。ポルトガル語の固定CTAをクリックし、実際に既存日本語フォームへ遷移することを確認。
- 公開4ページは200、title各1個、本番canonical、index/follow。公開成果物40件はすべて200。各言語 `contact/` の308を確認。
- 既存 `/contact/` のHTMLと関連3アセットは公開前後でSHA-256完全一致。HTML: `87d233391e1deec709a4dc2c6551b2fdf8afd2f75be94ee6c46b08e27229d443`。フォーム・既存Layoutのソースにも差分なし。実送信は行っていない。
- テスト8ページの生成経路一致、FAQ7問・JSON-LD、リンク・メタ情報の回帰検証に合格。全言語のテストcontactは200・noindex・モック送信抑止を維持。
- 依存関係、package/lock、既存Astro/Cloudflare設定、robots、sitemap、既存フォーム、テストページのソースや公開成果物は変更していない。

Googleによる再クロール・インデックス反映や検索順位は未測定。最新公開ではサイトマップも更新済みで、検索対象の言語トップはヘッダー・hreflang・サイトマップから到達できる。
