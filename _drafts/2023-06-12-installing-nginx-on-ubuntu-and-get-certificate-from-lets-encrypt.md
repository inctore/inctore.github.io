---
title: GCEでシンプルなWEBアプリケーションをホストする
last_modified_at: 2023-06-12T05:36:09
categories:
  - blog
tags: linux
---

# 清書

## 構成

- OS: ubuntu
- webサーバー: nginx
- DB: mysql
- アプリサーバー: express
- フロントエンド: react

というような、いわゆるWEBアプリケーションを、自社用に1から構成したので、手順をメモしておく。

## nginx, mysqlのインストール

- `apt install nginx mysql`だけ

## ファイアウォールの設定

`ufw`を使う。

### `ufw`とは

[公式ページ][ufw]

伝統的には、`netfilter`とういのがLinuxのパケットフィルタの仕組みで、そのフロントエンドとして、`iptables`という
CLIが利用されていた。が、これを使いこなすのは、なかなかに骨が折れる。そこで、様々な設定用便利コマンド群というのが
できてきて、`ufw`は、その中の1つ。Uncomplicated Firewallの略らしい。

### 設定内容

1. http, httpsを許可: WEBアプリをホストしたいので当然
1. sshを許可: これがないとサーバーの操作ができない

あとは、基本、拒否でOK。

### 設定方法

最低限は、以下をやればOK

```shell
ufw default deny incoming # 内向きの接続を、まずは全部不許可
ufw default allow outgoing # 外向きは、全部許可
ufw allow ssh # sshを許可
ufw allow 'Nginx Full' # http, httpsを許可. これは、nginxのインストール後に実行する必要(たぶん)
ufw enable
```

# 以下メモ

# 作業ログ(サルベージしたもの)

[2023-06-10 07:14:56]

手でインストールしようと思ったけど、イメージを作った方が早そうな気がしてきた

[2023-06-10 07:41:14]

https://cloud.google.com/build/docs/building/build-vm-images-with-packer?hl=ja

```
gcloud services enable sourcerepo.googleapis.com
gcloud services enable compute.googleapis.com
gcloud services enable servicemanagement.googleapis.com
gcloud services enable storage-api.googleapis.com
```

これの実行が必要だった

[2023-06-10 13:14:00]

gcloud auth application-default login
を実行して、`GOOGLE_APPLICATION_CREDENTIALS`環境変数を削除

- vm作成: http/httpsサーバーとしてチェック
- nginxインストール: apt install nginx
- DNSのAレコードを作成
- let's encryptの導入 [link][lets encrypt]
- confファイルの書き方 [linkx][nginx conf]

## nginx confファイルの書き方覚え書き
- 場所: /etc/nginx/nginx.confが本体
  - sites-availableとsites-enabledディレクトリが横にある
  - デフォルトのnginx.confでは、`sites-enabled/*.conf`をincludeしている
  - `sites-available`に、サーバーごとに設定を書いておいておく
  - デフォルトのnginx.confでは、`sites-enabled/*`をincludeしている
  - `sites-available`に、サーバーごとにファイルを分けて設定を書いておいて、必要なものだけシンボリックリンクを`sites-enabled`の下に貼る
  - デフォルトでは、`sites-enabled/default`が配置され、`sites-available/default`が、それを参照するようになっている
    - これはサンプルなので、しんぼりっくりんくを消す
    - 参照先のファイルは、設定に関する説明がコメントされているので、取っておけばよい
  - 最低限は、以下くらいを書いて`sites-available/サーバー名`としておいておいて、`sites-enabled`の下にリンクを貼っておく

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;
        server_name <ドメイン>;

        location / {
                try_files $uri $uri/ =404;
        }
}
```

## nginxの操作

- `sudo nginx -t`: 設定ファイルのテスト
- `sudo systemctl XXX nginx.service`
  - `XXX`は`start`, `stop`, `restart`, `reload`, `status`

[2023-06-13 06:48:04] 素のnginxが動くイメージができた

## ufwの設定

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-20-04

- `sudo ufw enable`: FWを有効化, 起動時にも有効化される
- `sudo ufw reload`: FWを無効化, 起動時の設定も削除

- `sudo ufw status`: 状態を確認
- `sudo ufw default deny incoming`
- `sudo ufw default allow outgoing`
- `sudo ufw allow ssh`
- `sudo uft allow 'Nginx Full'`: http(s)の疎通ができるようになる

[2023-06-13 07:48:42] FWを起動するイメージができた

## 証明書のインストール

- certbotが自動でやってくれる
- certbotにnginx用のpluginがあるので、そいつを使う

- `sudo apt install python3-certbot-nginx`: certbotのインストール
- `sudo certbot --nginx -d kintai.inctore.com`: 証明書の発行

証明書発行時のメッセージ

```
$ sudo certbot --nginx -d kintai.inctore.com
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Enter email address (used for urgent renewal and security notices)
 (Enter 'c' to cancel): hotoku@inctore.com

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.3-September-21-2022.pdf. You must
agree in order to register with the ACME server. Do you agree?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: y

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Would you be willing, once your first certificate is successfully issued, to
share your email address with the Electronic Frontier Foundation, a founding
partner of the Let's Encrypt project and the non-profit organization that
develops Certbot? We'd like to send you email about our work encrypting the web,
EFF news, campaigns, and ways to support digital freedom.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: n
Account registered.
Requesting a certificate for kintai.inctore.com

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/kintai.inctore.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/kintai.inctore.com/privkey.pem
This certificate expires on 2023-09-10.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Deploying certificate
Successfully deployed certificate for kintai.inctore.com to /etc/nginx/sites-enabled/kintai.inctore.com
Congratulations! You have successfully enabled HTTPS on https://kintai.inctore.com

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

