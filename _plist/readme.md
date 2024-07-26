# `_plist2`

jekyllをOS上のrubyで動かす場合のplist

## rubyのバージョン

3.1.x

## 動かし方

1. `anyenv`で`rbenv`を入れる
1. `rbenv install -l`で3.1系のバージョンを確認
1. `rbenv install <version>`でインストール
1. `rbenv local <version>`でバージョン指定
1. `bundle update --bundler`で仮想環境にパッケージをインストール
1. `make`でlaunchctl関連のセットアップと起動

※ この他にpythonのjinja2-cliも必要だが、それは適当に入れる

todo: テンプレートエンジンをrubyの物に変える
