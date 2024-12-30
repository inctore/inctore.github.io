---
title: ProcessPoolExecutorの使い方メモ
last_modified_at: 2024-12-24T10:46:57
categories:
  - blog
tags: python
---

pythonのProcessPoolExecutorは、雑に並列処理を実装するのに大変便利である。使い方をメモっておく。

```python
from concurrent import futures as cf

def f(x: int) -> int:
    if x % 3 == 0:
        raise ValueError("x is divisible by 3")
    return x * x

vals = list(range(10))

with cf.ProcessPoolExecutor() as executor:
    futures = [executor.submit(f, x) for x in vals]
cf.wait(futures, return_when="ALL_COMPLETED")

results = []
errors = []

for future in futures:
    if future.exception():
        errors.append(future.exception())
    else:
        results.append(future.result())

print(results)
print(errors)
```

出力：

```
[1, 4, 16, 25, 49, 64]
[ValueError('x is divisible by 3'), ValueError('x is divisible by 3'), ValueError('x is divisible by 3'), ValueError('x is divisible by 3')]
```

`executor.map`というメソッドもあって、これを使うと明示的に`Future`オブジェクトを扱わなくて済む。
のだが、`map`だとなぜか固まることがある。のと、実際のユースケースでは、例外を明示的に扱えた方がよいことがほとんどなので、こちらを利用している。
