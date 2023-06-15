---
title: ubuntuにnginxを入れてLet's encryptの証明書を取得する
last_modified_at: 2023-06-12T05:36:09
categories:
  - blog
tags: linux
---

- vm作成: http/httpsサーバーとしてチェック
- nginxインストール: apt install nginx
- DNSのAレコードを作成
- let's encryptの導入 [link][lets encrypt]
- confファイルの書き方 [linkx][nginx conf]

## nginx confファイルの書き方覚え書き
- 場所: /etc/nginx/nginx.confが本体
  - sites-availableとsites-enabledディレクトリが横にある
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

        server_name kintai.inctore.com;

        location / {
                try_files $uri $uri/ =404;
        }
}
```

ここまでで、ブラウザにアクセスすると、nginxのサンプルページが見えるはず

memo:

↑までやったインスタンス = kintai-prd-10
こっから設定ファイルをサルベージして、ここまでをpacker化する

## reactアプリを配置

#### EOF
<!-- link -->
[lets encrypt]: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04
[nginx conf]: https://blog.mothule.com/web/nginx/web-nginx-getting-started-step2-on-mac#%E3%82%BC%E3%83%AD%E3%81%8B%E3%82%89nginxconf%E3%82%92%E6%9B%B8%E3%81%84%E3%81%A6http%E3%82%B5%E3%83%BC%E3%83%90%E3%82%92%E6%A7%8B%E7%AF%89%E3%81%97%E3%81%BE%E3%81%99
