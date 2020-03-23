[![license-Apache2.0](https://img.shields.io/badge/license-Apache%202.0-green.svg)](https://opensource.org/licenses/Apache-2.0)
![TypeScript-v3.6.3](https://img.shields.io/badge/TypeScript-v3.6.3-blue)
![Python-v3.7.0](https://img.shields.io/badge/Python-v3.7.0-blue)
[![Maintainability](https://api.codeclimate.com/v1/badges/0aba3d0d85d23bb4b37b/maintainability)](https://codeclimate.com/github/actionpterygii/itKaiwaiJisho/maintainability)

# 辞典(IT Kaiwai Jisho)
[ググれば幸せになれるこの時代に、私は、辞書を作りたいのです](https://actionpterygii.github.io/itKaiwaiJisho/)  

## 仕様
- 文字入力によってリアルタイムで検索できる
- 右下のぐぐるボタンを押すと入力中の文言でぐぐる
  - 文字を選択しているときはそれでぐぐる
- 左下の入力ボタンを押すと入力ボックスにフォーカスする
- 中下のランダムボタンを押すとランダムにいち単語出る
- 各単語内に関連語の設定がものは押すと展開される(無限)

## TODO
- 職種！！！！！！！！！マストでしょ
- allのあとはランダム押してreadmeみえるように戻すとか、ぐぐるからエッジスワイプで戻るとかそいういう説明をもっとさ
- 入力した文字の大きさをエリアに収まるようにする
- php的語追加
  - プログラミング言語(どこまで書くんってなる(おぶし事かも簡易的に書くのか))、のフレームワークとか、サービス、企業(微妙)、ライセンス関連、職種、機械学習とか、usbとか、cvrとか
- `iPhone キーボード 開く HTML`の実装
- アニメーションを各所にね。
  - ちょっとはやったのでまた思い次第
- 似た語リンク(プリ,ビリティ,メント,ション,シー)
- QRコードの出入りがださい
- `例えば`ってのほしい気がしてきたよ
- なんか、ぐぐるURLってのはメインのコードに直書きするものではないようなきが、、、(ほぼ気に入らないだけ)
  ***
- ダクる
- 汎用的に辞書として使えるようにする。今後な。
- 選択解除タップで選択状態にならないような(イベント)処理(むずそう)
- ダブルタップ拡大無効
- きせかえ
  - 伴って、現入力ボタンを「機能」とでもして、そこからきせかえとか入力とかするようにしてはどうか
  - まあこれはいらんか
- Chrome拡張機能をちゃんとする


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
  - iPhoneのSafariからホーム画面に追加するときのアイコン対応が必要でGoogleさんの[pwacompat](https://github.com/GoogleChromeLabs/pwacompat)使用。
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
- `touchstart`イベントで選択文字列を取得しようとしたのですが、その時はでは取得できないようです。逆に、選択解除になるタップでしゅとくとなる。は？
  - `touchend`でしゅとくするとよいでした。
    - しかしそのごにググったあとにまだ保持されており画面上は選択されてないのになあってなるのでぐぐるとき`null`いれとけ
    - でも選択解除になるタップで取得しても一回はそのままやけど許してほしい(そのうちなんとかはしたい)
- `アイピーアドレス`なんぞのアルファベット日本語読みはあんまいややけど場合によっては(その方が使われている場合)いれる。
  - 別名追加はそういう思想的でもある。
  - なんかわりと統一されていない気
    - まあとでで
- `Rebuild.fm`きいてると一気に語が増える。。。多い会は本当にIT関連(?)な知らない英語が多くてはかどってしまう。。。
- バッジつけてみたい
  - 完全に自分の好きなようにの作れるようやけどそれはなんかちゃうくない？
    - なんとなく情報が書いてないもののバージョン出したいけど[Sheils IO](https://shields.io/)にあるやつとかぶったりなんとか
- コードが臭えか見てくれる[CODE CLIMATE](https://codeclimate.com/)を無駄に設置
  - ひまになっらみる
  - AからFらしい[●](https://docs.codeclimate.com/docs/maintainability)
- テスト的なことしたい
  - Travisしたい()
- ライセンスつけようというこころみ
- 単語は日々の生活でどんどん増えていくのに説明の追加をしばらくしていないのでおいつけない。。。
- 単語帳アプリ？
  - カタカナ語アプリ？
    - ほぼ和英辞典のゾーン在るね
      - 英語とこわざはいるのか
- リンクは短縮URLだとリダイレクトでPWAの内部Safari的によくない
- 日本語読みか英語か翻訳かどこにかくか統一するかみたいな
- 単語どこで区切るかとか
- 最後伸ばすとか伸ばさないとか、それよりも大切なことがきっとあるよね
- readmeの単語は押すと単体検索されるようになってる。そりゃね
  - index.htmlでの説明にit語あったらリンクみたいにしてこのアプリで検索して表示させている状態にしています(もちろんinputareaに文字が入っている)
- できることは`CSS Transition` < `CSS Animation` ではないのか？？？
  - 関連語表示をチェックボックスのCSSでしているのですが逆方向処理はこの場合animationはきついのかも？？しれない(すぐにできなかったため)
- 関連語開くことに関してたまに開かない時がある
  - お空区要素が重なってしまっている
  - 開くときに生成されるが閉じても裏でのこっているための可能性
  - 裏にある文字が選択されるときがある模様
  - JSで中身のある関連語ボタンを押したときに中身を消すようにしました！
- 時間待てば消すときのアニメーションも出るだろうと思いましたがたいへんでしたのでほりゅうです
- 下マージンがiOS実機で反映されず
  - ぱでぃんぐならok
- cssのclassから複数要素とって使うところがエラーしていたのでやっとなおしました
  - とってくるオブジェクトはふつうにまわすだけじゃよくない
  - せっかくある`length`つかう
- CSS変数`var(--xxx)`を`:root{}`に書いて一括的な色書き換え
- ダークモードの状態をローカルストレージに保存させて動かさせます
- アルファベットで見慣れてるもののカタカナ表記たまに鬼ダサいけどいける？(`ビュージェイエス`)
- さはりでスムーススクロールが動かないのでぽりひーしました。
- 関連語開くところのインスタンス名が直指定されててキモいのでなんとかした
  - 強引に




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
  - これの型定義はなんかもう辞書は単語の集まりだとたいぎできるようになっていたのか？？もんだいなさそうですけど
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
- classからの複数イベントリスナー付与は`DOMContentLoaded`でHTMLパース後にしないと、それの処理は通るが他ボタン(入力ランダムぐぐる)が発火しなくなった(なんで)
  - コンソールに`Uncaught TypeError: quickSearch_btns[t].addEventListener is not a function at t (script.js:1) at HTMLDocument.<anonymous> (script.js:1)`と出るのですがそれはずっとでてる
    - わかったんだこれの原因。これでclass名からとったそのオブジェクトにはその要素だけが入っているのではなく`length`とかそういう要素も入ってるからね
      - そこまでは回さないようにそのれんぐすをつかってやるのよね
- テンプレートリテラルつかおうとしたけど、HTMLのみやすさ的に入る改行とスペースがいらないのと、なくてもJSのみやすさ的にはそんなに変わらないのでつかいませんでした。
  - しかし入れ込む要素が増えて結局つかいます
- おぶしこのかんじにしました
  - このアプリの状態もくらすで管理させました
    - それは一個の起動につきいっこインスタンスられるかんじで
  - 辞書は辞書のパスによって指定された辞書をとりこんだ`Jisho`というインスタンスと
- Chrome拡張機能んとこが、jishoの型違うのでエラーだしてくるのでとりあえず拡張子tsじゃなくしとく
- 関連語を開くボタンで開くの処理のために文字列でHTMLを作成しまとめて入れ込むのですがその関数がメソッドとなった今文字列で書くにはインスタンス名が必要なのです
  - ネットにあったものとしてはthisと、`window.`内のそれを比較してというのがありましたが型のかんけいでむずそうです。いやだね。
    - いまのところ、いんすたんすめいと同じ名前の文字列を入れてもらってそれをつかうとかかな普通
      - 便宜上？面目を立てて？で、関連語を検索するのは違う`Jisho`インスタンスからでもいいのよってことでそのためのプロパティということ(関連語検索用`Jisho`インスタンス名)でセットしてつかうとまだきれいかな

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
- 何もなしのときぐぐろうっていう(いらんくない)

