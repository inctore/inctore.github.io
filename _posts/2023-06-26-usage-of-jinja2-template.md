---
title: jinjaテンプレートの使い方メモ
last_modified_at: 2023-06-26T09:23:47
categories:
  - blog
tags: python jinja
---

たまに使うんだけど毎日使うというほどでもないので使い方を何回も調べている道具シリーズ。jinja2の使い方をメモしておく。

コード(j2.py)

```python
import jinja2 as j2

env = j2.Environment()
temp = env.from_string("Hello {{name}} !!")
print("=====")
print(temp.render(name="World"))

temp2 = env.from_string("""{%- for x in xs -%}
{{x}}
{%- endfor -%}
""")
print("===== temp2")
print(temp2.render(xs=range(10)))

temp3 = env.from_string("""{%- for x in xs %}
{{x}}
{%- endfor -%}
""")
print("===== temp3")
print(temp3.render(xs=range(10)))

temp4 = env.from_string("""{% for x in xs -%}
{{x}}
{%- endfor -%}
""")
print("===== temp4")
print(temp4.render(xs=range(10)))

temp5 = env.from_string("""{%- for x in xs -%}
{{x}}
{% endfor -%}
""")
print("===== temp5")
print(temp5.render(xs=range(10)))

temp6 = env.from_string("""{%- for x in xs -%}
{{x}}
{%- endfor %}
""")
print("===== temp6")
print(temp6.render(xs=range(10)))
```

出力

```shell
$ python j2.py
=====
Hello World !!
===== temp2
0123456789
===== temp3

0
1
2
3
4
5
6
7
8
9
===== temp4
0123456789
===== temp5
0
1
2
3
4
5
6
7
8
9

===== temp6
0123456789
```

`for`, `endfor`を囲んでいる`{% %}`に`-`を付けるか付けないかで、各イテレーションの前後に改行が付くかどうかの挙動が変わる。これは覚える気はない。
