---
title: watchdogの使い方メモ
last_modified_at: 2023-08-01T11:20:36
categories:
  - blog
tags: python
---

サーバープログラムを開発していると、開発中のサーバーを起動しっぱなしにしておきつつ、何かしら変更を加えた際には自動で再起動されてほしい。
Pythonでは、どういうツールがあるのかなと調べたら、[watchdog][watchdog]というツールが見つかったので使い方をメモしておく。

公式の説明によると

> Python API and shell utilities to monitor file system events.

とのこと。Pythonスクリプトの中で、ファイルシステムに何かイベントがあったときにイベントを発火してくれるような機能がメインの使い方のようであるが、簡易的にシェルからコマンドで起動する方法も用意されている。

後者のシェルからの起動を利用するには

```shell
$ pip install "watchdog[watchmedo]"
```

と、`watchmedo`というオプションを付けてインストールする必要がある。

例えば、

<em>カレントディレクトリ以下の`*.py`に合致するファイルに何か変更があったら、特定のコマンドを実行する</em>

ということをしたい場合には、

```shell
$ watchmedo shell-command --patterns="*.py" --command="echo updated" --recursive .
```

を実行すれば良い。(上の例だと`echo updated`が実行される)

<!-- link -->
[watchdog]: https://pypi.org/project/watchdog/
