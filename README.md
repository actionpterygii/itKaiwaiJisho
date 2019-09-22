# 辞典
[ググれば幸せになれるこの時代に、私は、辞書を作りたいのです](https://actionpterygii.github.io/itKaiwaiJisho/)  

## 仕様
- 文字入力によってリアルタイムで検索できる
- すぐぐぐれる機能がある
- ~~URL~~
  - ~~普通にしてればURLはずっといっしょ~~
  - ~~シェアして使えるようにクエリパラメーター付きでURLを持っていける(以下2パターンで)~~
  - ~~クエリパラメーター付きのURLが来たら出す(以下2パターンを)~~
    - ~~単語が入力された結果の画面~~
    - ~~1単語のみ~~
- 単語の解説内の単語は押したらその単語で検索される
  - すべてを検索するのはおもそう
  - 予め解説の文章内に検索すべき単語かどうかの印をつける
    - よさそう
- スマホ的に、左下に入力編集開始ぼたん、右下に
ググるボタンでどうでしょうか
  - エッジスワイプのが邪魔じゃなくて良さそう
    - 内部Safariは右から来るので右端からスワイプでぐぐるとか
    - 下に入力ボックスも考えましたが手で隠れるのが良くない。ボタンもそうじゃん
    - なにも入力されていない画面で説明文するとよさそう


## してること
- docsディレクトリでGitHubPages
- ChromeExtension (Chrome拡張機能)
- jsonを外部から読み込んでパース
- gulp
  - Sass(SCSS),TypeScriptをトランスパイル
  - ソースファイルの諸々の変更を監視して自動で変換(更新)
  - ローカルサーバーで公開用HTMLを見続ける(ファイルの更新があればリロード)
  - gulpでコマンド実行(Pythonした)
- Pythonでjsonをならびかえ
- TypeScriptでChrome用のオブジェクトを使うために`@types/chrome`を`npm install`した  

## 雑記
- 型が確定していないのに文字列オブジェクト用のメソッド使っちゃうこともあったけど、わたしはげんきです(今はTypeScriptを使っているため)
- `const readme: HTMLDivElement = document.getElementById('divxample') as HTMLDivElement;`みたいな感じでしなあかん。HTMLElementは。しらんけど
- ~~jsonめんどいからany型にしてる~~
- `var 変数 = {};`に型指定するとおこられてよくわからんし、そもそも`{}`は型指定に近い意味でだったので初期化なしの型あり宣言でよいよね
  - jisho全体(複数の単語)：`let jisho: [{[key: string]: string;}];`
  - 単語一つ：`let tango: {[key: string]: string;};`
  - とみせかけて返す辞書を先に定義するとこは配列内のオブジェクトでkeyが数字でundefined propertyるのでany
  - asでいけたかも
- jsonやからnullとか値に入れてたけどそれで良くなかったりしたから`""`でやります
- gulp(js)での辞書のソートしようとしたんですけど面倒そうなのでぱいそんでとりあえずします 
- Pythonで日本語コメ書くし`# -*- coding: utf-8 -*-`をつけておこうって毎回忘れている
- TSも青いので言語の色が青だらけになる
- オブシコわざわざやらんでええがな
- Python、実行する`.py`について違うディレクトリにあるものを指定して実行してもディレクトリの指定とかカレントディレクトリで処られる
- ディレクトリの大文字小文字変更はpushしてもいかなかったのですかもね
- JSONをよみこむのがめんどくさいのか、JSONのよみこみにきびしすぎるのか、JSがさいしょからもっとがんばってほしかったのか
- 今の書き方で、GitHubPagesに上げてるやつはJSON読み込みできるけど、ローカルでは読めない。それはChromeが悪い。
  - ローカル環境で、確認していたくて、`gulp-webserver`はじめました
  - それだといける。うれしいね。
  - `watch`とあわせてデザイン()修正の際もやっぱ楽で良いです。
- アルファベットの読み方はみんなわかっているとおもいますねん
- (英語辞書ではありません)
- `RegExp`の`exec`が`RegExpExecArray | null`なようで、`any`
- VisualStudioCodeは`ブロック スコープの変数 'xxx' を再宣言することはできません。 'xxx' was also declared here.`とかいうけどぜんぜん普通に行けるし知らんわ
- CSSアニメーションの関係か、メディアクエリで指定している前の`width`がでたりしたのでよくわからないガチガチ指定で矯正かなしいね
- 新しいgulpのモジュール追加したからなんかで`Error: Cannot find module 'typescript'`とか言われて意味わからんけど`npm install typescript`で解決しましたね
- gulpに監視されるのを終わらせるのに`control + Z`はよくない`control + C`にしよう
- URL書き換え
  - `pushState()`(履歴に追加する)
  - `replaceState()`(履歴を上書く)
- iOSで一単語検索がうまくいかない(正しい`inputValue`で検索しに行ってるはずだがないものでけんさくしにいってる)きしょい
  - 一回アクセスしたURLはiOSではもう一回アクセスするとjishoが読み込めない(キャッシュ？)
  - もはやこの機能いる？シェアはスクショでよくね(できなさすぎてめんどくさいさがる)
- スマホのシェアはスクショでいいし軽いサイト[要出典]なので入力すればよい。URLのコピーは一番シェアの高いであろうiOS(Safari)で許可されていないのでリンク誤爆のほうが嫌<-
- masterブランチで開発し、仕様変更で分かれるときにバックアップ的にブランチを分けるすたいる
- PWA対応
  - Googleのやつみて
  - `setServiceWorker.js`の`urlsToCache`の`'/'`がいらんかった(?)それがあると`Uncaught (in promise) TypeError: Request failed`
  - iPhoneのSafariからホーム画面に追加するときのアイコン対応が必要でGoogleさんのpwacompat使用。
  - https://gist.github.com/kenmori/6386569551cfad900bc7385b72339626
    - やってるけどよくわからん
  - 確認の為に逐一GitHubに上げなあかんので草が濃くなってしまうため他が相対的に下がったりとかあるんやね
  - iOSで他のWebページに遷移して戻るの体験がすてきでした
  - Chromeのアドレスバーにインストールのための`+`ボタンがみえたときはうれしかったです(パソコンではつかわんけど)
  - よりネイティブアプリ感の出るスプラッシュ画面あつい
- Adobe死んだからPSDいじれんねんけど折角のアイコンやのに
- PWA的にはURLコピーとかいらんかったよねやっぱ
- 急にスマホ版(スマホのPWA)とChromeのデベロッパもーそスマホモードが死に始めた
  - 実は前から死んでたけどキャッシュでなってた説
  - キャッシュ糞
  - そもそもなんかスマホでピンチすらできん(は？)
  - スワイプのが悪かったですおわり。はい。

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
