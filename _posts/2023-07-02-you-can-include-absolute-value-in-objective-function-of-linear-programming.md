---
title: 線型計画では、目的関数に絶対値を含めることができる
last_modified_at: 2023-07-03T01:03:54
categories:
  - blog
tags: math
---

線型計画(Linear Programming, LP)では、目的関数に絶対値を含めることができるということを知った。面白いトリックなのでメモしておく。[参考文献][text]

次のような最適化問題を考える。

minimize <br>
<span style="width: 3em; display:inline-block" />$$c'\boldsymbol{x} + |x_1|$$ <br>
subject to <br>
<span style="width: 3em; display:inline-block" />$$A\boldsymbol{x} \ge 0$$

ただし、$$\boldsymbol{x} = (x_1, x_2, \ldots, x_n)$$で、$$c, A$$は適当なサイズのベクトルと行列とする。

目的関数に絶対値が入っており、一見LPでは解けないと思う・・が、実はLPで解けますよというのがこの稿の主題である。

## 都合のよい問題のすり替え

天下りであるが、上の問題の代わりに、以下のような問題を考える。これを解けば、上の問題の解が手に入るということを以下で説明する。

minimize <br>
<span style="width: 3em; display:inline-block" />$$c'\boldsymbol{x} + y + z$$ <br>
subject to <br>
<span style="width: 3em; display:inline-block" />$$A\boldsymbol{x} \ge 0$$ <br>
<span style="width: 3em; display:inline-block" />$$ x_1 = y - z $$ <br>
<span style="width: 3em; display:inline-block" />$$ y \ge 0 $$ <br>
<span style="width: 3em; display:inline-block" />$$ z \ge 0 $$ <br>

## お気持ちの表明

突如として導入された $$y, z$$は、$$x_1$$の正の部分と負の部分を表している。つまり、

$$ y = x_1\ \mathrm{if}\ x_1 \ge 0\ \mathrm{else}\ 0 $$

$$ z = -x_1\ \mathrm{if}\ x_1 \le 0\ \mathrm{else}\ 0 $$

という関係が成り立つことを期待している。

$$y,z$$が$$x_1$$の非線形な関数になっていてやっぱりLPの範疇を超えそうに見えるのだが、$$y,z$$は定義より非負であって、LPの中では変数の非負制約で処理することができる。

上記の関係を前提にすると、以下のことが成り立つ。

$$ |x_1| = y + z $$

$$ x_1 = y - z $$

上の関係によって、目的関数の絶対値の部分が置き換えられている。また、後者の関係式は追加の制約にあらわれている。

## 解の性質

書き換えた問題の解を $$ \boldsymbol{x}^{*}, y^{*}, z^{*} $$とする。このとき $$y^{*}, z^{*} $$のどちらか一方は、必ず0になる。
なぜなら、$$y^{*}, z^{*}$$の両方が真に0より大きい場合、$$y,z$$の両方を同じ量だけ少し小さくすれば、制約を満たしながら目的関数をより小さくできるからである。

したがって、書き換えた問題は $$y = 0\ \mathrm{or}\ z=0$$の範囲で考えて良い。

問題の制約と、この追加の性質を満たした範囲で考えると、前節「お気持ちの表明」内で提示した関係式はすべて満たされている。これによって、書き換えた問題は元の問題と等価であることが分かる。

## 最後に

上の例は、特定の1つの変数の絶対値が目的関数に含まれている場合であった。実際は、変数の線形結合の絶対値を、任意の個数だけ目的関数に含めることができる。

<!-- link -->
[text]: https://www.amazon.co.jp/gp/product/3540306978/
