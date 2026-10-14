# Over Limit 本庄 /test 改修・検証記録

作業日：2026年10月14日（日本時間）

## 追加指定による更新

最新指定：帯ラベルを「3rd Degree Black Belt」、固定バー背景をrgba(0,0,0,0.5)、体験CTAをアイコンなしの「無料体験はこちら」、STEP 01〜03のバッジ文字を白に更新。

公開後のブラウザで上記ラベル、背景の実際のRGBA値、体験CTAのアイコン数0、STEP3件の白文字を確認。コンソールエラーなし。公開前後の本番ホーム・問い合わせ・/demo・robots・sitemapの応答ハッシュも一致。

この更新では通常ビルドがWindowsのEBUSYで停止したため、共通設定を変更せず `build-isolated.mjs` でAstroの静的ビルドを実施。出力・Astroキャッシュ・Viteキャッシュを一時フォルダへ分離して成功。最新の出力先は `latest-build-path.txt`。専用Workerはこの静的成果物の/testだけを配信しています。通常のCloudflare SSRビルド成功とは区別しています。

- メニュー末尾を「Contact」に統一。
- 「打撃のない組み技」の説明は、ユーザー指定の「パンチやキックなどの打撃が一切ないため、怪我のリスクが低く、翌日の仕事や学業にも支障なく楽しめます。」へ変更。
- 映像ボタンを再生・一時停止のSVGアイコンに変更。スクリーンリーダー向けラベルとツールチップも状態に追従。
- インストラクター写真下の「INSTRUCTOR / BLACK BELT」と帯グラフィックを載せる背景を白に変更。
- 下部CTAは「LINE相談はこちら」「無料体験予約はこちら」。LINEは#06c755背景・白文字。360pxでも文字の横はみ出しがないことを確認。
- テスト専用Workerへ公開更新。最終ビルド成功、変更対象型診断エラー0・警告0。公開ページで全指定の文言・配色を確認。

## 確認URL

- スマホから閲覧可能：https://tshr-bjj.com/test/
- モックフォーム：https://tshr-bjj.com/test/contact/
- ローカルビルドプレビュー：http://127.0.0.1:4322/test/
- ローカル再起動：プロジェクト直下で `node docs/test-review/preview.mjs`。4323はスクリプト遮断、4324は動き低減の模擬検証用。

当初はローカルのみの依頼でしたが、追加依頼により `/test` に限定して公開しました。新規専用Worker `tshr-bjj-test-preview` と `tshr-bjj.com/test`・`tshr-bjj.com/test/*` の2ルートのみを追加しています。既存本番Worker・/demoのルートは維持しています。

## ファイルと主な変更

| 対象 | 内容 |
|---|---|
| `src/pages/test/index.astro` | 実際のホームのimport構成を複製。テスト部品だけを使用。固定CTAの実測高を本文余白へ反映。 |
| `src/pages/test/contact.astro` | 体験・見学の任意の希望日と参加区分、任意の補足、名前・メール・種別の3必須、ラベル・autocomplete・入力エラー。確認画面のないボタン文言を整合。成功・失敗を選べる送信なしのモック。 |
| `src/layouts/TestLayout.astro` | 本番Layoutを使わない独立Layout。titleを1つに整理、常時noindex、テストURLのcanonical・OGP、ホームだけのFAQ構造化データ、問い合わせはContactPage。ロゴ実寸1200×1200にメタ情報を修正。 |
| `src/components/test/Header.astro` | オレンジ背景・黒系文字、hover/focus、native dialog、aria-expanded/controls、Tab循環、Escape、背景inert、フォーカス復帰、スクロール復帰、JS無効時の補助ナビ。 |
| `src/components/test/Hero.astro` | 縦書きコピーと元映像を維持。同映像のposter、停止/再生、画面外・非表示時停止、動き低減時の自動再生抑止。停止ボタンは固定CTAと重ならない位置。 |
| `src/components/test/Footer.astro` | 既存構成の複製、画像寸法設定。テストCSSで文字の可読性調整。 |
| `src/components/test/v2/*` | 実際に使用する11部品の独立コピー。予約リンクは/test/contact/。安全性の保証表現を見直し、持ち物統一、FAQ補足、画像最適化。料金・HTML週間表・代表メッセージ・実績は維持。 |
| `src/components/test/v2/Facility.astro` | コピー元と内容一致。既存の拡大機能をそのまま維持。新規機能なし。 |
| `src/styles/test.css` | global.cssから独立。Google FontsのCSS importを削除しLayoutで一元化。縦書きのセリフ体を含む既存familyを維持。フォーカス、フォーム16px文字、動き低減などを局所調整。 |
| `src/scripts/test/motion.ts` | 通常演出とLenisを維持し、現行型に適合。初期本文を透明にしない構成。ticker登録解除・自分のGSAP contextだけの解除・例外時の可読性復旧。 |
| `src/data/test/{faq,entities}.ts` | FAQ本文とJSON-LDの共通データ。既存の道場・人物情報とページ情報を分離。未確認の金曜営業時間だけ構造化データで保留。 |
| `public/test/*` | 写真2点×480/800/1200pxのWebPと、元映像からのposter。元素材は無変更。 |
| `docs/test-review/*` | 前後画像・ハッシュ・診断・検証記録・運営者質問・未承認方針草案・専用Worker公開設定。公開パッケージに文書や草案は含めていません。 |

## 本番に影響がないことの確認

