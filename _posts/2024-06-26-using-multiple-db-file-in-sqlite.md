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
