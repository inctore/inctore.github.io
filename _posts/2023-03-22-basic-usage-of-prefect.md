---
title: prefectの使い方をメモ
last_modified_at: 2023-03-22T10:47:34
categories:
  - blog
tags: python prefect
---

Python製のワークフローエンジン[prefect](https://www.prefect.io/)の基本的な使い方をメモする。

## 最小限のサンプルコード

``` python
from prefect import task, flow
from prefect_dask import DaskTaskRunner

def fib(n: int) -> int:
    if n <= 2:
        return 1
    return fib(n-1) + fib(n-2)

@task
def task1(_: int) -> int:
    return fib(40)

@task
def task_sum(ls: list[int]) -> int:
    ret = 0
    for x in ls:
        ret += x
    return ret

@flow(task_runner=DaskTaskRunner())
def main():
    xs = []
    for i in range(3):
        xs.append(task1.submit(i))
    print(task_sum.submit(xs))

def run():
    fib(40)

if __name__ == "__main__":
    main()

```

## FlowとTaskオブジェクト

prefectでは、処理の最小単位は`Task`オブジェクトになる。このタスクオブジェクトに適当な前後関係を設定して複数まとめたものが`Flow`オブジェクトで、これが実行の単位となる。

LuigiやAirflowなどの先行ワークフローエンジンでは、タスクを定義するために特定のクラスから派生したクラスを定義し、前後関係を指定するために特定のメソッドを呼び出すなど特殊なケアが必要である。
一方で、比較的新しいprefectではデコレータを上手に使っていて、通常のPythonの関数定義と変わらない形でタスクを定義でき、タスクの返り値を別のタスクの入力とするだけで前後関係を指定できる。
これのおかげで、既存のPythonスクリプトからワークフローを定義するのが、幾分か楽である。

機械学習のプロジェクトにおいて大量のインスタンスに対する予測値を計算するなど、小さいが大量のタスクを計算したい場面で、サクッと並列計算ワークフローを定義できて便利だと思う。

## TaskRunnerとTask.submit

とは言うものの、並列実行をさせる時にはいくつかのケアが必要となる。

1. `DaskTaskRunner`を指定する: デフォルトでは、`ConcurrentTaskRunner`が使われる。こいつはマルチスレッドで動作するので、CPUバウンドな処理の時にはプロセスに処理を分散してくれる`DaskTaskRunner`を指定するのが良い
1. `Task`オブジェクトの`submit`を利用する: 例えば上の例で`task1.submit(i)`となっているところは`task1(i)`としても、prefectのコードとしては正当で、実際に動作する。しかし、後者の方法では処理がsequetialに実行されてしまうので、並列に実行したければ`.submit`を通じて呼び出す必要がある
1. `if __name__ == "__main__"`でエントリーポイントをガードする: 別プロセスを起動した際に、各モジュール定義ファイルが改めて評価される。このため、`if __name__ == "__main__"`のガードがないと、エントリポイントが再度実行されてしまう
