---
title: clickの基本的なサンプルコード
last_modified_at: 2023-10-03T21:49:35
categories:
  - blog
tags: python
---

たまに使うんだけど毎日使うというほどでもないので使い方を何回も調べている道具シリーズ。

cilckは、pythonでCLIを書くときに便利なオプションパーサー。今どきのCLIは、大体、サブコマンドを作って、
そこに機能をまとめていくようなことをすると思う。そうすっと、上流のコマンドでオプションを定義して、それを下流に渡したい場面が出てくる。これのやり方をいつも忘れるのでメモ。

```python
import click

@click.group()
@click.option("-d", "--debug/--nodebug", default=False)
@click.pass_context
def main(ctx: click.Context, debug: bool):
    ctx.obj = {
        "debug": debug
    }

@main.command()
@click.pass_context
def run(ctx: click.Context):
    print(ctx.obj["debug"])

if __name__ == "__main__":
    main()
```

こんな感じで、`pass_context`で`cilck.Context`オブジェクトを受け取り、その`obj`の中に詰めてあげる。
