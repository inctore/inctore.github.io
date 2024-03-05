---
title: vite+react+gs-pagesのメモ
last_modified_at: 2024-03-05T18:29:43
categories:
  - blog
tags: react
---

- `npm create vite@latest janken -- --template react-ts`
- `npm i gh-pages`
- package.jsonのscriptにpredeploy, deployを書く
- GitHubのレポジトリのsettings -> pagesで、設定
- `npm run deploy`でgh-pagesブランチにビルド生成物がpushされる
- その他
  - ドメインは、基本は`<user/組織名>.github.io/<レポジトリ名>`になる
    - `<user/組織名>.github.io`レポジトリでカスタムドメインを当てていれば、そちらも有効
    - 個別のレポジトリで別ドメインを当てる方法は不明。知りたい
  - viteの設定はvite.config.js。上のようにサブディレクトリ以下のURLが当てられる場合は、baseを指定することで、css,jsなどのリソースの相対URLを設定できる
