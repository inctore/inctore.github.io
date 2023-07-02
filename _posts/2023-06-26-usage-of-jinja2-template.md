---
title: jinjaテンプレートの使い方メモ
last_modified_at: 2023-06-26T09:23:47
categories:
  - blog
tags: python jinja
---

たまに使うんだけど毎日使うというほどでもないので使い方を何回も調べている道具シリーズ。jinja2の使い方をメモしておく。

jinja2の制御構文用の記号と、jekyllの記号がバッティングしていることが分かったので、画像貼り付けとう雑回避。

コード(j2.py)

![code](/assets/images/20230626-1.png)

出力

![output](/assets/images/20230626-2.png)

`for`や`endfor`を囲むかっこに`-`を付けるか付けないかで、各イテレーションの前後の改行に関する挙動が変わる。
