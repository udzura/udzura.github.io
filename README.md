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

- [RbBCC](https://github.com/udzura/rbbcc#readme)
- [Wardite](https://github.com/udzura/wardite#readme)
- [mruby/edge](https://github.com/mrubyedge/mrubyedge#readme)
- [Uzumibi](https://github.com/uzumibirb/uzumibi#readme)
- [OrangeTap](https://github.com/udzura/orange_tap#readme)

『入門 eBPF』の書誌情報と書影は[オライリー・ジャパン](https://www.oreilly.co.jp/books/9784814400560/)より。
プロフィール画像は本人提供の2026年の写真を使用しています。
