# udzura.jp

GitHub Pagesで公開する、近藤宇智朗（udzura）のポートフォリオです。
依存パッケージやビルドツールを使わないHTML/CSS/JavaScriptで構成しています。

## サイトの編集

公開用ファイルは`public/`に集約しています。

- `index.html`：日英の本文。`lang="ja"`と`lang="en"`で対になる内容を記述します。
- `assets/site.css`：レイアウトと、選択中の言語に応じた表示制御。
- `assets/site.js`：再読み込みなしの言語切り替え、URLとブラウザへの選択の保存。
- `assets/`：プロフィール画像、書影、favicon。
- `404.html`：旧URLや存在しないページ向けの案内。
- `favicon.ico`：公開ルートのfavicon。AkubiのSVGから生成した16〜256pxのICO。

配色・書体・罫線・ヘッダーは[スライド一覧](https://udzura.jp/slides/)の
`docs/assets/archive.css`に合わせています。共有する基本色は以下の通りです。

| 用途 | 色 |
| --- | --- |
| 背景 | `#f6f4ee` |
| 本文 | `#252924` |
| 補助テキスト | `#686c63` |
| 罫線 | `#d5d7cd` |
| アクセント | `#b53d27` |

言語はURLの`?lang=ja`または`?lang=en`、保存済みの設定、ブラウザの言語の順で
選びます。JavaScriptが無効な場合は日本語を表示します。
`/slides/`は別のGitHub Pagesプロジェクトへのリンクで、このリポジトリには含めません。

### 最新リリースの表示

各OSSの`data-release-repo`をもとに、ブラウザから認証なしでGitHub APIの
[`releases/latest`](https://docs.github.com/en/rest/releases/releases#get-the-latest-release)を取得します。
GitHubが最新とする通常版リリースのタグとリンク、公開日時（`published_at`）からの経過日数を表示します。
日時は`time`要素に保持し、ホバーで正確な公開日時を確認できます。経過時間は日英で表示し、7日未満は日、7日以上は週、30日以上は月、365日以上は年に切り替え、端数を切り捨てます。
ドラフト・プレリリースは対象にしません。
結果はlocalStorageに1時間保存し、期限後のページ表示時に再取得します。
リリースがない場合や通信エラー・API制限時、JavaScript無効時はリリース一覧へのリンクを表示します。
取得は8秒で打ち切り、APIエラーはキャッシュしません。

認証なしのAPI制限は[送信元IPごとに1時間60リクエスト](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)です。
初回は6プロジェクト分のリクエストを行います。APIトークンは使用しません。

## デプロイ

`.github/workflows/pages.yml`でGitHub公式のPages Actionsを使用します。

- `master`へのpushで、静的ファイルをPagesへデプロイします。
- Pull Requestでは公開用アーティファクトの作成まで実行します。
- Actionsタブから手動実行もできます。
- Actionsの更新はDependabotが毎月確認します。

### 旧方式からの移行

1. この変更を`master`に反映します。
2. GitHubの **Settings → Pages → Build and deployment → Source** を
   **GitHub Actions** に変更します。
3. **Custom domain** が`udzura.jp`のままであることを確認します。
   Actions方式では独自ドメインはリポジトリ設定で管理します。
4. **Actions → Deploy to GitHub Pages → Run workflow** から
   `master`を指定して実行します。

`github-pages`環境に承認やブランチ制限が設定されている場合は、そのルールが
デプロイに適用されます。

### 公開対象

ワークフローの`Prepare static site`で`public/`全体を`_site/`にコピーし、
Pagesアーティファクトとして公開します。設定ファイルやREADMEは公開しません。

## ローカルプレビュー

リポジトリのルートで次を実行し、<http://localhost:8000>を開きます。

```sh
python3 -m http.server 8000 --directory public
```

`/slides/`は本番の<https://udzura.jp/slides/>で確認してください。

## 掲載内容の参照元

OSSの説明は以下のREADMEをもとに要約しています（2026-10-22確認）。

- [Haconiwa](https://github.com/haconiwa/haconiwa#readme)
- [RbBCC](https://github.com/udzura/rbbcc#readme)
- [Wardite](https://github.com/udzura/wardite#readme)
- [mruby/edge](https://github.com/mrubyedge/mrubyedge#readme)
- [Uzumibi](https://github.com/uzumibirb/uzumibi#readme)
- [OrangeTap](https://github.com/udzura/orange_tap#readme)

『入門 eBPF』の書誌情報と書影は[オライリー・ジャパン](https://www.oreilly.co.jp/books/9784814400560/)より。
Ruby関連の登壇一覧は[RubyEvents](https://www.rubyevents.org/profiles/udzura/talks)にリンクしています。
プロフィール画像は本人提供の2026年の写真を使用しています。
faviconはAkubiの立ち耳・胴体・巻き尾を白いシルエットにし、藍色の丸四角と濃い影に組み合わせています。
元のfaviconは各形式のファイル名に`-old`を付けて保存しています（`favicon-old.ico`、`favicon-old.svg`、`favicon-32-old.png`、`apple-touch-icon-old.png`）。
mruby/edgeのロゴは[公式サイトのアイコン](https://github.com/mrubyedge/mrubyedge.github.io/blob/main/assets/mrubyedge-icon.svg)、
Uzumibiのロゴは[公式リポジトリ](https://github.com/uzumibirb/uzumibi/blob/main/logo.svg)より。
Haconiwaのロゴは[公式リポジトリ](https://github.com/haconiwa/haconiwa/blob/master/images/haconiwa-logo.png)より。

RbBCC・Wardite・OrangeTapのアイコンは、このポートフォリオ用に制作したSVGです。
mruby/edgeの色面・白い記号・濃いオフセット影を共通のスタイルとし、
RbBCCは宝石形の羽を持つ蜂、Warditeは結晶をイメージしたW、
OrangeTapは名前の由来である「みかんの蛇口」をモチーフにしています。

Uzumibiの掲載アイコン（`uzumibi-icon.svg`）は、公式ロゴのU・熾火・炎の形を白抜きにし、
オレンジ色の丸四角と濃い影を組み合わせています。元のロゴは`uzumibi.svg`に保持しています。

フッターの`FUKUOKA, JAPAN`を開くと、テーマカラー`#aa66cc`のうずらが現れます。
`details`要素を使っており、キーボード操作・JavaScript無効時にも開閉できます。
