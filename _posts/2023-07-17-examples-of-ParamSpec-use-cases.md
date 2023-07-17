---
title: ParamSpecの利用例
last_modified_at: 2023-07-17T11:20:56
categories:
  - blog
tags: python
---

ParamSpecを使うと、デコレータを定義する際に、デコレートされる関数の引数の型情報を明示的に扱うことができる([昨日のブログ](https://www.inctore.com/blog/keeping-type-information-of-arguments-in-decorator/))。
ParamSpecを提案しているPEPでは、単純に型情報を保つだけではなく、引数の型に制約を導入するような例が挙げられている。

例えば、以下のコードでは、`printall`に渡される関数には「最初の位置引数は`list`である」という制約が課されている。

```python
from typing import Callable, Concatenate, ParamSpec, TypeVar

P = ParamSpec("P")
R = TypeVar("R")
Q = TypeVar("Q")

def printall(f: Callable[Concatenate[list[Q], P], R]) -> Callable[Concatenate[list[Q], P], R]:
    def ret(xs: list[Q], *args: P.args, **kwargs: P.kwargs) -> R:
        for x in xs:
            print(x)
        return f(xs, *args, **kwargs)
    return ret

@printall
def mysum(xs: list[int]) -> int:  # type checks
    return sum(xs)

@printall
def mysum2(x: int, y: int) -> int:  # type error
    return x + y
```

上の例で、第一引数を、`list`ではなく`Iterable`にしたいと思ったとする。
何も考えずに、型アノテーションを`list`→`Iterable`に変えてみると、うまく行かない。

```python
from typing import Callable, Concatenate, ParamSpec, TypeVar, Iterable

P = ParamSpec("P")
R = TypeVar("R")
Q = TypeVar("Q")

def printall(f: Callable[Concatenate[Iterable[Q], P], R]) -> Callable[Concatenate[Iterable[Q], P], R]:
    def ret(xs: Iterable[Q], *args: P.args, **kwargs: P.kwargs) -> R:
        for x in xs:
            print(x)
        return f(xs, *args, **kwargs)
    return ret

@printall
def mysum(xs: list[int]) -> int:  # type error
    return sum(xs)
```

これは、`Callable`の第一引数 = 関数の引数の型はcontravariantだからである。
上のコードでは、`printall`に渡されてくる関数は`Iterable`なものであれば何でも受け入れてくれることを期待されている。
一方で、実際に渡されている`mysum`は`list`型しか受け取れない(と宣言されている)。
つまり、型チェッカの立場から見ると、`list`型しか受け取れない`mysum`に一般の`Iterable`が渡される可能性があるように見えるため、エラーになる。

一方で、上のコードのように、「`Iterable`のサブタイプを受け入れてくれる関数なら何でも受け入れる」ことを型で表現したいこともある。そのような時には、`TypeVar`の`bound`を利用すれば良い。

```python
from typing import Callable, Concatenate, ParamSpec, TypeVar, Iterable

P = ParamSpec("P")
R = TypeVar("R")
XS = TypeVar("XS", bound=Iterable)

def printall(f: Callable[Concatenate[XS, P], R]) -> Callable[Concatenate[XS, P], R]:
    def ret(xs: XS, *args: P.args, **kwargs: P.kwargs) -> R:
        for x in xs:
            print(x)
        return f(xs, *args, **kwargs)
    return ret

@printall
def mysum(xs: list[int]) -> int:  # type checks
    return sum(xs)

@printall
def mysum2(x: int, y: int) -> int:  # type error
    return x + y
```
