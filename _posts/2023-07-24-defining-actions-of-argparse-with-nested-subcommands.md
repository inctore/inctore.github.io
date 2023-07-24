---
title: 入れ子になったargparseのアクションを定義する
last_modified_at: 2023-07-24T10:10:45
categories:
  - blog
tags: python
---

[前回の記事][blog]のコード例ではパーサーの定義だけしか書いていなかったが、サブコマンドごとに異なるアクションを割り当てなければ意味がないので、その方法をメモがてらブログに残しておく。

argparseでは、各パーサーに`handler`を定義することで、これを実現する。アクションを定義するだけであれば、末端のサブコマンド用のパーサーにhandlerを設定すれば良い。実際には、不完全なコマンドが渡された場合に、そのコマンド特有のヘルプメッセージを出したいので、途中の段階のパーサーには、そのパーサーのヘルプメッセージを表示するように設定している。

```python
import argparse

gcloud_parser = argparse.ArgumentParser("gcloud")
gcloud_actions = gcloud_parser.add_subparsers()

compute_parser = gcloud_actions.add_parser("compute")
compute_actions = compute_parser.add_subparsers()

instances_parser = compute_actions.add_parser("instances")
instances_actions = instances_parser.add_subparsers()

start_parser = instances_actions.add_parser("start")
stop_parser = instances_actions.add_parser("stop")

ssh_parser = compute_actions.add_parser("ssh")

storage_parser = gcloud_actions.add_parser("storage")
storage_actions = storage_parser.add_subparsers()

ls_parser = storage_actions.add_parser("ls")
cp_parser = storage_actions.add_parser("cp")

gcloud_parser.add_argument("--project")
gcloud_parser.add_argument("--region")

start_parser.add_argument("instance")
stop_parser.add_argument("instance")

ssh_parser.add_argument("instance")

ls_parser.add_argument("name")
cp_parser.add_argument("source")
cp_parser.add_argument("destination")
cp_parser.add_argument("--recursive", "-r")

def handler(name, parser, notrun):
    def ret(_):
        if notrun:
            parser.print_help()
        else:
            print(name)
    return ret

commands = [
    ["compute", True],
    ["instances", True],
    ["start", False],
    ["stop", False],
    ["ssh", False],
    ["storage", True],
    ["ls", False],
    ["cp", False]
]
for command, notrun in commands:
    parser = globals()[f"{command}_parser"]
    parser.set_defaults(handler=handler(command, parser, notrun))

args = gcloud_parser.parse_args()
if hasattr(args, "handler"):
    args.handler(args)
else:
    gcloud_parser.print_help()
```

コードを書くのが面倒になり、途中でメタチックなことをやっていて見づらいが、ポイントは、

1. サブコマンドの末端のパーサーには、普通に対応するアクションを起こす関数を設定する
1. サブコマンドの途中のパーサーには、そのパーサーのヘルプを表示する関数を設定する

というところである。

実行例

```shell
$ python gcloud.py compute
usage: gcloud compute [-h] {instances,ssh} ...

positional arguments:
  {instances,ssh}

options:
  -h, --help       show this help message and exit
```

↑不完全な引数を渡すと、そのサブコマンドが期待している次の段階のサブコマンドが表示されている。

```shell
$ python gcloud.py compute instances start instance
start
```

正しくサブコマンドと、その引数までを渡せばアクションが実行される。

<!-- link -->
[blog]: https://www.inctore.com/blog/setting-up-command-line-parser-for-nested-subcommands-using-argparse/