- `/etc/letsencrypt/live/kintai.inctore.com/fullchain.pem`
- `/etc/letsencrypt/live/kintai.inctore.com/privkey.pem`
- `/etc/nginx/sites-enabled/kintai.inctore.com`
この3つのファイルをサルベージ・・すれば良さそう

certbot実行後のnginx設定

```
server {

        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;

	server_name kintai.inctore.com;

	location / {
		try_files $uri $uri/ =404;
	}

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/kintai.inctore.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/kintai.inctore.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = kintai.inctore.com) {
	return 301 https://$host$request_uri;
    } # managed by Certbot

	listen 80 default_server;
	listen [::]:80 default_server;

	server_name kintai.inctore.com;
    return 404; # managed by Certbot

}
```

- `root`, `index`が、上の`server`に移動
- 443にアクセスが来た場合、上の`server`で対応
- 80にアクセスが来た場合、下の`server`で対応 → 301で転送される

という動作と想像

証明書の手動での設定は怖いので、certbotの実行をするスクリプトを置いておき、サーバーを変えたときに実行する運用にする。

## mysqlのインストール

- https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04
- https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-22-04

```
sudo apt install mysql-server
```

[2023-06-13 08:26:36] とりあえずここまで

[2023-06-14 05:43:09]
`sudo mysql_secure_installation`は上手く動かず

ubuntu 22.04だとエラーになるとのこと。上のdigital ocean記事より

sudo mysql → alter userでrootのパスワード設定
と思ったけど、qiita記事のとおり、`mysql_secure_installation`は不要にしよう
https://qiita.com/hato_poppo/items/d3c2bb3aa97e09b123c3#mysql-80

[2023-06-14 05:57:43]

ここまでで、必要なインストールは終わっている、かな

[2023-06-14] イメージ作成は、とりあえずここまでで、一回、アプリを動かしてみる

[2023-06-14 08:00:02] DBをダンプからリストアするのはできた

[2023-06-14 08:05:33] .envrcの環境変数を、整理する必要がある
- 本番用の環境変数
- 開発用の環境変数
- リリース作業用の環境変数

[2023-06-14 09:01:03]
mysqlのテーブル名は、macだと大文字小文字を区別せず、linuxだと区別する、という挙動らしい。罠だ

https://dev.mysql.com/doc/refman/8.0/ja/identifier-case-sensitivity.html

テーブル名は、ファイルシステム上のファイル名に由来するから、とのこと。罠だ

テーブル名を、全部小文字にするmigrationを入れるか or クエリのテーブル名で、ちゃんと大文字小文字を区別する

方針:

1. テーブル名を全部小文字にするmigrationを入れる
2. 大文字を使っているクエリを小文字に修正する
   3. テーブルはたかだか3つなので、大した手間ではない
   3. 利用時にクエリエラーが出たら、すぐに直せる

## タスク

1. [x] nginxを起動して、httpsで接続
1. [x] アプリサーバーを起動
1. [ ] nginx or アプリサーバーから静的ファイルを配信
1. [x] mysqlのテーブル名のmigration
1. [ ] 環境変数の整理
   1. 開発用, 本番用, デプロイ用 3種類の環境があり、それぞれに必要な変数と値を整理する
1. [ ] ドキュメントの整理

## リバースプロキシの設定(未済)

