---
title: retryを考慮したasyncioによる並列処理
last_modified_at: 2023-06-21T17:52:05
categories:
  - blog
tags: python asyncio
---

ネットワーク越しのリクエストなど、I/O boundな処理をたくさん実行する際には、asyncioが便利である。

典型的なユースケースとして、次のような場合が考えられる。手元に予測モデルが1つと特徴量がたくさんあって、ローカルの計算資源だけでは長大な時間がかかるとしよう。
こんな場合には、モデルと特徴量を受け取り予測値を返すようなサーバーをクラウドに多数用意して、そこに向かって適当なバッチサイズに分割した特徴量とモデルを非同期に投げると時間を短縮できるだろう。

Python公式ドキュメントの[asyncio.Queueの節][queue]には、まさに、そういった場合に使えるコード例が記載されている。
ただし、あくまで例であって単純化されたケースを扱っているにすぎない。

例えば、上記のようなユースケースでは、
入力データが不良であるとか通信に失敗するとか、何らかの理由で個別の計算が失敗することは想定しておくべきである。
また、いちど失敗した場合でも、理由によっては何回かリトライするのが適切な場合もあるだろう。

しかし、上の例では、失敗やリトライのことは全く考慮されていない。
というわけで、上の公式の例のようなケースで、リトライを考慮するには、どうしたら良いんじゃという習作を作ったので、ここに記録。

```python
import asyncio
from asyncio import Queue
from dataclasses import dataclass
import random
import logging

LOGGER = logging.getLogger(__name__)

logging.basicConfig(
    level=logging.INFO
)

@dataclass(frozen=True)
class TaskParam:
    n: int
    retry: int
    max_retry: int

    def increment(self) -> "TaskParam":
        return TaskParam(self.n, self.retry + 1, self.max_retry)

async def run(n: int) -> int:
    # 何か時間のかかるI/O boundな処理を実行している
    await asyncio.sleep(1)

    # retryしても解決しないエラー
    if n == 50:
        raise RuntimeError(f"deterministic error {n}")

    # retryすれば解決する可能性が高いエラー
    if random.random() < 0.1:
        raise RuntimeError(f"stochastic error {n}")

    return n + 1000000

async def worker(name: str, task_queue: Queue, result_queue: Queue, giveup_queue: Queue):
    while True:
        task: TaskParam = await task_queue.get()
        try:
            ret = await run(task.n)
            result_queue.put_nowait(ret)
        except Exception as e:
            LOGGER.warning(f"{name} catch {e}")
            if task.retry <= task.max_retry:
                LOGGER.info(f"{name} task {task} is sent to retry")
                task_queue.put_nowait(task.increment())
            else:
                LOGGER.warning(
                    f"{name} task {task} exceeds max_retry, give up")
                giveup_queue.put_nowait(task)
        finally:
            # 成功しても失敗しても、queueからタスクを出したら、消費してQueueの中の未完了タスクのカウンタを減らす必要がある。
            # try: 節の中でtask_doneすると、例外発生時に、カウンタが減らず、mainの中のjoinが永遠に終わらない。
            task_queue.task_done()

async def main():
    task_queue = Queue()
    result_queue = Queue()
    giveup_queue = Queue()

    num_tasks = 100
    for i in range(num_tasks):
        task_queue.put_nowait(TaskParam(i, 0, 3))

    num_workers = 20
    workers = [
        asyncio.create_task(
            worker(f"worker-{i}", task_queue, result_queue, giveup_queue))
        for i in range(num_workers)
    ]

    await task_queue.join()

    for w in workers:
        w.cancel()
    asyncio.gather(*workers, return_exceptions=True)

    num_result = 0
    while not result_queue.empty():
        _ = result_queue.get_nowait()
        num_result += 1
    print(f"#success = {num_result}")

    print("failed tasks")
    while not giveup_queue.empty():
        t = giveup_queue.get_nowait()
        print(f"{t}")

if __name__ == "__main__":
    asyncio.run(main())
```
<!-- link -->
[queue]: https://docs.python.org/3/library/asyncio-queue.html
