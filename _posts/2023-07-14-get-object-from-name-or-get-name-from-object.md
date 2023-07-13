---
title: 名前からオブジェクトを得る。オブジェクトの名前を得る
last_modified_at: 2023-07-14T05:14:29
categories:
  - blog
tags: python
---

たまに使うんだけど毎日使うというほどでもないので使い方を何回も調べている道具シリーズ。

実行時に、名前からオブジェクトを取得したり、逆にオブジェクトの名前を知りたいと思うことがある。

### オブジェクトから名前を得る

- `__module__`で、そのオブジェクトが定義されているモジュールの名前が分かる。
- `__name__`で、そのオブジェクトの名前が分かる。

### 名前からオブジェクトを得る

- `getattr(モジュール、名前)`で、そのモジュールの中で、その名前で定義されているオブジェクトを得ることができる。

### 例

```python
def func(x: int) -> int:
    return x + 1

def func2(y: int) -> int:
    return y + 2
```

こんなモジュールが、あったとする。

```python
import importlib

from mymodule import func

mod_name = func.__module__

print("module name is", mod_name)
print("function name is", func.__name__)

mod = importlib.import_module(mod_name)
func2 = getattr(mod, "func2")

print("calculated value is", func2(100))
```

こんなプログラムを実行すると、

```shell
module name is mymodule
function name is func
calculated value is 102
```

こんな結果になる。

## 名前が複数あるときは

よく考えると、オブジェクトは別の変数に代入することができる。そすっと、オブジェクトは複数の「名前」で呼ぶことができる。
先ほどの例を、以下のように少し変更する。

```python
def func(x: int) -> int:
    return x + 1

def func2(y: int) -> int:
    return y + 2

func3 = func2
```

で、以下を実行すると

```python
import mymodule

func3 = getattr(mymodule, "func3")
print("name of func3 is", func3.__name__)
```

こんな結果になる。

```shell
name of func3 is func2
```

なるほど