- 作業前に既存のsrc・public・共通設定など88ファイルのSHA-256を記録し、最後も全件一致。
- ローカルには.gitがありません。指定コミット `5375d25ba6053847e23e28a46ef26933dd089adc` の主要18ファイルをGitHubから読み取り、改行・末尾空白を除いた内容一致を確認。ローカルのファイルは強制的に戻していません。
- 本番ホーム、/contact/、/demo/、robots.txt、sitemap.xmlのHTTP応答ハッシュは公開前後で全件一致。
- 本番Workerのバージョン `677cdf87-b20a-4043-a291-a548c627811f` とデプロイIDは変更なし。既存ルートIDも一致。
- 共通package.json・lockfile・Astro設定・本番wrangler.jsonc・robots・sitemapは無変更。コミット・push・PRなし。
- テスト専用CSS/JSは公開パッケージで `/test/_astro/`、共有素材のコピーは `/test/shared/` に配置。既存本番のアセットを上書きしません。
- 詳細：`production-before.json`、`source-verification.json`、`final-evidence.json`、`cloudflare-before.json`・`cloudflare-after.json`。

## 検証結果

| 項目 | 結果・範囲 |
|---|---|
| 複製時の比較 | 390pxで本番相当と変更前/testの全10セクションの幅・高さが一致。390px・1440pxの変更前画像を保存。動画フレームは再生時刻により異なる。 |
| 画面幅 | 360・390・430・768・1440pxの両ページ。ページ全体の意図しない横スクロールなし。料金4区分、表の内部横スクロール、CTAを確認。viewport変更による確認で、実機試験ではない。 |
| 固定CTA | 確認環境では高さ69px、本文の下余白も69px。safe-areaの既存計算を維持。JS停止時の余白は76px＋safe-areaを確保。 |
| メニュー | native modal、初期フォーカス、Tab/Shift+Tab循環、Escape、フォーカス復帰、背景操作抑止、閉じた後のスクロール復帰。360×640でも全項目到達。文字#141613対背景#ff6a00は約6.34:1。 |
| FAQ・予定・ギャラリー | details/summaryの開閉、週間表のキーボード横スクロール、施設拡大・閉じる・フォーカス復帰を確認。 |
| フォーム | 空欄・不正メールのエラー、任意日程・区分、種別に応じた欄表示、モック成功/失敗、入力保持を確認。フォームmethod=dialog、ボタンtype=button、CSP form-action none。外部送信の実装なし。 |
| 動き低減 | QAサーバーでmatchMedia条件とCSSを強制した模擬検証。本文・見出し・フォームのopacity=1、映像停止を確認。OS設定自体を切り替える実機試験は未実施。 |
| JS停止 | QAサーバーのCSP script-src noneで実行を遮断。本文・料金・CTA・フォームを読め、モックボタンが無効。HTMLのnoscript案内も確認。ブラウザ設定によるJS完全無効の実機試験は未実施。 |
| SEO出力 | 両ページともnoindex、titleは各1つ、/testのcanonical/OGP。ホームFAQ8件と本文の一致、問い合わせはFAQなし。ロゴ実寸確認。sitemapに/testを追加していない。 |
| 型診断 | 隔離した検証ツールで変更対象20ファイル：エラー0・警告0。全srcでは既存のindex.astroの2件とdemo.astroの1件、計3エラー。smoothTouchと未型付け引数であり、本番を変更して解消していない。 |
| ビルド | 最終 `npm run build` 成功。中間のキャッシュロックは作業用devサーバー停止で解消。 |
| 公開後 | /test/・/test/contact/が200。39素材がHEADで200。/testは308で/test/へ。公開版のメニュー・停止/再生・メタ情報確認、コンソールerror/warnなし。 |
| 解析・送信 | 調査対象ソースに解析イベントの実送信なし。公開HTMLで観測したscript srcはテスト側の2本。専用Workerのconnect-src selfで外部の送信先も抑止。第三者iframe内部や今後外部から自動挿入される処理までは保証していない。 |

`typecheck-current.log` の既存3エラーと `typecheck-test.json` の変更対象0エラーを区別しています。旧監査の件数は流用していません。

## 画像と速度の確認範囲

- 女性写真：元1,414,715 bytes。WebPは480px 20,652／800px 41,844／1200px 70,568 bytes。
- キッズ写真：元695,765 bytes。WebPは480px 18,776／800px 40,366／1200px 74,388 bytes。
- 同じ映像からのposter：39,584 bytes、1440×2560。映像本体は元ファイルのまま。
- srcset/sizesと寸法を設定し、既存のobject-fitによるトリミングを維持。LCP候補のposterをpreloadし、元映像はmetadata読み込みから開始。
- これは素材ファイルの容量。ページ総転送量・LCP改善量・Lighthouseスコア・実利用CWVは測定していません。順位やインデックス改善を実施済みとは扱っていません。

## 残る事業確認と採用作業

`BUSINESS-QUESTIONS.md` に公式大会資料のリンクと未確認事項、`PRIVACY-DRAFT.md` に未承認草案があります。受付方式・正式方針・金曜営業時間・実績の本人表記などを確認してください。返信時間・保険・道着貸出・女性同士の練習等は推測で追加していません。

テスト版は検索除外され、実送信も予約成立も行いません。実際の本番採用には、正式方針の公開リンク、受付手順の確定、FormSubmitの接続と管理者による受信確認、実機操作確認が必要です。LINEの値は既存の正しいURLを維持しています。GoogleビジネスプロフィールとSearch Consoleは未確認です。

## 再検証コマンド

```powershell
npm.cmd run build
node docs/test-review/check-test.mjs
node docs/test-review/validate-build.mjs
node docs/test-review/verify-source.mjs
node docs/test-review/prepare-test-deploy.mjs
node docs/test-review/preview.mjs
```

公開更新は共通wrangler.jsoncではなく `docs/test-review/wrangler.test.json` に限定します。この記録に公開操作を再実行する必要はありません。
