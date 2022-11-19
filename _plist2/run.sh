#!/bin/bash

echo $(date) "start server"
export LANG=ja_JP.UTF-8


print_usage(){
    echo "run.sh"
}


if [[ $(hostname) = "hotoku-macmini-2020.local" ]]; then
    export PATH=/opt/homebrew/bin:${PATH}
else
    export PATH=/usr/local/bin:${PATH}
fi
eval "$(anyenv init -)"


bundle exec jekyll serve --drafts --livereload --port 4001 --livereload-port 4002
