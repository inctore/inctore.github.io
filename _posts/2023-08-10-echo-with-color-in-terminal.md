---
title: ターミナルで色を変えてechoする
last_modified_at: 2023-08-10T08:52:02
categories:
  - blog
tags: shell unix
---

color.zsh

``` zsh
cecho(){
    typeset message=${1}
    typeset color=${2:-red}

    typeset -A colors

    colors[red]="\033[31m"
    colors[green]="\033[32m"
    colors[yellow]="\033[33m"
    colors[blue]="\033[34m"
    colors[purple]="\033[35m"
    colors[cyan]="\033[36m"
    colors[white]="\033[37m"

    typeset begin=${colors[$color]}
    typeset end="\033[0m"

    echo -e "${begin}${message}${end}"
}

cecho default
cecho "red" red
cecho "blue" blue
```

出力。表示の都合上、全部同じ色だけど、ターミナルでは、`default`,`red`は赤で表示され、`blue`は青で表示される。

```shell
$ ./color.zsh
default
red
blue
```