- インスタンスを起動するたびにグローバルIPが変わってしまって面倒
- リバースプロキシを設定する
- cloud load balancingというサービスを設定すれば良いぽい
- https://cloud.google.com/load-balancing/docs/https?hl=ja
- https://cloud.google.com/load-balancing/docs/choosing-load-balancer
  - External versus internal load balancing
  - Global versus regional load balancing
  - Premium versus Standard Network Service Tiers
  - Proxy versus pass-through load balancing
  - Traffic type
  - DDoS protections
ここまでで、ブラウザにアクセスすると、nginxのサンプルページが見えるはず

memo:

↑までやったインスタンス = kintai-prd-10
こっから設定ファイルをサルベージして、ここまでをpacker化する

## reactアプリを配置, 配信

[2023-06-20 07:04:00] reactの配置・ビルドは正しく動いたが、nginxからの配信が失敗している
rootディレクティブをreactのビルド先に指定すると、404エラーという状態。

## nginxの設定の調整

- [x] httpで/var/www/htmlにアクセス
- [ ] httpで/home/hotoku/...にアクセス
- [ ] httpsで/home/hotoku/...にアクセス
- [ ] basic認証を入れる

### 作業記録

- kintai-prd-2 作成. e2-small
- releaseフォルダを削除
  - Makefileとbackupフォルダをサルベージ
- hotokuユーザーの環境を設定するスクリプトを作成→コミット
- e2-smallだと、さすがにビルドが遅い

## [2023-06-21] 作業記録

- [x] httpで/var/www/htmlにアクセス
- [x] 静的ファイルを/var/www/kintaiにデプロイ
- [x] kintai.inctore.comのconfのrootディレクティブを変更
- [x] httpで/var/www/kintaiにアクセス
- [x] DNSの設定
- [x] APIサーバーの立ち上げ
- [x] APIへの接続: location /api, /graphqlを追加
- [x] 空のDBを作成: server/dbでmake
- [x] DBとの動作確認
- [x] SSL証明書をインストール: certbotにお任せ, http, https + ドメインでアクセスできる必要がある
- [x] httpsで/home/hotoku/...にアクセス
- [ ] basic認証を入れる
- [ ] データの投入

- kintai-prd-7 作成. e2-medium
- node/binへのpathの設定:
- prd.envrcの読み込み: これってdirenvにできないんだっけかね
- npm i
- npm run build
- /etc/nginx/sites-available/kintai.inctore.com rootの書き換え
- nginxリスタート: sudo systemctl restart nginx.service
- 404 not found. ぐぬぬ

[2023-06-21 10:16:39]

httpsで静的ファイル・APIとも、正しくアクセスできるようになった。しかし、ReactのLinkの実装に不備があるらしく、ブラウザ内で遷移してほしいリンクをサーバーに問い合わせに行き404になっている

### 静的ファイルの配信ができなかった原因解明
- nginxは、workerプロセスをwww-dataユーザーで起動している
- /home/hotokuが、otherに対してパミがない
- ので、がいとうかしょのファイルが見えない

確認方法

起動ユーザーの場所 = /etc/nginx/nginx.confの`user`

```
$ sudo su -l www-data -s /bin/bash # www-dataになる
$ ls /home/hotoku # => permission denied
```

### 対処

- `/var/www/kintai`を作成
- その下に、静的なファイルを配置

```
$ sudo su -
$ mkdir /var/www/kintai
$ chmod o+w $_
$ exit # hotokuに戻る
$ cd ~/projects/kintai/client
$ cp -r build/* /var/www/kintai/
```

## 節約方針のメモ

- [cloud function][clfn]使って、必要なときにCFをキックして、キックされると同時にcloud sqlインスタンス停止を登録しとくような仕組みを作っておけば、インスタンス料金を節約できるかな

#### EOF
<!-- link -->
[lets encrypt]: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04
[nginx conf]: https://blog.mothule.com/web/nginx/web-nginx-getting-started-step2-on-mac#%E3%82%BC%E3%83%AD%E3%81%8B%E3%82%89nginxconf%E3%82%92%E6%9B%B8%E3%81%84%E3%81%A6http%E3%82%B5%E3%83%BC%E3%83%90%E3%82%92%E6%A7%8B%E7%AF%89%E3%81%97%E3%81%BE%E3%81%99
[ufw]: https://wiki.ubuntu.com/UncomplicatedFirewall
[clfn]: https://cloud.google.com/blog/ja/topics/developers-practitioners/lower-development-costs-schedule-cloud-sql-instances-start-and-stop
