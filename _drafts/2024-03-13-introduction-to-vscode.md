---
title: VSCode入門
last_modified_at: 2024-03-13T16:29:51
categories:
  - blog
tags: vscode
---

## コマンドについて

画面上部の検索窓で`> `を入れるとコマンド入力モードになる。Awesome Emacsを使っていると`Alt+x`にショートカットキーが割当てられている。

## settings.jsonについて

- システム用
- ユーザー用
- プロジェクト用

がある。今のところ、よく分かってないので全てプロジェクト用に突っ込んでいる。これは、プロジェクトルートの`.vscode/settins.json`にある。

vite createでscaffoldすると.gitignoreに`.vscode/*`と書いてある。世の中スタンダードとしては、ここには、各ユーザー個別の設定しか書かないらしい。
.gitignoreの次の行には`!.vscode/extensions.json`と書いてあるので、オススメを記録しておくことはできる。
該当のextensionの画面から、`> Add Extension to Workspace Folder Recommendation`すると、extensions.jsonに書き込んでくれる。

## pretteir

- 拡張: Prettier - Code formatterをインストール
- 設定: `.vscode/settings.json`に以下を追加

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

## 拡張

VSCodeは、プロジェクトの内容を見て適当な拡張をレコメンドしてくれるので、自分が何を入れたかあんまり意識していない。
インストールした覚えがあるものを、ここに記録しておく。

- awesome emacs keymap

## 知りたいこと

- コマンドの一覧や、そのコマンドにどのキーが割り当てられているのか、何によってキーが割り当てられているのか
