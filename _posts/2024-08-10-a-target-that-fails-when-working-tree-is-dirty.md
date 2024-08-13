---
title: gitのworking treeがdirtyだったら失敗するターゲット
last_modified_at: 2024-08-10T07:37:54
categories:
  - blog
tags: Makefile
---

Makefileに以下のようなターゲットを定義しておくと、gitレポジトリのworking treeがdirtyのときに失敗する。

```Makefile
tree-clean:
	@if [ $$(git status -s | wc -l) -ge 1 ]; then echo "Error: local tree is dirty."; false; fi
```

どっかに手動でデプロイするときやDockerイメージを作るときなどに、ローカルに余計なものがなくて当該のコミットをチェックアウトしていれば結果が再現する、ことを担保したいときに使う。
