---
title: signalハンドラの登録
last_modified_at: 2023-08-03T08:59:15
categories:
  - blog
tags: python
---

Pythonのプログラムで、いわゆるシグナルを扱うには、`signal`パッケージを用いて、ハンドラを登録することになる。以下、サンプルである(signal-sample.py)。

```python
import signal
import time
import sys

CNT = 0

def signal_handler(sig, _):
    global CNT
    CNT += 1
    print(f" receive {signal.Signals(sig)}. CNT={CNT}")
    if CNT >= 3:
        sys.exit(0)

def main():
    signal.signal(signal.SIGINT, signal_handler)
    print("Ctrl-Cを3回押してください")
    while True:
        time.sleep(100)

if __name__ == "__main__":
    main()
```

このプログラムでは、`SIGINT`が届いたときに、1. `CNT`の値をインクリメントする 2. `CNT`が一定回数以上ならば全体を終了する、という動作を行う。

以下が動作例である。実行直後、プログラムは無限ループに入る。`Ctrl-C`により`SIGINT`を3回送ると、ハンドラが動作してプログラムが終了する。

```shell
$ python signal-sample.py
Ctrl-Cを3回押してください
^C receive 2. CNT=1
^C receive 2. CNT=2
^C receive 2. CNT=3
```
