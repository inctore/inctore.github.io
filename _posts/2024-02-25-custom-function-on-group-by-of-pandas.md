---
title: pandasのgroupbyでカスタム関数
last_modified_at: 2024-02-25T17:56:42
categories:
  - blog
tags: python
---

pandasのDataFrameのgroupbyでは、もともと用意されている集約関数だけではなく、カスタム関数を使うことができる。

```python
import pandas as pd

df = pd.DataFrame(dict(
    x=[1,1,2,2],
    y=[1,2,3,4]
))

def square_sum(vs: list[int]) -> int:
    return sum(map(lambda x: x**2, vs))

df.groupby("x").agg({"y": square_sum})
```

使いすぎ注意だと思うけど、たまーに便利な場面があるかもしれないからメモしておく。
