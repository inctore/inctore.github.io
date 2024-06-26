---
title: sqliteで複数のDBを使う
last_modified_at: 2024-06-26T09:49:58
categories:
  - blog
tags: sqlite
---

SQLiteは1ファイルが1データベースに対応する。このデータベースの中では、すべてのテーブルが同じ名前空間に属し、他のDBエンジンが持つスキーマのような概念はないらしい。

が、`attach`という構文があり、別のDBファイルを１つのセッションの中で利用できる。これを使うと、テーブルの用途ごとに異なるデータベースに分けて保存することができてスッキリする。

こんな感じで使うことができる。

```sql
sqlite> attach database '別のDBへのパス' as 'other_db';
sqlite> select * from other_db.some_table;
```

[link](https://stackoverflow.com/questions/49660302/does-sqlite-have-the-concept-of-a-schema-in-naming-tables-views)

自分は、pythonからsqliteを使うことが多いが、例えば以下のような関数を定義しておけば、便利である。

```python
import sqlite3

def connect():
    path1 = "/path/to/db1"
    path2 = "/path/to/db2"
    con = sqlite3.connect(path1)
    con.execute(f"attach database '{path2}' as 'other'")
    return con
```
