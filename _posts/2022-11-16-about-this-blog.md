---
title: このブログについて
last_modified_at: 2016-03-09T16:20:02-05:00
categories:
  - blog
tags:
  - jekyll
---

このブログは、jekyllで構築されており、テーマとしてminimal mistakeを採用しています。

このポストに、テーマのカスタマイズ内容を備忘のためにまとめておきます。

## footer

footerの青い帯が太すぎる気がするので、修正しました。

`assets/css/main.scss`

``` css
.page__footer {
  footer {
    margin-top: 0.5em;
    padding-bottom: 0.5em;
  }
}
```

を追記しています。上の余白はmarginで下の余白はpaddingで調整するのは、どういう意味なんだろか。
