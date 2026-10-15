# サイト全改善・一括実装マスタープロンプト

このドキュメントは、`docs/site-evaluation.md` で抽出されたすべての課題・UI崩れ・SEO・アクセシビリティ・セキュリティ・パフォーマンス改善を、AIが1回の指示で完遂するための実行指示書（プロンプト）です。

---

## 実行プロンプト本文（ここからコピーして使用）

```markdown
あなたはプロのフロントエンド/Webエンジニアです。
`docs/site-evaluation.md` に記載されているすべての改善点・課題を、一切の妥協なく【1回で全て実装・本番反映】してください。
以下の仕様、対象ファイル、制約、デプロイ手順に厳格に従って作業を完遂してください。

================================================================================
【大前提・厳格な制約（絶対に崩してはならないルール）】
================================================================================
1. 既存の配色ルールを死守すること：
   - 最下部フッター背景色: `#1A1A1A`
   - 画面下部固定CTAバーの背景色: `rgba(0, 0, 0, 0.5)`（変更禁止）
   - 固定CTAバーのアイコン（LINE公式ロゴ、メール封筒アイコン）を維持すること。
2. Googleマップ口コミの仕様：
   - レビュアーの個人名は非表示（アイコン＋星評価＋本文のみ）を維持すること。
3. 多言語（日本語 / english / portugues / gunma）および独立した `/test/` 環境の整合性を破壊しないこと。
4. Windows PowerShell環境で作業するため、コマンド連結に `&&` は使用せず、`;` で連結すること。

================================================================================
【実装対象モジュールと詳細仕様】
================================================================================

■ モジュール1: UI・レイアウト崩れの解消（最優先）
1. PCヘッダー見切れ修正 (`src/components/site/TatoruHeader.astro` & `src/components/test/TatoruHeader.astro`):
   - 1200px〜1350px付近の画面幅で、右端の「見学・体験予約」ボタンが画面外へはみ出る問題を解決する。
   - `@media (max-width: 1199px)` のブレークポイントを `1350px`（または適切な幅）へ引き上げるか、ナビゲーションの文字間隔（`gap`）およびフォントサイズを最適化し、1200px以上の全PC画面でロゴ・9項目・言語セレクター・予約ボタンが一切見切れず1行に収まるようにする。
2. 多言語スマホヘッダー崩れ修正 (`src/components/site/TatoruHeader.astro` & `src/components/test/TatoruHeader.astro`):
   - 375px以下のスマホにおいて、ポルトガル語（`Português`）や英語を選択した際、ヘッダー右端のメニュー開閉ボタン（三本線）が画面外へ押し出されてタップ不能になるバグを修正する。
   - スマホ画面（<=767px）では言語トリガーのパディングやロゴの縮小幅を調整し、三本線ボタンが必ず常時右端に表示されるようにする。
3. 固定CTAバーの文字切れ解消 (`src/components/site/v2/BottomFixedCta.astro`):
   - 英語（`Book Free Tria...`）およびポルトガル語（`Aula Experimental...`）で文字やアイコンが切れる現象を修正する。
   - 375px幅でも切れないよう、多言語時のフォントサイズ（11〜12px）、パディングを調整するか、英語は「Free Trial」、ポルトガル語は「Aula Grátis」など簡潔で収まる自然な翻訳文に調整する。
4. ヒーロー白ボタンの矢印はみ出し修正 (`src/components/site/Hero.astro`):
   - ポルトガル語の長文テキスト「AGENDAR AULA EXPERIMENTAL GRATUITA」で右矢印がボタン枠外にはみ出さないよう、横幅 `max-width`・`padding`・フォントサイズをレスポンシブに調整する。
5. スマホ料金カードの可読性向上 (`src/components/site/v2/System.astro`):
   - スマホ（<=600px）での2列表示によりカード内テキストが「10px」に極小化しているのを改善。スマホでは1列カードレイアウト（または見やすいスワイプ/グリッド）にし、フォントサイズを標準的な13〜14pxに維持する。
   - 一番人気の基本プラン（男性会員）に「人気」または「標準プラン」等のバッジ/枠線アクセントを付与し、視覚的な選びやすさを向上させる。

■ モジュール2: アクセシビリティ 100/100 達成
1. 帯画像の規格違反修正 (`src/components/site/v2/Instructor.astro` & `src/components/test/v2/Instructor.astro`):
   - `<div class="belt-graphic" aria-label="3段黒帯 (3本のストライプ)">` に `role="img"` を追加する（ARIA 1.2規格準拠。これによりLighthouse Accessibilityが100点満点になる）。
2. 日本語h1のスクリーンリーダー読み上げ改善 (`src/components/site/Hero.astro`):
   - 日本語の `<h1 class="hero__vert-text">` に `aria-label="本庄の柔術で、人生を豊かに。"` を付与し、分割されている内部の `<span class="hero__char">` 群には `aria-hidden="true"` を設定する（1文字ずつの不自然な読み上げを防止）。

