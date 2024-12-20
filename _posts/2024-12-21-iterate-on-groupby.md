---
title: groupbyをイテレートすると
last_modified_at: 2024-12-21T06:48:44
categories:
  - blog
tags: python
---

DataFrame.groupbyの結果を、イテレートすると、(キー, 該当行が入ったDF)というタプルが得られる。日本語で説明するのは難しい。

```python
df = pd.DataFrame({
    "id": [1, 1, 2, 2],
    "x": [1, 2, 1, 2],
    "y": [100, 200, 300, 400]
})
for id, df in df.groupby("id"):
    print(f"id={id}")
    print(df)
```

で、

```
id=1
   id  x    y
0   1  1  100
1   1  2  200
id=2
   id  x    y
2   2  1  300
3   2  2  400
```

という出力が得られる。各idごとに、部分DFを取り出して、それに対して何かやりたい、みたいなときに便利。
