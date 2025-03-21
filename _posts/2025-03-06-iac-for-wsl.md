---
title: WSLの環境を構成管理したい
last_modified_at: 2025-03-06T17:20:11
categories:
  - blog
tags: linux wsl
---

私は、普段、WSLのubuntuを利用している。こういう仕事をしているので、Pythonを利用した開発案件が多い。Pythonは、環境管理の標準がなく様々な方法が散らばっているのが悩みの種である。悩むのが嫌なので、壊れたらOSごと再インストールの覚悟で適当に暮らしていたら、いよいよ、どっかがおかしくなってしまった。

さて・・ついにその時が・・とも思ったが、実はWSLの環境は、1つのマシンに何個も作れるらしい。ということは、何らかの方法でWSL上の環境を再現する方法を用意しておけば、お気楽に普段の作業環境を作り放題・壊し放題である。便利な時代だ。構成管理をどうするかは、別途で考えることにして、環境の管理方法をメモしておく。

## まっさらな環境を再構築する方法

新しく環境を作り直すには、まずは、まっさらな環境を手に入れる必要がある。最初に、WSLでまっさらな環境を再構築する方法を書く。

### WSL環境のtarへのエクスポート

WSL上の仮想環境は、tarファイルに固めてバックアップを取っておくことができる。なので、新規にインストールした環境を即座にバックアップしておけば、いつでもインストール直後の状態の環境を再現できる。ただし、WSL上には、同じディストリビューション・バージョンを複数インストールすることはできないらしい（少なくとも普通の手段では）。今回、壊れたのはubuntu 22.04であった。幸いなことに、24.04がWindowsストアにあるので、これをインストールできたのでよかった。

エクスポートするには、

```shell
wsl --export <エクスポートする環境の名前> <tarファイルの名前>
```

を実行する。今回は、`c:\Users\horik\wsl\ubuntu_24_04.tar`に保存した。今後は、このファイルから新しい環境を作れば、まっさらな環境がいつでも手に入る。

### WSL環境のtarファイルからの復元

環境を復元するには、

```shell
wsl --import <環境の名前> <インストール先ディレクトリ> <tarファイルの名前>
```

を実行する。今回は、`c:\Users\horik\wsl\ubuntu_work1`というフォルダにインストールした。

ここでターミナルを再起動すると、シェルの選択肢に今importした環境が追加されている。ただし、この段階では、rootでログインするように設定されており不便である。他のユーザーでログインするには、ターミナルの設定を開き、該当の環境のプロファイルを編集する必要がある。プロファイルの中に、「コマンドライン」という項目があるので、最後に`-u <ユーザー名>`を追加する。

ここまで設定すれば、ターミナルで新しい環境のシェルを立ち上げると、指定したユーザーでログインできる。

### 環境の削除

環境を削除するには、以下を実行する。

```shell
wsl --unregister <環境名>
```
