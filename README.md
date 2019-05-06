# 辞典
ググれば幸せになれるこの時代に、私は、辞書を作りたいのです  

## してること
- ChromeExtension (Chrome拡張機能)
- jsonを外部から読み込んでパース
- Sass(SCSS),TypeScriptをgulpでトランスパイル
- Pythonでjsonをならびかえ
- gulpでコマンド実行(Pythonした)  
- TypeScriptでChrome用のオブジェクトを使うために`@types/chrome`を`npm install`した  

## 雑記
- 型が確定していないのに文字列オブジェクト用のメソッド使っちゃう男の人って、、、
- `const readme: HTMLDivElement = document.getElementById('divxample') as HTMLDivElement;`みたいな感じでしなあかん。HTMLElementは。しらんけど
- jsonめんどいからany型にしてる
- Pythonで日本語コメ書くし`# -*- coding: utf-8 -*-`をつけておこうって毎回忘れている

## きもち
この業界は何かしらの解説に専門用語やら英語が多すぎるので  
何回か同じ語をググるのが嫌で  
自分用に見返すために意味をまとめているので  
それをスマホやパソコンからテキストファイルとして閲覧するのもいやで  
なので拡張機能にしていつでもぱっとみれるようにしたかったので  
でも結局辞書は常に全てを網羅しているわけではないので  
結局ググることになるんかい的なことになって二度手間になるのが嫌で  
それならぶらうじんぐででてきた単語はそういう拡張機能をつかえばいいってなるので  
でもググってもわかりやすいかつ業界で一般に使われている意味での解説があるあもわからない世の中で  
登録されてなければ結局ググってもらうことになるので  
すぐググれるようにしたので  
あと単語はどんどん追加していくつもりなので  

## こまり
JSのオブシコ要素が謎でがうまくいかないので最初の設計とは異なってしまいました。  
TSも青いので言語の色が青だらけになる  
gulp(js)での辞書のソートしようとしたんですけど面倒そうなのでぱいそんでとりあえずします  
jsonやからnullとか値に入れてたけどそれで良くなかったりしたから`""`でやります

