---
title: matplotlibのx軸ラベルを45°傾ける
last_modified_at: 2023-08-10T13:30:48
categories:
  - blog
tags: matplotlib python
---

たまに使うんだけど毎日使うというほどでもないので使い方を何回も調べている道具シリーズ。

```python
ax.set_xticklabels(ax.get_xticklabels(), rotation=45)
```

matplotlibは苦手だ・・・
