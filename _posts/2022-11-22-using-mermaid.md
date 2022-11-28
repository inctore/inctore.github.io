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
私は、少し前にGitHubが、markdown上のmermaidを画像に変換して描画するようにになったのをキッカケに使い始めました。

このブログでも使うことになると思うので、変換のコードを仕込んでおきます。
このエントリは、結果の確認用です 👶

<pre style="background-color: #ddd; padding: 0.5em">
``` mermaid
flowchart TD
  A --> B --> C
  A --> D --> C
  D --> D
```
</pre>

mermaidを使うと、上のようなテキスト表現が、下のような画像に変換されます。
この画像は、HTMLファイル上に書かれた上のようなコードを、ロード時にJSで変換して表示しています。

``` mermaid
flowchart TD
  A --> B --> C
  A --> D --> C
  D --> D
```

mermaidについて詳しくは[公式ページ](https://mermaid-js.github.io/)を参照下さい。

また、オンライン上で使える[live editor](https://mermaid.live)も便利です。
