# サイト総合評価（tshr-bjj.com / Over Limit 本庄）

評価日: 2026-10-15 / 評価対象: 本番 `https://tshr-bjj.com/`（ja / english / portugues / gunma / contact / privacy / thanks）

> **引き継ぎ用メモ（他のAIへ）**
> - 全11観点の調査・実機検証・Lighthouse計測まで**全完了**。
> - 本書は**評価・課題抽出ドキュメント**。実際のコード修正はユーザーの意向を確認しながら着手すること。
> - リポジトリ: このフォルダ（Astro 6 + GSAP + Lenis、Cloudflare Worker `tshr-bjj-home` で配信）。本番ページのソース: `src/pages/{index,contact,privacy,thanks}.astro`, `src/layouts/SiteLayout.astro`, `src/components/site/**`, `src/data/site/**`。英語・ポルトガル語・群馬弁は `scripts/generate-translations.mjs` と `scripts/site/localize.mjs` が `src/data/site/translations.js` を使ってビルド後に生成している。`src/components/test/**` は `/test/` 用の独立したコピー。
> - 本番反映手順（PowerShell なので `&&` は使えない。`;` でつなぐ）:
>   `node docs/test-review/build-isolated.mjs` → `$b=(Get-Content docs/test-review/latest-build-path.txt -Raw).Trim()` → `node scripts/generate-translations.mjs $b` → `node scripts/site/prepare-deploy.mjs $b` → `node scripts/site/validate.mjs` → `node scripts/site/check.mjs` → `node_modules/.bin/wrangler.cmd deploy --config docs/production/wrangler.home.json` → `node scripts/site/verify-live.mjs` → git commit/push
> - 守る制約: 4言語、`/test/` を独立させたままにする、固定CTAバーの背景は `rgba(0,0,0,0.5)`、フッターは `#1A1A1A`、Googleクチコミのレビュアー名は出さない（アイコンだけ）。
> - 検証用スクリプト・画像:
>   - 取得スクリプト: `scratch\audit.mjs` / `audit2.mjs`
>   - 実機スクリーンショット: `docs\evaluation-screenshots\`（375px / 768px / 1280px / en / pt / 各セクション）
>   - Lighthouse 結果 JSON: `scratch\lighthouse-mobile.json` / `lighthouse-desktop.json`

## 進捗チェックリスト
- [x] 1. 基本情報・ページ構成
- [x] 2. SEO
- [x] 3. パフォーマンス
- [x] 4. アクセシビリティ
- [x] 5. コンテンツ・コピー（集客・申込みにつながるか）
- [x] 6. UI/デザイン・モバイル（実機レンダリング・スクリーンショットによる検証完了）
- [x] 7. 多言語ページ
- [x] 8. お問い合わせ導線・フォーム
- [x] 9. セキュリティ・技術的な状態
- [x] 10. 総合スコアと優先度付きの改善リスト
- [x] 11. PageSpeed / Lighthouse 実測値（Mobile & Desktop 計測完了）

---

## 1. 基本情報・ページ構成

| ページ | ステータス | HTMLサイズ | robots | 備考 |
|---|---|---|---|---|
| `/` | 200 | 61KB | index | h1 は1つ、h2 は10個（Googleクチコミ〜CTA） |
| `/english/` | 200 | 68KB | index | |
| `/portugues/` | 200 | 70KB | index | |
| `/gunma/` | 200 | 61KB | **noindex** | ネタページとして妥当 |
| `/contact/` | 200 | 29KB | （指定なし＝index） | フォーム1つ |
| `/privacy/` | 200 | 22KB | index | |
| `/thanks/` | 200 | 19KB | **index** ← 問題 | 送信完了ページ |
| `/demo/` | 200 | - | robots.txt で Disallow | 「【デザイン案】」ページが**公開されたまま** |
| `/test/` | 200 | - | noindex,nofollow | 想定どおり |

トップページのセクションの並び: Hero → InfoStrip（徒歩6分・無料・駐車場）→ Googleクチコミ → 01 柔術とは → 02 インストラクター → 03 クラスの流れ → 04 料金 → 05 スケジュール → 06 施設 → 07 アクセス → 08 FAQ → CTA → フッター → 固定CTAバー。
**評価: ◎** 地域の道場サイトとして必要なものが揃っていて、並び順も自然（不安を消す → 中身 → 料金 → 行き方 → 申込み）。

## 2. SEO

**良い点**
- title と description に「本庄市」「ブラジリアン柔術」「徒歩6分」「無料駐車場」「初心者・女性・キッズ」が入っていて、地域検索向けとして強い。
- canonical、hreflang（ja / en / pt-BR / x-default）、構造化データ（WebSite, SportsActivityLocation, Person, OfferCatalog, Course×4, FAQPage, BreadcrumbList）が揃っている。Lighthouse SEOスコアは **100/100**。
- robots.txt と sitemap.xml がある。http→https の 301、`/index.html`→`/` のリダイレクトも正常。

**問題点**
| 重要度 | 内容 |
|---|---|
| **高** | `/english/` と `/portugues/` の **meta description・og:description・JSON-LD の description が日本語のまま**。英語・ポルトガル語で検索したときの表示文が日本語になり、多言語ページを作った意味が薄れる。`localize.mjs` で head 部分と JSON-LD も翻訳する必要がある。 |
| **高** | `www.tshr-bjj.com` の **DNS レコードがない**（ENOTFOUND）。wrangler には `www.tshr-bjj.com/*` のルートがあるのに名前解決できないので、www 付きで来た人・名刺やチラシに www と書いた場合にサイトが開かない。Cloudflare で `www` の CNAME（プロキシ有効）を追加して、apex へ 301 させる。 |
| 中 | `/thanks/` が `index, follow`。→ `noindex` にする。 |
| 中 | `/demo/`（デザイン案）が誰でも見られる。robots.txt の Disallow だけだと URL が検索結果に出ることがある。→ 削除するか `noindex` + Basic認証。 |
| 中 | OGP 画像が `LOGO.png`（ロゴだけ）。LINE・X・Facebook でシェアしたときに道場の雰囲気が伝わらない。1200×630 の写真ベースの OG 画像を作り、`twitter:card` を `summary_large_image` に揃える（今はトップが `summary`、contact が `summary_large_image` でバラバラ）。 |
| 低 | `/favicon.ico` と `/apple-touch-icon.png` が 404（link タグはあるが、ルートの定番パスに置いていない）。ブラウザや iOS が勝手にこのパスを取りに行くので 404 がログに残る。 |
| 低 | sitemap に `lastmod` がない。ページが少ないので影響は小さい。 |
| 低 | 404 ページが Astro 標準の英語画面（`404: Not Found`）。ブランドに合わせた日本語の 404 ページ（トップと体験予約への導線つき）にする。 |
| 確認 | Google ビジネスプロフィールとの NAP（名前・住所・電話）の一致。サイトは「〒367-0042 埼玉県本庄市けや木1丁目1-16 / 090-6516-3248」。GBP 側も同じ表記か確認すること。 |

## 3. パフォーマンス

**計測値（Lighthouse実測）**
- **Mobile スコア: 56 / 100**（FCP: 10.3s, LCP: 12.7s, TBT: 0ms, CLS: 0）
- **Desktop スコア: 82 / 100**（FCP: 1.2s, LCP: 2.5s, TBT: 0ms, CLS: 0）
- HTML 61KB（brotli 圧縮配信）、CSS 3ファイル、JS 2ファイル（Hero のスクリプトが **56KB**。GSAP + Lenis）。
- トップが参照している `/site/` 配下の素材の合計は **約 9.75MB**。そのうち **`hero_video.mp4` が 7.1MB**。
- 画像はすべて webp。27枚中20枚が `loading="lazy"`。width/height がない画像は lightbox 用の1枚だけ（問題なし）。
- ヒーローのポスター画像は preload している（良い）。
- キャッシュ: `_astro/*` は `max-age=31536000, immutable`（良い）。画像・動画は `max-age=86400`（1日）。

| 重要度 | 内容 |
|---|---|
| **高** | **ヒーロー動画 7.1MB を、スマホでも自動再生**している（`<source>` が1種類だけ）。モバイル4Gシミュレーションで LCP 12.7s の主因になっている。→ ① 720p / 1〜2MB 程度に再圧縮する ② スマホ用に軽いもの（または WebM）を `media` で分ける ③ `navigator.connection.saveData` のときは動画読み込みをスキップしてポスター画像のみにする。 |
| 中 | Google Fonts で Inter・Noto Sans JP（6ウェイト）・Oswald（4ウェイト）を読み込んでいて、描画をブロックする外部 CSS になっている。Noto Sans JP は重いので、ウェイトを 400/700/900 程度に絞るか、セルフホスト + サブセット化する。 |
| 中 | 施設写真の webp が 1枚あたり 150〜380KB。表示サイズに対して大きい可能性がある → `srcset` で 600w / 1200w を出し分ける。 |
| 低 | 画像のキャッシュが1日。ファイル名にハッシュがないので、長くするならファイル名にハッシュを付ける運用とセットにする。 |
| 低 | `public/` にサイトで使っていない大きなファイルがある（`videostshr_light.mp4` 4.7MB、元の jpeg 群 合計約 8MB など）。デプロイには入らないが、リポジトリと Dropbox の容量を食っている。 |

## 4. アクセシビリティ

**Lighthouse Accessibility スコア: 97 / 100**（満点目前）
- **良い点**: `lang` 属性が正しい、本文へのスキップリンクがある、名前のないボタン・リンクは 0、`target=_blank` には全部 `noopener` が付いている、id の重複なし、スケジュール表が `<table>` + `scope="col"` + スクロール領域に `role=region` / `aria-label` 付き、動画の再生/停止ボタンがあり `prefers-reduced-motion` にも対応、メニューのフォーカス閉じ込め・Esc で閉じるも実装済み。TBT 0ms、CLS 0。

| 重要度 | 内容 |
|---|---|
| **中（要修正）** | **Lighthouse唯一の減点要因**: インストラクターセクションの帯画像 `<div class="belt-graphic" aria-label="3段黒帯 (3本のストライプ)">` に role がない（ARIA 1.2 規格で generic div への aria-label 直付けが禁止）。→ `role="img"` を付与するだけで **アクセシビリティ 100点** に到達可能。 |
| 中 | 日本語の h1 が1文字ずつ `<span>` に分かれていて、`aria-label` がない（英語版にはある）。読み上げ環境によっては1文字ずつ読まれる。→ 日本語版にも `aria-label="本庄の柔術で、人生を豊かに。"` を付け、span 側を `aria-hidden` にする。 |
| 中 | 固定CTAバーは半透明の黒（`rgba(0,0,0,0.5)`）の上に白文字。下にある背景が明るい写真や白いセクションだと、コントラストが 4.5:1 を下回る場面がありそう（実機で要確認。背景色は変えない約束なので、文字に影を付ける・`backdrop-filter: blur` を足すなどで対応）。 |
| 低 | フォームの必須項目は `required` だけ。エラー時のメッセージがブラウザ標準のままで、日本語の分かりやすいエラー表示や `aria-describedby` がない。 |

## 5. コンテンツ・コピー（集客・申込みにつながるか）

**良い点**
- 「徒歩6分・無料駐車場・入会金無料・見学/体験無料」が早い段階で目に入る。
- 実績（世界大会優勝・黒帯3段）、代表メッセージ、Google クチコミ ★5 が並んでいて信頼感がある。
- FAQ が検索されやすい疑問（30代40代、子供、女性、駐車場、持ち物）をきちんと押さえている。

| 重要度 | 内容 |
|---|---|
| **高** | **アクセス解析が入っていない**（GA4 / GTM / Cloudflare Web Analytics どれも見当たらない）。何人来て、どこで離脱して、体験予約・LINE・電話がそれぞれ何件押されたかが分からないので、改善しても効果が測れない。→ Cookie 不要の Cloudflare Web Analytics か GA4 を入れ、CTA・tel・LINE のクリックをイベントとして取る（入れたらプライバシーポリシーにも追記）。 |
| 中 | クチコミが3件とも「※ポルトガル語からの翻訳」。日本人の初心者から見ると「外国人ばかりの道場？」と感じてハードルが上がるおそれ。日本語のクチコミがあれば混ぜる。あわせて **総合評価（★5.0 / ○件）と Google マップへのリンク**を出すと信頼感が上がる。 |
| 中 | FAQ Q4「道着代など結構なお金がかかりますか？」に**金額が書いていない**。目安（例: 道着 ○○円〜、帯、スポーツ保険の有無）を書くと離脱が減る。 |
| 中 | 料金まわりで、**契約期間・退会方法・休会・家族割・振替**がない。入会前に不安になりやすいところなので FAQ か料金の注記に入れる。 |
| 中 | **「体験当日の流れ」**（来館 → 着替え → 見学/参加 → 説明 → 入会は後日でもOK）がない。初心者の不安を一番下げられるパートなので、クラスの流れの近くか CTA の直前に置く。 |
| 低 | 「柔術とは」の SAFETY で「怪我の可能性はあります」と正直に書いている一方、FAQ Q1 は「打撃が一切ないため安全性が高く」。矛盾ではないが、FAQ 側にも「無理のないペースで」と一言そろえると誠実さが一貫する。 |
| 確認 | スケジュールの木曜日に「ビギナー柔術 18:00-19:00」と「ビギナー柔術 19:00-20:00」が続けてある（`src/components/site/v2/Schedule.astro` 63行目・85行目付近）。意図どおり（2部制）か、片方は別のクラスの間違いか、オーナーに確認。アクセス欄の営業時間（木 18:00〜22:00）とは合っている。 |
| 確認 | インストラクターの実績「2026, 2025 SJJF WORLD Championship 優勝」の年と表記が正しいか確認。 |

## 6. UI/デザイン・モバイル（実機レンダリング検証結果）

実機スクリーンショット（375px / 768px / 1280px）によるレンダリング検証で判明した具体的事項:

| 重要度 | 画面 | 発生内容・原因 | 対策 |
|---|---|---|---|
| **最高** | **デスクトップ (1200〜1350px)** | **ヘッダー右端のオレンジ色の「見学・体験予約」ボタンが約80%画面外に見切れる（はみ出し）。**<br>メニュー項目が9項目に増えたため、ロゴ＋9項目＋言語セレクターの合計幅が1280pxを超過し、右端のアクションボタンが押し出されて切れてしまっている。 | ヘッダーのブレークポイントを調整（1200pxではなく1360px以下はハンバーガーにする）、またはデスクトップメニュー項目のフォントサイズ・余白（gap: clamp）を少し縮めて収める。 |
| **最高** | **スマホ (375px) ポルトガル語** | **ヘッダーのハンバーガーメニューボタンが完全に画面外へ押し出され消滅する。**<br>言語セレクターのテキスト「Português」が横幅約110pxを取るため、ロゴ2種（丸＋文字）＋言語切り替えだけで375pxを圧迫し、メニュー開閉ボタンが枠外に消えてタップ不能になる。 | スマホ時は言語ボタンの表記を略称（「PT」「EN」「JA」）にするか、ロゴの幅をスマホで最適化する。 |
| **高** | **スマホ (375px) 英語・ポルトガル語** | **画面下部固定CTAバーの文字がはみ出して切れる。**<br>英語: `Book Free Tria...`<br>ポルトガル語: `Aula Experimental...`（右端の封筒アイコンが枠外に押し出される） | 固定バーボタンのフォントサイズを縮小（11px〜12px）、または英語・ポルトガル語のラベルを簡潔にする（例: `Free Trial` / `Aula Grátis`）。 |
| **高** | **スマホ (375px) ポルトガル語** | **ヒーロー内の白ボタン「AGENDAR AULA EXPERIMENTAL GRATUITA」の右矢印がはみ出る。** | ボタンの `padding` と `font-size` を言語別またはモバイル幅で可変化する。 |
| **中** | **スマホ (375px) 料金セクション** | **カード内の箇条書きテキストが「10px」に縮小され、非常に読みづらい。**<br>スマホ幅でも `grid-template-columns: repeat(2, 1fr)` の2列レイアウトを維持しているため、カード内幅が133pxしかなく、文字を10pxまで小さくせざるを得なくなっている。 | スマホ（特に480px以下）では1列表示（または横スワイプ）にし、文字サイズを標準の13〜14pxに維持する。 |
| **中** | **スマホ全般 料金セクション** | 4つのプランカード（男性 / 女性・学生 / キッズ / ビジター）が全て同じフラットな白デザインで、**「どれが一番選ばれている標準プランか」が視覚的に伝わらない。** | 最も標準的なプラン（一般・男性会員など）に「人気」「標準」などのバッジやアクセントカラー（オレンジ枠など）を設けると選択しやすくなる。 |
| **中** | **スマホ (667px以下: iPhone SE等)** | **ハンバーガーメニュー内の「無料 見学・体験予約」ボタンがファーストビュー外（スクロールしないと見えない）。**<br>メニュー項目10個（各50px＝500px）＋ヘッダー＋各種余白で高さ770px以上になり、高さの低い端末では一番大事な予約ボタンが画面下に隠れてしまう。 | メニュー上部にもミニ予約ボタンを置くか、項目の高さをコンパクトにする。 |
| **良好** | 全幅 スケジュール表 | 横スクロール領域に `tabindex="0"`、`role="region"`、`aria-label`、および「← 横にスクロールしてご覧いただけます →」のガイドテキストがついており、操作性・アクセシビリティともに良好。 | 良好（現状維持でOK）。 |
| **良好** | 固定CTAバーとフッター | フッターには `padding-bottom: calc(28px + var(--test-cta-height, 0px))` が設定されており、ResizeObserverでバーの高さを動的検知してフッター下部に余白を空けているため、コピーライトが重なって隠れる問題は解消されている。`env(safe-area-inset-bottom)` も対応済み。 | 良好（現状維持でOK）。 |

## 7. 多言語ページ

**良い点**: 英語・ポルトガル語の本文、h1、h2 は自然に翻訳されている。日系ブラジル人の会員が多いという実態に合っていて、ポルトガル語ページがあるのは大きな強み。hreflang も正しい。群馬弁ページは noindex で遊び心として良い。

| 重要度 | 内容 |
|---|---|
| **高** | （2. SEO の再掲）meta description / og:description / JSON-LD が日本語のまま。 |
| **高** | （6. UI の再掲）ポルトガル語・英語でヘッダーボタン見切れ、固定CTA文字切れ、メニューボタン消失が発生している。 |
| 中 | `/contact/`・`/privacy/`・`/thanks/` は日本語しかない。英語・ポルトガル語圏のユーザーがフォームに来た時に日本語入力欄のみになる。 |
| 低 | ポルトガル語ページでは、クチコミの「※ポルトガル語からの翻訳」を原文表示に切り替えると、ポルトガル語話者にとってより自然。 |

## 8. お問い合わせ導線・フォーム

**良い点**: CTA が多くの場所にある（ヘッダー、ヒーロー、料金の下、最後の CTA、固定バー、メニュー）。電話・LINE・フォームの3つの経路がある。honeypot（`_honey`）でスパム対策をしている。送信後は `/thanks/` に移動する。

| 重要度 | 内容 |
|---|---|
| **高** | フォームの送信先が `https://formsubmit.co/tashas.natura@hotmail.com` で、**個人のメールアドレスが HTML にそのまま出ている**。スパム業者に収集されやすい。→ FormSubmit の「ランダム文字列のエンドポイント」に切り替えるか、Cloudflare Worker でフォームを受けてメール送信する（Worker はすでに運用中なので相性が良い）。 |
| 中 | FormSubmit（外部サービス）に個人情報を渡しているのに、プライバシーポリシーに「外部サービスへの委託」の記載がない（4条は「同意なく第三者提供しない」だけ）。→ 委託先の利用について追記する。 |
| 中 | フォームの「希望日時」が自由記述（message）だけ。**体験希望日（日付）と希望クラス（大人ビギナー / オールレベル / キッズ / 女性）**を選択式にすると、やり取りの往復が減って成約率が上がる。キッズの場合の「お子さまの年齢」欄もあると良い。 |
| 低 | contact ページの LINE ロゴを `upload.wikimedia.org` から直接読み込んでいる。外部依存で、表示されなくなるおそれがある。→ 自前の SVG に置き換える（固定CTAバーではすでにインライン SVG を使っている）。 |
| 低 | 電話番号の注記「指導中等で出られない場合があります」は親切。あわせて「つながりやすい時間帯」を書くとさらに良い。 |

## 9. セキュリティ・技術的な状態

- HSTS あり、`X-Content-Type-Options: nosniff` あり、brotli 圧縮あり、HTTP→HTTPS 301 あり。Lighthouse BestPractices **100/100**。**基本はできている。**

| 重要度 | 内容 |
|---|---|
| 中 | `Content-Security-Policy`、`Referrer-Policy`、`Permissions-Policy`、`X-Frame-Options`（または CSP の `frame-ancestors`）のヘッダーがない。`docs/production/home-worker.js` でレスポンスヘッダーを付ければ足せる。 |
| 低 | ソースに古いコンポーネントが残っている: `src/components/*.astro`（旧版）、`src/components/v2/*`、`System.astro.bak`、`src/layouts/Layout.astro`、`src/pages/demo.astro`。本番は `site/` 系だけを使っているので、整理するとメンテナンスが楽になり、取り違えの事故も防げる。 |
| 低 | `/test/` は本番ドメインで公開されていて、noindex,nofollow の X-Robots-Tag 付き。運用上の意図どおりなら OK。 |

## 10. 総合スコア（確定）と優先度付きの改善リスト

| 観点 | スコア | ひとこと |
|---|---|---|
| 構成・情報設計 | 9/10 | 申込みまでの流れが極めて自然 |
| SEO（日本語） | 8/10 | 構造化データ満点。www の DNS と OG 画像が惜しい |
| SEO（多言語） | 5/10 | description と JSON-LD が日本語のまま |
| パフォーマンス | 5/10 | Lighthouse Mobile 56点。ヒーロー動画 7.1MB が致命傷 |
| アクセシビリティ | 9.5/10 | Lighthouse 97点。帯画像の role 付与で 100点可能 |
| UI・レイアウト | 6/10 | デスクトップ1280pxのはみ出し、多言語スマホ崩れが要改善 |
| コンテンツ・CV導線 | 7/10 | 計測なし、費用や契約の不安への答えが足りない |
| フォーム・問い合わせ | 6/10 | メアド生露出、項目不足（希望クラス等） |
| セキュリティ・技術基盤 | 8/10 | Worker構成・BestPractices 100点。ヘッダー追加の余地 |
| **総合スコア** | **7.1 / 10** | **骨格・デザイン・SEOの基礎は非常に高品質。下記の「至急対応」を実施すれば一気に 8.8〜9.0 点に達する。** |

---

### 最優先（レイアウト崩れ・致命的エラーの修正）
1. **デスクトップヘッダーの「見学・体験予約」ボタン見切れ修正**（1200px〜1350pxで右端が切れる現象）
2. **多言語（英語・ポルトガル語）でのスマホ表示崩れ修正**
   - ポルトガル語でヘッダーメニューボタンが画面外に押し出されるバグ
   - 固定CTAバーの文字切れ（`Book Free Tria...` / `Aula Experimental...`）
3. **`www.tshr-bjj.com` の DNS（CNAME）追加** → Cloudflare側で apex (`tshr-bjj.com`) へリダイレクト
4. **フォーム送信先のメールアドレス露出対策**（FormSubmitランダムトークン化、またはWorker直接受領）
5. **アクセシビリティ 100点化**: `<div class="belt-graphic">` に `role="img"` を付与

### すぐやる（効果絶大・パフォーマンス改善）
6. **ヒーロー動画（7.1MB）の軽量化**: 720p / 1〜1.5MB に再圧縮 ＋ モバイル・低速回線時はポスター画像のみに制御
7. **多言語ページの meta description / og:description / JSON-LD を翻訳**
8. **アクセス解析（Cloudflare Web Analytics または GA4）の導入** ＋ CTAクリックの計測
9. **`/thanks/` の noindex 化**、`/demo/` の非公開化

### 次にやる（成約率・安心感向上）
10. **写真ベースの OGP 画像（1200×630）を作成**し、`summary_large_image` に統一
11. **料金カードのデザイン改善**: スマホ（480px以下）で1列表示にして10px極小文字を解消 ＋ 一番人気のプランにアクセント
12. **FAQ & 料金の補足**: 道着代の目安金額、退会・休会ルール、体験当日の流れを追加
13. **フォーム項目の充実**: 体験希望日・希望クラス（大人/キッズ等）・お子さまの年齢を選択式に追加
14. **404エラーページの独自作成**（トップや予約へのリンク付き）
15. **セキュリティヘッダー追加**（CSP, Referrer-Policy, Permissions-Policy）

---

## 11. PageSpeed / Lighthouse 実測値

2026-10-15 に本番サイト（`https://tshr-bjj.com/`）に対して実行した Lighthouse 監査の生データ記録。

### モバイル環境 (Simulated Moto G Power on 4G)
- **Performance**: `56 / 100`
  - FCP (First Contentful Paint): `10.3 s`
  - LCP (Largest Contentful Paint): `12.7 s`
  - TBT (Total Blocking Time): `0 ms` (JavaScriptブロッキングは一切なし)
  - CLS (Cumulative Layout Shift): `0` (レイアウトのズレなし)
  - Speed Index: `10.3 s`
  - 主な改善点: ヒーロー動画 7.1MB のダウンロード時間、Google Fonts によるレンダーブロック
- **Accessibility**: `97 / 100`
  - 唯一の指摘: `Elements use prohibited ARIA attributes` (`div.belt-graphic` に `role` なしで `aria-label` が使用されている)
- **Best Practices**: `100 / 100` (満点)
- **SEO**: `100 / 100` (満点)

### デスクトップ環境
- **Performance**: `82 / 100`
  - FCP: `1.2 s`
  - LCP: `2.5 s`
  - TBT: `0 ms`
  - CLS: `0`
  - Speed Index: `1.5 s`
- **Accessibility**: `97 / 100`
- **Best Practices**: `100 / 100` (満点)
- **SEO**: `100 / 100` (満点)
