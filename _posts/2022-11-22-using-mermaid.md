---
title: mermaidを使う
last_modified_at: 2022-11-22T14:21:49
categories:
  - blog
tags:
  - mermaid
  - javascript
---

mermaidという、様々なフォーマットでグラフやネットワークを表現できる言語があります。
私は、少し前にGitHub上のmarkdownにこれを埋め込めるようになったのをキッカケに使い始めました。

このブログでも使うことになると思うので、設定を仕込んでおこうと思います。
これは結果を確認するためのテスト用エントリーです。

<pre style="background-color: #aaa; padding: 0.5em">
``` mermaid
flowchart TD
  A --> B --> C
  A --> D --> C
  D --> D
```
</pre>

mermaidを使うと、上のようなテキスト表現を、下のような画像に変換できます。

``` mermaid
flowchart TD
  A --> B --> C
  A --> D --> C
  D --> D
```

mermaidについて詳しくは[公式ページ](https://mermaid-js.github.io/)を参照下さい。

また、オンライン上で使える[live editor](https://mermaid.live)も便利です。
