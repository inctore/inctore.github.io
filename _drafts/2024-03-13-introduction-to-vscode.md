---
title: VSCode入門
last_modified_at: 2024-03-13T16:29:51
categories:
  - blog
tags: vscode
---

## コマンドについて

画面上部の検索窓で`>`を入れるとコマンド入力モードになる。Awesome Emacsを使っていると`Alt + x`にショートカットキーが割当てられている。

## settings.jsonについて

- システム用
- ユーザー用
- プロジェクト用

がある。今のところ、よく分かってないので全てプロジェクト用に突っ込んでいる。これは、プロジェクトルートの`.vscode/settins.json`にある。

vite createでscaffoldすると.gitignoreに`.vscode/*`と書いてある。これから察するに、世の中スタンダードとしては、ここには、各ユーザー個別の設定しか書かないらしい。
一方で、`.gitignore`の次の行には`!.vscode/extensions.json`と書いてあるので、オススメの拡張を記録しておくことはできる(該当のextensionの画面から、`> Add Extension to Workspace Folder Recommendation`すると、extensions.jsonに書き込んでくれる)。
linterの設定は各個別のツールの設定ファイルに記述してgit管理、実際にlinterをどうやって適用するか(vacodeの拡張に任せるのか、他で行うのか)はユーザーの好みに委ねる、という運用になるのだろう。納得的。

## 拡張

VSCodeは、プロジェクトの内容を見て適当な拡張をレコメンドしてくれるので、自分が何を入れたかあんまり意識していない。
インストールした覚えがあるものを、ここに記録しておく。

### awesome emacs keymap

### pretteir

- 拡張: Prettier - Code formatterをインストール
- 設定: `.vscode/settings.json`に以下を追加

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

### autopep8

- 拡張: autopep8をインストール
- 設定: `.vscode/settings.json`に以下を追加

```json
{
  "[python]": {
    "editor.defaultFormatter": "ms-python.autopep8",
    "editor.formatOnSave": true
  }
}
```

### isort

- 拡張: isortをインストール
- 設定

```json
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.organizeImports": true
    },
  },
  "isort.args":["--profile", "black"],
```

black-formatter意外のフォーマッタでも↑と同様で動作した。

## デバッグ

デバッグ用に起動するプロセスを設定するには、`.vscode/launch.json`を作成する。Pythonの場合は、コマンドパレットで`debug using launch.json`を検索すると、必要な設定を作ってくれる。

起動のパターンにいくつかの選択肢があり、モジュールを`-m`で起動する場合は、以下のような設定が自動で作成される。

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python Debugger: Module",
      "type": "debugpy",
      "request": "launch",
      "module": "todree"
    }
  ]
}
```

引数を追加したいときは、`.configurations.args`を追加する。コメントに書いてあるように、IntelliSenseがいい感じにやってくれる。

F5でデバッグプロセスを起動、などはVisual Studioと同じ感じ。

## 知りたいこと

- コマンドの一覧や、そのコマンドにどのキーが割り当てられているのか、何によってキーが割り当てられているのか
