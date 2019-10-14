# 辞典
[ググれば幸せになれるこの時代に、私は、辞書を作りたいのです](https://actionpterygii.github.io/itKaiwaiJisho/)  

## 仕様
- 文字入力によってリアルタイムで検索できる
- 右下のぐぐるボタンを押すと入力中の文言でぐぐる
- 左下の入力ボタンを押すと入力ボックスにフォーカスする
- 各単語内に関連語の設定がものは押すと展開される(無限)

## TODO
- php的語追加
- 関連語追加
- 選択ぐぐり
- ぐぐりについてのりーどみー
- ダクる
- 別名


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
- PWA

## 雑記
- jsonやからnullとか値に入れてたけどそれで良くなかったりしたから`""`でやります
- gulp(js)での辞書のソートしようとしたんですけど面倒そうなのでぱいそんでとりあえずします 
- Pythonで日本語コメ書くし`# -*- coding: utf-8 -*-`をつけておこうって毎回忘れている
- Python、実行する`.py`について違うディレクトリにあるものを指定して実行してもディレクトリの指定とかカレントディレクトリで処られる
- ディレクトリの大文字小文字変更はpushしてもいかなかったのですかもね
- JSONをよみこむのがめんどくさいのか、JSONのよみこみにきびしすぎるのか、JSがさいしょからもっとがんばってほしかったのか
- 今の書き方で、GitHubPagesに上げてるやつはJSON読み込みできるけど、ローカルでは読めない。それはChromeが悪い。
  - ローカル環境で、確認していたくて、`gulp-webserver`はじめました
  - それだといける。うれしいね。
  - `watch`とあわせてデザイン()修正の際もやっぱ楽で良いです。
- アルファベットの読み方はみんなわかっているとおもいますねん
- (英語辞書ではありません)
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
  - XDでちょっとしたシェイプでロゴ作れるぐらいはできて嬉しいな
    - PSDも読み込めたしね
- PWA的にはURLコピーとかいらんかったよねやっぱ
- 急にスマホ版(スマホのPWA)とChromeのデベロッパもーそスマホモードが死に始めた
  - 実は前から死んでたけどキャッシュでなってた説
  - キャッシュ糞
  - そもそもなんかスマホでピンチすらできん(は？)
  - スワイプのが悪かったですおわり。はい。
- `preventDefault()`たっちいべんと動作取るときにスクロールしなくしてくれる(今回はいらん)
- iOSのSafariではポップアップブロック機能のおかげでフリックでの`window.open`とかは許されない
  - 設定で解除(もうすでに億劫)しても警告は出る
  - 流れるようなぐぐりからの戻りをしたかったですけどボタン用意するしかなさそうです、、、
- 内容、「PHP」みたいな固有名詞みたいなんは避けてたんですけどやっぱあったほうが良いなと思ってきてみたり(多くなるな)
- 内容、基本的に生活の中で見たり聞いたりするIT界隈語をメモって調べて追加しているのですが自分から新たな語を調べにいってもいいなと思ってきてみたり
- 単語の解説内の単語の解説のことを考えるとどんどん増えていきそう
  - 対義語のような表示では多すぎる気がするので＆解説内単語が出ていなくても見せたかったり。
    - 1単語にアコーディオンで開く領域を作る
    - そこに`対義語`,`解説内にある語`,`関連語`(Webブラウザの説明ならその一例等とか)の単語をまとめて見れるようにするとか
    - そうであれあネストにしていきたい。見た目良し。
    - どんどんネストできるようにしたいため、そのままお処理させると無限ループなためアコ開いたときに検索する(JSの処理)がよさそうね
- 無限ネストおじさん機能がわりと素直にじっそうできた
  - どんな動き家はイメージあったしそらそうやけど
  - さすがにだんだん読めるもんじゃなくなる
    - これはこれでいいのかどうか要検討っちゃ要検討
- `gulp start`でローカルサーバーで常に監視してやってるときにJSの変更が反映されていないきがしますぞ！！(PWA的キャッシュがわるいのかなあ)(一回終わらして直`gulp`!!)

### TypeScript
- 型が確定していないのに文字列オブジェクト用のメソッド使っちゃうこともあったけど、わたしはげんきです(今はTypeScriptを使っているため)
- `const readme: HTMLDivElement = document.getElementById('divxample') as HTMLDivElement;`みたいな感じでしなあかん。HTMLElementは。しらんけど
- TSも青いので言語の色が青だらけになる
- ~~jsonめんどいからany型にしてる~~
- `var 変数 = {};`に型指定するとおこられてよくわからんし、そもそも`{}`は型指定に近い意味でだったので初期化なしの型あり宣言でよいよね
  - jisho全体(複数の単語)：`let jisho: [{[key: string]: string;}];`
  - 単語一つ：`let tango: {[key: string]: string;};`
  - とみせかけて返す辞書を先に定義するとこは配列内のオブジェクトでkeyが数字でundefined propertyるのでany
  - asでいけたかも
- 変数名はスネークケースにして見やすくしようと考えました。
- `RegExp`の`exec`が`RegExpExecArray | null`なようで、`any`
  - は？なにこれ
- onclickとかは上書きで消されるらしいです。良くないことあるかもしれないので(かぶる処理出て困るとか)、`addEventListener`にしました。
- 同じ内容のループを2つの条件でそれぞれ書くのが良くないと言う思想で、ループ内で分割していたが、ループの中で判定を毎回行っていたり無駄な変数を一度は生成していたりなど無駄が多かったため変更。
- 即時関数を使うことで処理をブロックでまとめてわかりやすくなるし、スコープももたせれるのでお世話になってます。
- 自分が作成した変数名が言語的に予め定義されているるのとかぶるため`ブロック スコープの変数 'xxx' を再宣言することはできません。ts(2451)`,`'xxx' was also declared here.`が出ていたようです。
- `null`でないと自信があるので`!`(エクスクラメーション/感嘆符/びっくりマーク)を使ってしまいました。
  - `null`可能性を否定するので厳密にはよくなさそう
  - https://code-examples.net/ja/q/267b123

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


## 墓場
- 単語の解説内の単語は押したらその単語で検索される
  - すべてを検索するのはおもそう
  - 予め解説の文章内に検索すべき単語かどうかの印をつける
    - よさそう
- URL
  - 普通にしてればURLはずっといっしょ
  - シェアして使えるようにクエリパラメーター付きでURLを持っていける(以下2パターンで)
  - クエリパラメーター付きのURLが来たら出す(以下2パターンを)
    - 単語が入力された結果の画面
    - 1単語のみ
- スマホ的に、左下に入力編集開始ぼたん、右下にググるボタンでどうでしょうか
  - 下に入力ボックスも考えましたが手で隠れるのが良くない。ボタンもそうじゃん
  - なにも入力されていない画面で説明文するとよさそう
  - ぐぐるとか、ばたんよりエッジスワイプのが邪魔じゃなくて良さそう
    - 内部Safariは右から来るので右端からスワイプでぐぐるとか
