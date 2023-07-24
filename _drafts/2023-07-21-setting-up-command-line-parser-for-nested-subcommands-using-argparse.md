---
title: argparseでサブコマンドを入れ子にする
last_modified_at: 2023-07-21T18:38:25
categories:
  - blog
tags: python argparse
---

たまに使うんだけど毎日使うというほどでもないので使い方を何回も調べている道具シリーズ。

argparseでサブコマンドを使いたい、ということは何回かあった。
毎回、適当にググってコピペして何となく動いてるからいいや、で済ませてきたのだが、
今回、多階層にわたるサブコマンドを定義したくなり、ちゃんと分かっとかないとできなさそうだったので、
キチンと調べてメモしておこう。

## 単純な使い方

```python
import argparse

parser = argparse.ArgumentParser("hoge")

parser.add_argument("arg")
parser.add_argument("--opt")

args = parser.parse_args()
```

これを`hoge.py`として保存すると、以下のようなオプションと位置引数を取るスクリプトが作れる。

```shell
$ python hoge.py --help
usage: hoge.py [-h] [--opt OPT] arg

positional arguments:
  arg

options:
  -h, --help  show this help message and exit
  --opt OPT
```

つまり、`argparse.ArgumentParser`のインスタンスを作り、そいつに位置引数 or オプション引数を設定していく。

## サブコマンドを定義する

```shell
$ python hoge2.py --help
usage: hoge2.py [-h] [--opt OPT] {sub1,sub2} ...

positional arguments:
  {sub1,sub2}

options:
  -h, --help   show this help message and exit
  --opt OPT
```

```shell
$ python hoge2.py sub1 --help
usage: hoge2.py sub1 [-h] [--sub1-opt SUB1_OPT] sub1-arg

positional arguments:
  sub1-arg

options:
  -h, --help           show this help message and exit
  --sub1-opt SUB1_OPT
```
