---
title: ふつうのLinux
last_modified_at: 2024-12-13T17:17:49
categories:
  - blog
tags: unix study
---

ふつうのLinuxプログラミング 第2版を読み始めたので、覚えたことを書いていく。自分用のメモである（つまり雑である）。

## `fprintf`

`printf`は標準出力に吐くが、任意のストリーム（ファイルディスクリプタで管理されてるもの）に対して吐くには`fprintf`を使う。

```c
fprintf(file, fmt, ...)
```

これを使うと、標準エラーにも吐ける。

```c
fprintf(stderr, "Usage: %s <file>\n", argv[0]);
```

`stderr`は、`stdio.h`で定義されている`FILE`構造体。

みたいな感じ。

## `perror`

`perror`に、文字列を渡すと、現在のERRNOに応じたメッセージとともに、その文字列を出力してくれる。

```c
char *path = "not_exists_file";

open(path, O_RDONLY);

perror(path);
```

こんな感じに書いとくと、

```shell
not_exists_file: No such file or directory
```

みたいなよく見るメッセージが出てくる。
