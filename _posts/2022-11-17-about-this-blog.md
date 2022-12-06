---
title: このブログについて
last_modified_at: 2022-11-18T07:25:17
categories:
  - blog
tags:
  - jekyll
---

このブログは、jekyllで構築されています。
テーマとして[minimal mistake](https://mmistakes.github.io/minimal-mistakes/)を採用していますが、少し自分好みに変更を加えているので、
備忘を兼ねて、内容をここにまとめておきます。

## footer

footerの青い帯が太すぎる気がするので、修正しました。

`_sass/minimal-mistakes/_footer.scss`

``` css
.page__footer {
  footer {
    margin-top: 0.5em;
    padding-bottom: 0.5em;
  }
}
```

を追記しています。上の余白はmarginで下の余白はpaddingで調整するのは、どういう意味なんだろか。
