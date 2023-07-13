---
title: Pythonのモジュールを実行時に扱う
last_modified_at: 2023-07-13T13:48:07
categories:
  - blog
tags: python
---

```python
import importlib

mod = importlib.import("some.module")
func = getattr(mod, "func_name")
```
