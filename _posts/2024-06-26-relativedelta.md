---
title: relativedelta
last_modified_at: 2024-06-26T11:43:14
categories:
  - blog
tags: python
---

日付を扱うときには、1ヶ月後とか、月末・月初など、単純な日数の足し引きでは扱えないケースがある。そういう場合の便利ライブラリとしてdateutilというのがあることを知ったのでメモしておく。

```python
from dateutil.relativedelta import relativedelta
from datetime import date

# 日付がはみ出した場合は、月の最後になる。
d1 = date(2019, 1, 31)
d1 + relativedelta(months=1) # >> datetime.date(2019, 2, 28)

# 2月末の1ヶ月後は3月末ではなく、3/28。
d2 = date(2019, 2, 28)
d2 + relativedelta(months=1) # >> datetime.date(2019, 3, 28)

# 当月の最終日を求めるには、次のようにする。
d3 = date(2019, 3, 28)
d3 + relativedelta(months=0, day=31) # >> datetime.date(2019, 3, 31)
d4 = date(2019, 4, 1)
d4 + relativedelta(months=0, day=31) # >> datetime.date(2019, 4, 30)
```
