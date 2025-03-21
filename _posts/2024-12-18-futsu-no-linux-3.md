---
title: ふつうのlinux 3
last_modified_at: 2024-12-18T20:48:41
categories:
  - blog
tags: study unix
---

ふつうのlinuxを読んでるシリーズ 3

## `printf`の注意

```c
char* str;
... // strの中身を、どっかで埋める

printf(str);
```

みたいな使い方をしてはいけない。特に、`str`の中身を外部から取ってくるようなときは。なんでかっていうと、`str`の途中に`%d`みたいな文字が混ざっていると、`printf`は、実引数`str`の「次」を見に行ってしまう。そこに何があるか分からないが、これはメモリアクセス違反で、非常に危険。なので、`printf`の最初の引数には、文字列のリテラル以外は入れてはいけない。

## stdioとシステムコールを混ぜるな危険

システムコールは、直接ストリームの中を操作する。stdioは、入出力をバッファリングする。ので、両者を混ぜると、バッファの状態に不整合が生じてしまう。ということは、何がシステムコールで何がstdioのライブラリ関数なのかは覚える必要がある。めんどい。

## 今日は

疲れたからこれだけ・・だと残念なので、今後の課題をまとめておく。

まず、ストリーム関連APIの使い方をチートシート的にまとめたい。じゃないと覚えられない。

- ライブラリ or システムコール
- エラーになったときの挙動
- 典型の使い方

あたりかなぁ・・あるいは、長いこと使ってれば自然に覚えるものなんじゃろか。

もしくは、個別の関数の使い方とは逆に、「XXしたいときの書き方」を書いといても良いのかもしれない。典型的なユースケースを洗い出す必要が出てくるだろう。それはそれで頭の整理になりそうだ。
