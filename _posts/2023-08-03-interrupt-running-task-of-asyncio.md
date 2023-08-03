---
title: asyncioで並列に走っているタスクを中断する
last_modified_at: 2023-08-03T12:06:53
categories:
  - blog
tags: python asyncio
---

[前回][前回]は、`asyncio`で複数の`Task`を並列に実行するコードを書いた。今回は、実行を開始した`Task`を中断したり再開したりする方法をメモする。

`Task`の[API][task cancel]には、`cancel`はあるのだが中断したり再開したりといった機能は用意されていないようである。なので、自前で実装しないといけない。考え方としては、実行中/停止中を表すようなフラグを用意して、`Task`の中で、そのフラグを適宜参照するようにする。

複数の`Task`で、このような状態を共有するには、`Event`という仕組みが利用できる([link][event])。`Event`は、内部に`boolean`の値を持つオブジェクトである。ポイントは、その状態が`False`→`True`に変わるのを他のコルーチンが`await`することができるような仕組みを提供してくれていることである。

以下が実装例である。前回と同じように🐇と🐢が、異なる頻度で一定回数だけメッセージを表示する。ただ、今回のプログラムでは、実行中にSIGINTシグナルを送ることで(ターミナルで`Ctrl-C`を押すことで)、それぞれのタスクの動作を中断/再開することができる。

## コード

sample2.pyとして保存する。

```python
import asyncio
from datetime import datetime
import signal

def message(m):
    print(f"{m} [{datetime.now().strftime('%H:%M:%S')}]")

async def runner(name, speed, event):
    distance = 0
    while True:
        await event.wait()
        await asyncio.sleep(1.0 / speed)
        distance += 1
        message(f"{name}: distance={distance}")
        if distance >= 10:
            message(f"{name}: finish !")
            return

def signal_handler(event, loop):
    def switch():
        if event.is_set():
            event.clear()
        else:
            event.set()

    def handler(*_):
        message(" receive signal. race will be " +
                ("stopped." if event.is_set() else "restarted."))
        loop.run_in_executor(None, switch)
    return handler

async def main():
    event = asyncio.Event()
    loop = asyncio.get_running_loop()

    signal.signal(signal.SIGINT, signal_handler(event, loop))

    rabbit = asyncio.create_task(runner("🐰", 3, event))
    turtle = asyncio.create_task(runner("🐢", 1, event))
    event.set()
    await asyncio.gather(rabbit, turtle)

if __name__ == "__main__":
    asyncio.run(main())
```

### 実行結果

```shell
$ python sample2.py
🐰: distance=1 [13:27:24]
🐰: distance=2 [13:27:24]
🐢: distance=1 [13:27:25]
🐰: distance=3 [13:27:25]
🐰: distance=4 [13:27:25]
^C receive signal. race will be stopped. [13:27:25]
🐰: distance=5 [13:27:25]
🐢: distance=2 [13:27:26]
^C receive signal. race will be restarted. [13:27:32]
🐰: distance=6 [13:27:32]
🐰: distance=7 [13:27:33]
🐢: distance=3 [13:27:33]
🐰: distance=8 [13:27:33]
🐰: distance=9 [13:27:33]
🐰: distance=10 [13:27:34]
🐰: finish ! [13:27:34]
🐢: distance=4 [13:27:34]
^C receive signal. race will be stopped. [13:27:35]
🐢: distance=5 [13:27:35]
^C receive signal. race will be restarted. [13:27:43]
🐢: distance=6 [13:27:44]
🐢: distance=7 [13:27:45]
🐢: distance=8 [13:27:46]
🐢: distance=9 [13:27:47]
🐢: distance=10 [13:27:48]
🐢: finish ! [13:27:48]
```

### 観察

- `^C`を送ったタイミングで、シグナルハンドラが起動している
- そのタイミングで、メッセージの表示が中断している
- ただし、シグナルハンドラの起動前に実行されるようにスケジュールされていた`Task`内のループは実行されている(stoppedとrestartedの間にメッセージが表示されてしまっている)

### ポイント

1. `Event`オブジェクトを作成し、`Task`間で共有している: `runner`の引数に`event`が追加されている部分である。
1. `SIGINT`で起動するハンドラを登録し、このハンドラの中で`Event`オブジェクトの中身を反転させる: この反転処理は、イベントループの中で実行されるようにコードが調整されている。ここは若干、複雑だが、本稿の主題ではないので説明は省略する。
1. `Task`の中で、`Event.wait()`を`await`している: ここの部分に来たときに`Event`の中身が`False`の場合、`True`になるまで`Task`の実行が中断されたままになる。

<!-- link -->
[前回]: https://www.inctore.com/blog/running-multiple-tasks-concurrently-using-asyncio/
[task cancel]: https://docs.python.org/3/library/asyncio-task.html#task-cancellation
[event]: https://docs.python.org/3/library/asyncio-sync.html#asyncio.Event
