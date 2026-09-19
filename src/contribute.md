---
layout: base.njk
title: 記事を書く
description: 地元LLMに記事を追加する方法。Markdownで書いて、Pull Requestで共有します。
permalink: /contribute/
---
<div class="post prose guide">

# 記事を書く

地元LLMの記事は、GitHubとMarkdownで共同編集します。サイト上に投稿フォームや独自のログイン機能はありません。

## 1. リポジトリを開く

[zimotoLLM-siteのリポジトリ](https://github.com/SORALNV/zimotoLLM-site)を開きます。書き込み権限がない方はForkを作り、変更をPull Requestで提案できます。

## 2. 著者を登録する

`src/_data/authors.json` に、自分用のIDと表示名を追加します。表示名はニックネームでも構いません。既存の著者は消さずに追加してください。

```json
"your-id": {
  "name": "あなたの表示名",
  "bio": "書きたいテーマなど（任意）"
}
```

メールアドレスや個人情報を載せる必要はありません。

## 3. Markdownで記事を書く

`templates/article.md` をコピーして、`src/posts/` に英数字とハイフンのファイル名で保存します。ファイル名が記事URLになります。

冒頭の `title`、`description`、`date`、`author`、`topics` を編集します。`author` には先ほど登録したIDを指定してください。

`draft: true` の記事はサイトには掲載されません。ただし公開リポジトリのファイル自体は誰でも読めます。秘密情報や未公開データは入れないでください。

## 4. レビューして公開する

準備ができたら `draft: false` にしてPull Requestを送ります。ビルド確認と内容のレビューを行い、管理者が `main` にマージするとサイトが更新されます。

## 読み手が再現できるメモに

- OS、CPU・GPU・メモリ、ツールのバージョンを記載する
- モデル名、量子化、実行コマンドなどの条件を残す
- 実測値と感想、推測を区別する
- 参考にした資料には出典リンクを添える
- APIキー、トークン、個人情報を含めない
- 画像や引用、モデルの利用条件を確認する

短い記事でも大丈夫です。まずは一つ、手元で試したことから。

</div>
