---
title: 引数の型情報を保つデコレータ
last_modified_at: 2023-07-16T19:35:56
categories:
  - blog
tags: python
---

デコレータによって関数を修飾した際、単純な例では、型チェッカが自動で型を推論してくれる。

```python
from typing import TYPE_CHECKING, reveal_type

def deco(f):
    def ret(*args, **kwargs):
        print("doco")
        return f(*args, **kwargs)
    return ret

@deco
def func(x: int, y: int) -> int:
    return x + y

if TYPE_CHECKING:
    reveal_type(func)

# => information: Type of "func" is "(x: int, y: int) -> int"
```

しかし、ちょっと複雑になると無理なようであった。

```python
class Func:
    def __init__(self, f):
        self.f = f

    def __call__(self, *args, **kwargs):
        print("Func")
        return self.f(*args, **kwargs)

def deco(f):
    return Func(f)

@deco
def func(x: int, y: int) -> int:
    return x * y

func("a", "b") # 型チェッカで型の誤りを検出できない
```

これに、型を付けるにはどうしたら・・と思って調べていたら、`ParamSpec`というものを知った。[pep][pep]

`ParamSpec`は、`TypeVar`みたいなもので、型パラメータとして使うと、関数の引数を参照できる。具体的には、
以下のようにして使う。

```python
from typing import Callable, Generic, ParamSpec, TypeVar

P = ParamSpec("P")
R = TypeVar("R")

class Func(Generic[P, R]):
    def __init__(self, f: Callable[P, R]):
        self.f = f

    def __call__(self, *args: P.args, **kwargs: P.kwargs) -> R:
        print("Func")
        return self.f(*args, **kwargs)

def deco(f: Callable[P, R]) -> Func[P, R]:
    return Func(f)

@deco
def func(x: int, y: int) -> int:
    return x * y

func("a", "b") # 型チェッカがエラーを報告してくれる
```

<!-- link -->
[pep]: https://peps.python.org/pep-0612/
