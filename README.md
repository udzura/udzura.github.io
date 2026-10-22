# udzura.jp

GitHub Pagesで公開するポートフォリオです。このリポジトリには生成済みの
HTML/CSS/JavaScriptを保存しており、公開時にRubyやnanocのビルドは実行しません。

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

ワークフローの`Prepare static site`で公開ファイルを`_site/`に集めます。
ルートのHTML、`CNAME`、favicon、RSS、および既存のページ・アセット用ディレクトリが対象です。
新しいディレクトリやルートのファイルを公開するときは、このコピー対象にも追加してください。

## ローカルプレビュー

リポジトリのルートで次を実行し、<http://localhost:8000>を開きます。

```sh
python3 -m http.server 8000
```
