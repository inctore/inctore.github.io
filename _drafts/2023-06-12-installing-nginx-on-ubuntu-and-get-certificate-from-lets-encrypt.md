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
  - デフォルトのnginx.confでは、`sites-enabled/*.conf`をincludeしている
  - `sites-available`に、サーバーごとに設定を書いておいておく

最低限のサーバー設定ファイル

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

```
sudo apt install mysql-server
sudo mysql_secure_installation
```

[2023-06-13 08:26:36] とりあえずここまで

## リバプロの設定(未済)

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

#### EOF
<!-- link -->
[lets encrypt]: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04
[nginx conf]: https://blog.mothule.com/web/nginx/web-nginx-getting-started-step2-on-mac#%E3%82%BC%E3%83%AD%E3%81%8B%E3%82%89nginxconf%E3%82%92%E6%9B%B8%E3%81%84%E3%81%A6http%E3%82%B5%E3%83%BC%E3%83%90%E3%82%92%E6%A7%8B%E7%AF%89%E3%81%97%E3%81%BE%E3%81%99
