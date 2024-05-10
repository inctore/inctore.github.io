---
title: Launch Controlでsudoする
last_modified_at: 2024-05-10T11:56:54
categories:
  - blog
tags: mac
---

Macで、一定時間ごとに何かしたい・ログイン時に何かしたい、というようなジョブ管理をするには、launchdを使う。これを使って、ログイン時に自動でVPNに接続するコマンドを叩きたい・・のだが、rootで実行する必要があるので、ひと手間が必要になる。

osascriptを使って、以下のようなコマンドを起動時に実行するようにしておけばrootで実行できる。ログイン時に起動するように設定していると、ログイン後にパスワード入力を求めるポップアップが出てくる。

```shell
osascript -e 'do shell script "コマンド" with administrator privileges'
```

[使用例](https://github.com/hotoku/auto-wg)

このジョブでは、`wg-quick up wg0`というコマンド(VPNに接続するコマンド)をroot権限で実行している。
