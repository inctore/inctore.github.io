---
title: matplotlibのx軸ラベルを45°傾ける
last_modified_at: 2023-08-10T13:30:48
categories:
  - blog
tags: matplotlib python
---

たまに使うんだけど毎日使うというほどでもないので使い方を何回も調べている道具シリーズ。

```python
ax.set_xticks(ax.get_xticks())
ax.set_xticklabels(ax.get_xticklabels(), rotation=45)
```

`ax.set_xticks(ax.get_xticks())`は、一見、何も意味ないことをやっているように見えるが、
これがないと`UserWarning: FixedFormatter should only be used together with FixedLocator`という警告が出る🙃

応用として、`ax.set_xticks(ax.get_xticks()[::2])`とかすると、デフォルトだとtickが多すぎる場合に、元のtickから1個飛ばしのポイントだけを採用したりできる。
