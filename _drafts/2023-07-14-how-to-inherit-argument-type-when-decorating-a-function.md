---
title: ParamSpecで引数の型を考慮したデコレータを作る
last_modified_at: 2023-07-14T03:53:28
categories:
  - blog
tags: python
---

Pythonのデコレータを使うと、本質的なロジックとそれ以外の雑務的ロジックという異なるレベルの関心事を、別々に分けて実装できるので便利である。
例えば、

```python
def log(f):
    def ret(*args, **kwargs):
        print("start")
        val = f(*args, **kwargs)
        print("end")
        return val
    return ret

@log
def func(x: int, y: int, z: int = 0) -> int:
    return x + y + z

print(func(1, 2, 3))
```

こんなコードを実行すると、以下のような出力が得られる。

```shell
start
end
6
```

ここで、「3つの数字を足す」という本質的なロジックと、「関数実行の前後に開始・終了のログを吐く」という雑務的なロジックが別の関数に切り出されているのが心地良いというのが冒頭の文章の意味である。

上のコードを見ると、一見、funcの型の情報が消えてしまうように見える・・・が、実は最近の型チェッカは賢く、きちんと型を推論してくれるようである。実際、上のコードの最後に

```python
if TYPE_CHECKING:
    reveal_type(func)
```

を入れてpyrightを実行すると、

```shell
information: Type of "func" is "(x: int, y: int, z: int = 0) -> int"
```

という型を報告してくれる。
