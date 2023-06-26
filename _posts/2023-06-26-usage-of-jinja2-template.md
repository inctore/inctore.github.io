---
title: jinjaテンプレートの使い方メモ
last_modified_at: 2023-06-26T09:23:47
categories:
  - blog
tags: python jinja
---

たまに使うんだけど毎日使うというほどでもないので使い方を何回も調べている道具シリーズ。jinja2の使い方をメモしておく。

```python
import jinja2 as j2

env = j2.Environment()
temp = env.from_string("Hello {{name}} !!")
print(temp.render(name="World"))
```