■ モジュール3: 多言語SEO・メタデータ連携
1. 多言語headタグ・JSON-LDの翻訳適用 (`scripts/site/localize.mjs` & `src/data/site/translations.js`):
   - 現在 `/english/` と `/portugues/` で日本語のまま出力されている `meta description`、`og:description`、および構造化データ（JSON-LD）の道場説明文を、それぞれの言語（英語・ポルトガル語）の適切な翻訳テキストに差し替えるようローカライズ処理を拡張する。

■ モジュール4: ページ設定・インデックス最適化
1. 送信完了ページの制御 (`src/pages/thanks.astro`):
   - `<meta name="robots" content="noindex, follow" />` を設定し、検索結果へのインデックスを防止する。
2. デモページの非公開化 (`src/pages/demo.astro`):
   - `<meta name="robots" content="noindex, nofollow" />` を設定する。
3. ファビコン・Webクリップアイコンの404解消 (`scripts/site/prepare-deploy.mjs`):
   - `/favicon.ico` および `/apple-touch-icon.png` への直接リクエストが404にならないよう、デプロイ生成時にルートへ静的ファイルを確実に配置する。
4. 404エラーページの独自デザイン化 (`src/pages/404.astro` または Worker側フォールバック):
   - Astro標準の無機質な英語404画面ではなく、道場のロゴ・「ページが見つかりません」の案内・トップおよび無料体験予約への誘導ボタンを配置した日本語ページを用意する。

■ モジュール5: お問い合わせフォーム＆プライバシーポリシー改善
1. LINEロゴの外部依存解消 (`src/pages/contact.astro`):
   - `upload.wikimedia.org` から直接読み込んでいるのをやめ、インラインSVG（またはローカル静的SVG）に統一する。
2. フォーム項目の充実 (`src/pages/contact.astro`):
   - 「体験希望日（カレンダー日付選択）」および「希望クラス（大人ビギナー / オールレベル / キッズ / 女性向け）」の選択項目を追加し、やり取りの手間を軽減する。
3. プライバシーポリシーの追記 (`src/pages/privacy.astro`):
   - 「4. 個人情報の第三者提供について」に、お問い合わせ管理・メール送信業務を円滑に行うため、適切な委託先サービスを利用する場合がある旨の条項を明記する。

■ モジュール6: セキュリティヘッダーの強化 (`docs/production/home-worker.js`)
1. Cloudflare Worker のレスポンスヘッダーに以下を追加・設定する：
   - `X-Frame-Options: SAMEORIGIN`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
   - `X-Content-Type-Options: nosniff`

■ モジュール7: モバイルパフォーマンス最適化 (`src/components/site/Hero.astro`)
1. ヒーロー動画（7.1MB）のモバイル負荷軽減：
   - モバイル回線や `prefers-reduced-motion`、または画面幅の狭い端末において、初回から重い動画を強制プリロード/自動再生しないよう、条件判定（画面幅または省データモード時）を追加し、初期表示の高速化（LCP改善）を図る。

================================================================================
【ビルド・デプロイ・反映手順（厳格順守）】
================================================================================
修正完了後、PowerShellにて以下のコマンドを順次実行して本番環境へデプロイしてください：

1. 隔離ビルドの実行:
   node docs/test-review/build-isolated.mjs

2. ビルドパスの取得と多言語ファイルの生成:
   $b = (Get-Content docs/test-review/latest-build-path.txt -Raw).Trim()
   node scripts/generate-translations.mjs $b

3. デプロイ用静的アセットの準備:
   node scripts/site/prepare-deploy.mjs $b

4. 静的アセットのバリデーション・健全性チェック:
   node scripts/site/validate.mjs
   node scripts/site/check.mjs

5. Cloudflare Worker本番へのデプロイ:
   node_modules/.bin/wrangler.cmd deploy --config docs/production/wrangler.home.json

6. 本番環境のライブ検証:
   node scripts/site/verify-live.mjs

7. Gitコミット＆プッシュ:
   git add .
   git commit -m "feat(site): resolve all UI bugs, accessibility, multilingual SEO, and security improvements from site-evaluation"
   git push origin main

================================================================================
【完了報告の要件】
================================================================================
すべての処理が完了したら、以下の項目を報告してください：
1. 修正・改善した具体的なファイル一覧と各箇所の変更内容
2. Cloudflare Worker へのデプロイ成功確認（バージョンIDまたはステータス）
3. デスクトップヘッダー（1280px）および多言語スマホ（375px）のレイアウト修正確認結果
4. Lighthouseスコアの改善見込み（アクセシビリティ100点達成など）
```
