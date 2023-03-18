---
title: Flaskの単体テスト
last_modified_at: 2023-03-18T10:28:58
categories:
  - blog
tags: python flask
---

Flaskでは、flask.testingという単体テスト用のモジュールが提供されている。
これをpytestで利用する場合の使い方をメモしておく。

## appオブジェクトの取得・設定の更新

テストコードの中で、テスト対象となるflaskのappオブジェクトを取得する。
このオブジェクトに対して`.config.update`を呼び出し、`{"TESTING": True}`を設定する。

例

```python
from some_package import server

app = server.app
app.config.update({
    "TESTING": True
})
```

## clientの取得・リクエストの送信

上で取得したappオブジェクトに対して、`.test_client`を呼び出すと、テスト用のクライアントが手に入る。
このオブジェクトの`get`, `post`メソッドなどを呼び出すと、appのhttpリクエストに対する応答をテストできる。

例

```python
client = app.test_client()
ret = client.get("/api/hello")
ret2 = client.post("/api/someFunc", data=data)
# ret, ret2に、httpリクエストに対するレスポンスが返ってくる
```

## fixtureにする

pytestでは、複数のテストで共通に使うようなコード片はfixtureとしてまとめておくことができる。
fixtureは、テストファイルの中に書いても良いが、複数のファイルで共通に使うような物は、`conftest.py`に記述することができる。

`conftest.py`

```python
import pytest

from some_package import server

@pytest.fixture
def app():
    app = server.app
    app.config.update({
        "TESTING": True
    })
    yield app

@pytest.fixture
def client(app: Flask) -> FlaskClient:
    return app.test_client()
```

上の`conftest.py`と同じ階層に、例えば`test_server.py`というファイルを作ると、以下のようにサーバーをテストすることができる。

`test_server.py`

```python
from flask.testing import FlaskClient

def test_filter(client: FlaskClient):
    ret = client.get("/hello")
    assert "hello" == ret.data.decode()
```
