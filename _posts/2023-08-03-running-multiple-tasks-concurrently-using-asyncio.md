---
title: asyncioで複数のタスクを並列に走らせる
last_modified_at: 2023-08-03T07:42:11
categories:
  - blog
tags: python asyncio
---

`asyncio`を使って、複数の処理を並列に走らせるコードをメモしておく。

あるコルーチンから、別のコルーチンを、元のものとは独立に起動するには、`Task`という機構を使う。
`Task`は、`asyncio.create_task`関数にコルーチンを渡すことで作成することができる。
できあがった`Task`は、`asyncio.gather`などによって`await`することができる。

言葉で説明するのは難しい・・・

## サンプルコード (sample.py)

```python
import asyncio
from datetime import datetime

def message(m):
    print(f"{m} [{datetime.now().strftime('%H:%M:%S')}]")

async def runner(name, speed):
    distance = 0
    while True:
        await asyncio.sleep(1.0 / speed)
        distance += 1
        message(f"{name}: distance={distance}")
        if distance >= 10:
            message(f"{name}: finish !")
            return

async def main():
    rabbit = asyncio.create_task(runner("🐰", 3))
    turtle = asyncio.create_task(runner("🐢", 1))
    await asyncio.gather(rabbit, turtle)

if __name__ == "__main__":
    asyncio.run(main())
```

上のコードは、以下のようなことを行っている。

1. `rabbit`、`turtle`という2つのタスクを起動する
   1. それぞれのタスクは、一定の間隔でメッセージを表示する
1. メインのコルーチンでは、この2つのタスクが完了するのを`asyncio.gather`によって`await`する

これを実行すると、`rabbit`は1秒に3回、`turtle`は1秒に1回メッセージを表示し、それぞれ10回メッセージを表示したら終了する。

出力

```shell
> python sample.py
🐰: distance=1 [07:53:18]
🐰: distance=2 [07:53:18]
🐢: distance=1 [07:53:19]
🐰: distance=3 [07:53:19]
🐰: distance=4 [07:53:19]
🐰: distance=5 [07:53:19]
🐢: distance=2 [07:53:20]
🐰: distance=6 [07:53:20]
🐰: distance=7 [07:53:20]
🐰: distance=8 [07:53:20]
🐢: distance=3 [07:53:21]
🐰: distance=9 [07:53:21]
🐰: distance=10 [07:53:21]
🐰: finish ! [07:53:21]
🐢: distance=4 [07:53:22]
🐢: distance=5 [07:53:23]
🐢: distance=6 [07:53:24]
🐢: distance=7 [07:53:25]
🐢: distance=8 [07:53:26]
🐢: distance=9 [07:53:27]
🐢: distance=10 [07:53:28]
🐢: finish ! [07:53:28]
```
