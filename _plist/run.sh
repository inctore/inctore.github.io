#!/bin/zsh


echo $(date) "start server"
export LANG=ja_JP.UTF-8


print_usage(){
    echo "run.sh"
}


source ~/.zshrc
pwd
ruby --version
bundle --version
bundle exec jekyll serve --drafts --livereload --port 14001 --livereload-port 14002
