---
title: ProcessPoolExecutorの使い方メモ
last_modified_at: 2024-12-24T10:46:57
categories:
  - blog
tags: python
---

pythonのProcessPoolExecutorは、雑に並列処理を実装するのに大変便利である。使い方をメモっておく。

```python
from concurrent.futures import ProcessPoolExecutor

def f(x):
    return x * x

def main():
    with ProcessPoolExecutor() as executor:
        futs = [executor.submit(f, i) for i in range(5)]
    res = []
    for fut in futs:
        res.append(fut.result(timeout=1))
    print(res)

if __name__ == "__main__":
    main()
```

`executor.map`というメソッドもあって、これを使うと明示的に`Future`オブジェクトを扱わなくて済む。
のだが、`map`だとなぜか固まることがある。何度か遭遇したが、原因が分かっていない。これもなぜか分からないが、上のように`Future`を介すると固まることが（今のところ）ないので、とりあえずこうしている。

上のように書くと、`fut.result(timeout=1)`がsequentialに実行されると、たとえば全タスクが失敗した場合に、結局、待ち時間がタスク数に比例して伸びてしまう可能性があるように思う。気になるので、あとで実験する。
