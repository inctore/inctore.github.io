---
title: echoでキャリッジリターン
last_modified_at: 2024-03-01T13:54:10
categories:
  - blog
tags: unix shell
---

echoコマンドに`\r`を表示させるとキャリッジリターンをしてくれる。

```shell
for i in $(seq 3); do
  echo -n "\rrunning $(date +%H:%M:%S)"
  sleep 1
done
```

上のようなスクリプトを実行すると、1秒ごとに表示が更新されるように見える。
シェルスクリプトで長い時間実行するときのステータス表示などに使える・・かもしれない。

`-n`を付けて末尾の改行を抑制している。これがないと意図した表示にならない。
