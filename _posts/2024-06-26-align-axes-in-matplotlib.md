---
title: matplotlibで軸を揃える
last_modified_at: 2024-06-26T11:45:43
categories:
  - blog
tags: python
---

matplotlibで1枚のFigureに複数のグラフをプロットしたときに、その軸を揃えたいときがある。

```python
fig, axes = plt.subplots(3, 2, sharex=True, sharey=True, figsize=(12, 8))
```
