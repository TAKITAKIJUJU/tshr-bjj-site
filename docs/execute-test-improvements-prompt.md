# 【テスト環境 /test/ 限定】全改善・先行検証マスタープロンプト

このドキュメントは、`docs/site-evaluation.md` で抽出された改善点を**本番サイト（`https://tshr-bjj.com/`）には一切影響を与えず**、先行検証用環境（`https://tshr-bjj.com/test/`）のみに完全適用・デプロイするためのプロンプトです。

---

## 実行プロンプト本文（ここからコピーして使用）

```markdown
あなたはプロのフロントエンド/Webエンジニアです。
`docs/site-evaluation.md` に記載されている改善点・UI崩れ・アクセシビリティ・フォーム改善を、【本番環境を一切触らず、先行検証用環境 `/test/`（https://tshr-bjj.com/test/）限定】ですべて実装・反映してください。

================================================================================
【最重要制約（絶対に守ること）】
================================================================================
1. 本番用ファイル（`src/components/site/**`、`src/pages/index.astro`、`src/pages/contact.astro`、`src/pages/privacy.astro`、`src/pages/thanks.astro`、`docs/production/**`）は【1行も変更しない】こと。本番サイトに1ミリも影響を与えてはならない。
2. すべての変更は、テスト環境用ファイル群（`src/components/test/**`、`src/pages/test/**`、`src/layouts/TestLayout.astro`、`src/styles/test.css`、`scripts/test/**`）のみに適用すること。
3. テスト環境固有の制約：
   - 最下部フッター背景色: `#1A1A1A` を維持
   - 固定CTAバー背景色: `rgba(0, 0, 0, 0.5)` を維持
   - Googleマップ口コミの個人名非表示（アイコン＋星評価＋本文のみ）を維持
   - テスト環境ページには `noindex, nofollow` を維持すること
4. Windows PowerShell環境で作業するため、コマンド連結に `&&` は使わず `;` で連結すること。

================================================================================
【実装対象（/test/ 配下ファイル限定）】
================================================================================

■ 1. PCヘッダー見切れ修正 (`src/components/test/TatoruHeader.astro`)
- 1200px〜1350pxの画面幅で、右端の「見学・体験予約」ボタンが画面外へはみ出る問題を解決する。
- ナビゲーションの文字間隔（gap: clamp）、余白、フォントサイズを最適化し、1280pxを含む全PC幅で「ロゴ＋9項目＋言語セレクター＋予約ボタン」が綺麗に1行に収まるようにする。

■ 2. 多言語スマホヘッダーのメニューボタン押し出し消失修正 (`src/components/test/TatoruHeader.astro`)
- 375px以下のスマホにおいて、ポルトガル語（`Português`）や英語を選択した際、ヘッダー右端のメニュー開閉ボタン（三本線）が画面外へ押し出されてタップ不能になるバグを修正する。
- スマホ画面（<=767px）では言語トリガーのパディングやロゴの縮小幅を調整し、三本線ボタンが必ず常時右端に表示されるようにする。

■ 3. 固定CTAバーの文字切れ解消 (`src/components/test/v2/BottomFixedCta.astro`)
- 英語（`Book Free Tria...`）およびポルトガル語（`Aula Experimental...`）で文字やアイコンが切れる現象を修正する。
- 多言語時のフォントサイズ（11〜12px）、パディングを最適化し、英語は「Free Trial」、ポルトガル語は「Aula Grátis」など簡潔で収まる自然な翻訳ラベルに調整する。

■ 4. ヒーロー白ボタンの矢印はみ出し＆h1読み上げ改善 (`src/components/test/Hero.astro`)
- ポルトガル語の長文テキスト「AGENDAR AULA EXPERIMENTAL GRATUITA」で右矢印がボタン枠外にはみ出さないよう、横幅・パディング・フォントサイズをレスポンシブに調整する。
- 日本語の `<h1 class="hero__vert-text">` に `aria-label="本庄の柔術で、人生を豊かに。"` を付与し、分割されている内部の `<span class="hero__char">` 群には `aria-hidden="true"` を設定する。
- モバイル・省データモード時に重い動画の自動読み込みを抑止する制御を追加する。

■ 5. アクセシビリティ 100/100 達成 (`src/components/test/v2/Instructor.astro`)
- `<div class="belt-graphic" aria-label="3段黒帯 (3本のストライプ)">` に `role="img"` を追加する（ARIA 1.2規格準拠）。

■ 6. スマホ料金カードの可読性向上 (`src/components/test/v2/System.astro`)
- スマホ（<=600px）での2列表示によりカード内テキストが「10px」に極小化しているのを改善。スマホでは1列カードレイアウト（または見やすいスワイプ/グリッド）にし、フォントサイズを標準的な13〜14pxに維持する。
- 一番人気の基本プラン（男性会員）に「人気」または「標準プラン」等のバッジ/枠線アクセントを付与する。

■ 7. お問い合わせフォーム改善 (`src/pages/test/contact.astro` & `src/components/test/v2/Contact.astro`)
- contact ページの LINEロゴを `upload.wikimedia.org` からの直接参照をやめ、インラインSVG（またはローカル静的SVG）に統一する。
- フォームに「体験希望日（カレンダー日付選択）」および「希望クラス（大人ビギナー / オールレベル / キッズ / 女性向け）」の選択項目を追加する。

================================================================================
【テスト環境ビルド・デプロイ手順（PowerShell）】
================================================================================
修正完了後、PowerShellにて以下の手順でテスト環境用Worker（tshr-bjj-test-preview）へデプロイしてください：

1. 隔離ビルドの実行:
   node docs/test-review/build-isolated.mjs

2. ビルドパス取得とテスト用アセット生成:
   $b = (Get-Content docs/test-review/latest-build-path.txt -Raw).Trim()
   node docs/test-review/prepare-test-deploy.mjs $b

3. テストプレビュー環境へのデプロイ（本番環境には影響しません）:
   node_modules/.bin/wrangler.cmd deploy --config docs/test-review/wrangler.test.json

4. テスト環境のライブ検証:
   node docs/test-review/verify-live-test.mjs

5. Gitコミット＆プッシュ:
   git add src/components/test/ src/pages/test/ src/layouts/TestLayout.astro docs/test-review/
   git commit -m "feat(test): apply UI, accessibility, and form improvements to /test/ preview environment"
   git push origin main

================================================================================
【完了報告の要件】
================================================================================
1. 修正したテスト用コンポーネント一覧と変更内容
2. `https://tshr-bjj.com/test/` へのデプロイ成功確認
3. 本番環境（`https://tshr-bjj.com/`）が一切変更されていないことの確認結果
4. テスト環境（PC 1280px / スマホ 375px）での表示確認URL一覧
```
