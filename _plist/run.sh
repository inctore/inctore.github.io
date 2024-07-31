#!/bin/bash


echo $(date) "start server"
export LANG=ja_JP.UTF-8


print_usage(){
    echo "run.sh"
}


export PATH=/opt/homebrew/bin:${PATH}
eval "$(anyenv init -)"


ruby --version
bundle exec jekyll serve --drafts --livereload --port 14001 --livereload-port 14002
