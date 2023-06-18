---
title: pythonのrequestsパッケージについて調べた
last_modified_at: 2023-06-14T13:36:09
categories:
  - blog
tags: python requests
---

- session
  - cookieとかを保ってくれる
  - HTTPAdapterというアダプタを持ってる
- http adapterつうのがある
  - transport adapter interfaceの実装
    - `__init__`, `send`, `close`を持ってる必要あり

## references

- [requests' secret][requests' secret]
- [retries in requests][retries in requests]

<!-- link -->
[retries in requests]: https://www.coglib.com/~icordasc/blog/2014/12/retries-in-requests.html
[requests' secret]: https://laike9m.com/blog/requests-secret-pool_connections-and-pool_maxsize,89/?utm_source=pocket_saves
[writing a transport adapter]: https://lukasa.co.uk/2012/12/Writing_A_Transport_Adapter/
