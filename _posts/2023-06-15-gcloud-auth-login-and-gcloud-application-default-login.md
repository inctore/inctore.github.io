---
title: gcloud auth loginとgcloud application-default login
last_modified_at: 2023-06-15T12:14:38
categories:
  - blog
tags: gcp gcloud
---

`gcloud`は、GCPのリソースを、CLIで管理するためのコマンドである。`gcloud`の下に、サービス/機能ごとに様々なサブコマンドがぶら下がっている。
認証周りを管理するサブコマンドとして`gcloud auth`があるのだが、これの下のサブコマンドに、

- `gcloud auth login`
- `gcloud auth application-default login`

という似た見た目のものがあり、違いは何なのかを調べた。

## `gcloud login`

`gcloud login`では、`gcloud`コマンドが利用する認証を設定することができる。つまり、これでログインすれば、以降は`gcloud`コマンドによって、ログインしたアカウントと同じ権限でリソースを管理できる。

では、`gcloud`以外での認証とは何か。

## `gcloud application-default login`

`gcloud auth application-default login`でも、同様にログインプロセスが走るが、これによって、`Application Default Credentials`(ADC)に認証情報が設定される。

ADCは何かというと、各種言語のSDKがデフォルトで用いる認証情報である。GCPの各種リソースをプログラムからコントロールする際には、Googleが提供しているSDKを利用することになる。
これらSDKのAPIには、明示的に認証情報を渡すこともできるが、省略することもできる。その場合に、Application Default Credentialsが設定されていれば、そこから認証情報を得る。

これのおかげで、プログラムのソースを変更することなく、環境によって認証情報を変えることができるので便利である。

## その他、知っておいた方が良いこと

- `gcloud auth login`は`gcloud`の利用する認証で、`gcloud auth application-defualt login`は、ADCの利用する認証である。どちらも、他方の情報を使うことはない。
- `gcloud auth application-defualt login`以外にも、`GOOGLE_APPLICATION_CREDENTIALS`に鍵ファイルへのパスを設定することでもADCの認証をコントロールできる。また、こちらの環境変数の方が優先度が高い。しかし、鍵ファイルを保存することはセキュリティ上好ましくない、とのこと
