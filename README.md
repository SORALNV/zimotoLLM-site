# 地元LLM

ローカルLLMの試行錯誤を複数の著者で共有する記事サイト。EleventyでMarkdownを静的HTMLに変換し、Cloudflare PagesとGitHub Pagesで公開します。データベース・有料API・独自ログインは不要です。

- Cloudflare Pages: https://zimotollm.pages.dev/
- GitHub Pages: https://soralnv.github.io/zimotoLLM-site/

## 開発

Node.js 22以上を使用します。

```sh
npm ci
npm run dev
npm test
```

開発URL: http://localhost:8089 / 出力: `dist/`

## 記事を追加する

1. `src/_data/authors.json` に著者IDと表示名を追加。
2. `templates/article.md` を `src/posts/your-article-slug.md` にコピー。
3. メタデータと本文を編集。`author` は登録したID、`topics` はタグの配列。
4. 公開前は `draft: true`。公開するときは `false` に変更。
5. ブランチで編集して `npm test` を実行し、Pull Requestを作成。
6. 管理者のレビュー後にmainへマージ。

ファイル名は英数字とハイフンを使用してください。記事URLは `/articles/your-article-slug/` になります。画像は `src/assets/` に配置し、Markdownでは `/assets/...` で参照できます。

**公開リポジトリなので下書きもGitHub上では公開されます。秘密情報を保存しないでください。** 投稿する各著者にGitHubアカウントが必要です。権限がない方もFork + Pull Requestで参加できます。サイト内CMSやブラウザー投稿画面はありません。

## Cloudflare Pages

- GitHub repository: `SORALNV/zimotoLLM-site`
- Project name: `zimotollm`
- Production branch: `main`
- Framework preset: None
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `NODE_VERSION=22`

Git連携後はmainへのpushで自動公開されます。CloudflareのGitHub連携権限はこのリポジトリだけに絞ってください。

## GitHub Pages

`.github/workflows/pages.yml` がmainへのpush時にビルド・リンク検証・公開を実行します。GitHubのSettings → PagesはSourceをGitHub Actionsに設定します。

GitHub Pagesのビルドだけ `SITE_PATH_PREFIX=/zimotoLLM-site/` を指定し、EleventyのHTML Baseプラグインで記事本文・ナビゲーション・CSS・画像のURLを変換します。Cloudflare側は未指定（`/`）のままです。CIでは両方のパスでリンクを検証します。GitHub PagesではCloudflare用の `_headers` 設定は適用されません。

記事の事実確認と公開判断は執筆者・管理者が行ってください。サイトは記事の日時順に表示し、著者・タグからメタデータを生成します。初期記事はサイトのお知らせのみです。
