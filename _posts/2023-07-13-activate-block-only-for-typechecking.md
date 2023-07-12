---
title: 型チェック時だけコードを有効にする
last_modified_at: 2023-07-13T08:49:47+09:00:00
categories:
  - blog
tags: python
---

`typing.TYPE_CHECKING`という変数があり、こいつは型チェックのときだけTrueになるようだ。

以下のようにして使う。

```python
from typing import TYPE_CHECKING
from typing_extensions import reveal_type

x = 1

if TYPE_CHECKING:
    print("型チェック中")
    reveal_type(x)
print(x)
```

これを、`temp2.py`として保存したとする。

型チェック

```shell
$ pyright temp2.py
/private/tmp/ex/temp2.py
  /private/tmp/ex/temp2.py:7:17 - information: Type of "x" is "Literal[1]"
0 errors, 0 warnings, 1 information
```

`if`の中が評価されて、`x`の型情報が表示される。

実行

```shell
$ python temp2.py
1
```

こちらでは、`if`の中は評価されない。
