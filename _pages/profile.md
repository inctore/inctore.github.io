---
permalink: /profile/
title: "Profile"
author_profile: false
---

<figure >
    <img
        style="border-radius: 50%; max-width: 200px"
        src="/assets/images/bio-photo.png" alt="face of author">
</figure>

<div style="font-size: 3rem">
堀越保徳
</div>

## サマリ

数学とプログラミングを愛する統計屋さんです。

キャリアの初期から、統計を始めとする応用数学の知見を社会の価値に結びつけるためには高度なプログラミングが必要と認識し、研鑽を積んできました。
大学で学んだ応用数学の理論的なバックボーンに加えて、現実のビジネスで培ってきたソフトウェア開発と運用の知見を持っています。

プロとして誠実にシビアに品質を追求する一方で、人として日々の生活の楽しさ・安らぎを忘れずに過ごせる、そういう仕事人生が理想です。

## スキル

### 数理統計学 / 金融工学 / Data Science

数理統計学の研究室で確率論に関する論文を書き修士号を取得しました[^1]。

卒業後は証券会社に就職し、債券トレーディング部門にクオンツとして配属され、金利モデルを始めとしたデリバティブプライシングのための金融工学をみっちり学んでいます。
クオンツとして6年働いたあとにWEBマーケティング業界に転職し、データサイエンティストとして様々な施策に携わりました[^8]。

### Phthon

私が最も得意とするプログラミング言語です。

型アノテーションを利用して、保守性の高いプログラムを書くことができます。また、必要な場合にはメタプログラミングを活用して効率性の高いライブラリを開発することも可能です[^2] [^3]。

これまでに個人プロジェクトや一部の業務で開発したもののうち、一部はパッケージとして公開しています[^4]。

### Data Engineering

HadoopやSparkといった分散処理基盤の上で、レコメンデーションなどの機械学習アルゴリズムを実装できます[^5]。

Luigi / Airflow / Prefectなどのワークフローエンジンを用いてデータの連携・変換や機械学習エンジンを動かすデータパイプラインを構築するプロジェクトに複数従事しました。

BigQueryを利用したデータ処理には長く携わっており、SQLでクエリを開発する以上の高度な仕事ができます。クエリの依存関係の自動解析[^6]や、JavaScript/TypeScriptを利用して通常のSQLでは記述が不可能な複雑な処理をを行うUDFを実装するなど[^7]。

### その他

- R: 2003年頃〜2010年頃までは、統計解析には主にRを用いていました。多変量回帰分析や、状態空間モデルによる時系列解析などを業務で利用した経験があります。
- C++: 証券会社でクオンツとして、エキゾチックデリバティブのプライシングや、金利モデルのキャリブレーションのための社内ライブラリを開発・メンテナンスしていました。IBM Platform SymphonyというHPCフレームワークを用いて、粒子フィルタによる非線形状態空間モデルのデータ同化プログラムを開発した経験があります。

## 職歴
- 2021 - 2022: [株式会社JDSC](https://jdsc.ai/)
- 2019 - 2021: [株式会社Datawise](https://www.datawise.co.jp/)
- 2013 - 2019: [株式会社リクルートテクノロジーズ](https://www.recruit.co.jp/) 現在は組織再編により株式会社リクルート
- 2007 - 2013: [株式会社みずほ証券](https://www.mizuho-sc.com/index.html)

## 学歴
- 2007: 東京大学大学院情報理工学系研究科数理情報学専攻修士課程終了
- 2005: 東京大学工学部計数工学科数理コース卒業
- 2000: 千葉県立東葛飾高等学校卒業

[^1]: 修士論文: [Y. Horikoshi and A. Takemura. Implications of contrarian and one-sided strategies for the fair-coin game.]((https://www.sciencedirect.com/science/article/pii/S0304414907002013))  Stochastic Processes and their Applications. Volume 118, Issue 11, November 2008, Pages 2125-2142

[^2]: メタプログラミングによってBigQueryのスキーマ情報から自動的にクラスを作るパッケージについての解説記事: [Automatically Generate Type information from BigQuery schema](https://medium.com/towardsdev/automatically-generate-type-information-from-bigquery-schema-4beaa53d8d3d)

[^3]: 上記パッケージで利用しているテクニックについての解説記事: [Checking types and column names of a data frame with the schema information for BigQuery](https://medium.com/towardsdev/checking-types-and-column-names-of-a-data-frame-with-the-schema-information-for-bigquery-84382b2b57ff)

[^4]: PyPi上でのプロフィール情報: [hotoku@pypi](https://pypi.org/user/hotoku/)

[^5]: 当時のプロジェクトでの知見を入門書に寄稿したもの: [初めてのSpark](https://www.oreilly.co.jp/books/9784873117348/)

[^6]: クエリの依存関係を自動的に決定し、適切な順番で自動実行するコマンド: [bqrun](https://pypi.org/project/bqrun/)

[^7]: BigQueryのUDFをTypeScriptで各方法を解説した記事: [1](https://qiita.com/hotoku/items/73a1cc037ecd588042ec) [2](https://qiita.com/hotoku/items/4d666c704a25ea9850cd) [3](https://qiita.com/hotoku/items/f9754501021bda169b50)

[^8]: リクルート時代のインタビュー記事: [リクルートのデータ分析を担う社員が語る、「修羅場に立ち向かった入社したての自分」と「今の自分」 ](https://logmi.jp/business/articles/134751)
