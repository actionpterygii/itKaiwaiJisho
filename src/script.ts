
// Copyright 2021 actionpterygii

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.




////////////////////
// 型
////////////////////

// 単語の型
type Tango = {[key: string]: string;};
// 辞書の型(単語の配列)
type JishoData = [Tango];
// HTMLとしての文字列
type HTMLString = string;
// なんかこれやらんとつかえんのですわ
// これはここでは認識にないため
interface HTMLButtonElement {checked: boolean};



////////////////////
// クラス
////////////////////

// 状態という
class State
{
    // newされたときに(ダークモードボタンの参照,スタイルシート)を受け取って
    constructor(input_area: HTMLInputElement, darkMode_btn: HTMLButtonElement, style_sheet: CSSStyleDeclaration)
    {
        // 各要素を私が受け持つことにします
        this.input_area = input_area;
        this.darkMode_btn = darkMode_btn;
        this.style_sheet = style_sheet;
        // ダークモードに関する処理
        // ダークモード情報なければ
        if (localStorage.getItem('darkMode') === null)
        {
            // ダークモードだよっておぼえさせるの
            // 最初からダークモードにしちゃうの
            localStorage.setItem('darkMode', 'true');
        }
        // ローカルストレージがダークモードだと言っているののあら
        if (localStorage.getItem('darkMode') === 'true')
        {
            // ダークモードトグルボタンをチェックした状態にしちゃいましょう
            this.darkMode_btn.checked = true;
            // ダークモードにさせる各種処理
            this.changeDarkMode();
        }
    }

    // 触るインプットエリア
    public input_area!: HTMLInputElement;
    // 触るダークモードボタン
    protected darkMode_btn!: HTMLButtonElement;
    public get _darkMode_btn(): HTMLButtonElement {return this.darkMode_btn}
    // 触るスタイルシート
    protected style_sheet!: CSSStyleDeclaration;
    // 選択されている文字
    public selected_text: string | null = null;

    // 今のダークモード状態によってダークモード状態を変えて状態を記憶させる処理もします
    public changeDarkMode()
    {
        // ダークモードボタンがチェックされている/ONになっている/右にあるなら、
        // ダークモードになっていない状態から動かしたということなので
        if (this.darkMode_btn.checked)
        {
            // ダークモードになるように書き換える
            // cssの`:root`にある記述を書き換える系
            this.style_sheet.setProperty('--text', white);
            this.style_sheet.setProperty('--background', black);
            // ローカルストレージに今はダークモードだよって保存
            localStorage.setItem('darkMode', 'true');
        }
        // 逆は
        else
        {
            // シャイニングモードになるように書き換える
            this.style_sheet.setProperty('--text', black);
            this.style_sheet.setProperty('--background', white);
            // ローカルストレージに今はダークモードじゃないよって保存
            localStorage.setItem('darkMode', 'false');
        }
    }
}

// 辞書という
class Jisho
{
    // ひらがなをカナカナに変換するための
    protected static hiraToKata(text: string): string
    {
        // ひらがなをおきかえるよって
        return text.replace(/[\u3041-\u3096]/g, function(text: string)
        {
            // 文字コード的にずらしてカタカナにする
            return String.fromCharCode(text.charCodeAt(0) + 0x60);
        });
    }

    // 全角英数を半角英数に変換するための
    protected static zenToHan(text: string): string
    {
        //全角英数置き換えるよって
        return text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(text: string)
        {
            //　文字コード的にずらして半角にする
            return String.fromCharCode(text.charCodeAt(0) - 65248);
        });
    }

    // newされたときに(辞書データへのパス,関連語で開く際の辞書インスタンス名)を受け取って
    constructor(jisho_data_path: string, krngJisho_instance_name: string)
    {
        // this保持のため
        const _this: Jisho = this;
        // パスからよむよ辞書データ
        const my_xhr: XMLHttpRequest = new XMLHttpRequest();
        my_xhr.overrideMimeType("application/json");
        my_xhr.open('GET', jisho_data_path, true);
        my_xhr.onreadystatechange = function()
        {
            if (my_xhr.readyState == XMLHttpRequest.DONE && my_xhr.status == 200)
            {
                // 辞書せっと
                _this.jisho_data = JSON.parse(my_xhr.responseText || 'null');
                // 単語数せっと
                _this.tango_quantity = Object.keys(_this.jisho_data).length;
            }
        };
        my_xhr.send();
        // 関連語で呼ばれるJishoクラスのインスタンスの名前をセット。
        // 基本同じやつ(このインスタンス自身)なんですが、(というか今回はそうですし)
        // 後にインスタンスからメソッドを呼び出す処理を書いたHTMLを文字列で生成する関係上
        // このインスタンスの名前を取るのはかんたんにはいかないようで
        // もうこうしたほうがよいなと
        this.krngJisho_instance_name = krngJisho_instance_name;
    }

    // 一単語にある項目の中で調べるときにみにいくべきもの(対義語と関連語以外ね)
    protected readonly word_items: string[] = ['kotb', 'eigo', 'kwsk', 'btmi', 'mnim'];
    // 辞書のデータ
    protected jisho_data!: JishoData;
    // 辞書のデータにある単語の数
    protected tango_quantity!: number;
    public get _tango_quantity(): number {return this.tango_quantity}
    // 関連語を開く時に呼ぶJishoインスタンスの名前
    protected krngJisho_instance_name!: string;
    // ランダムのときに最後に出した言葉
    protected last_random_word: string = '';
    public get _last_random_word(): string {return this.last_random_word}

    // itemの内容がinput_textのなかにあればtrueるなければfalseる。exact_matchは完全一致検索かどうか
    protected containing(item: string, input_text: string, exact_match: boolean): boolean
    {
        // スペースを削除する
        item = item.replace(/\s+/g, '');
        // アルファベットは小文字する
        item = item.toLowerCase();
        // アルファベットは小文字する
        input_text = input_text.toLowerCase();
        // 完全一致検索でしたら
        if (exact_match)
        {
            // input_textの文字がitemと同じならおっけ
            if (item === input_text)
            {
                return true;
            }
            // ない場合
            else
            {
                return false;
            }
        }
        // 完全一致検索じゃなかったら
        else
        {
            // input_textの文字がitem内にあるか(じつはひらがな→ひらがな検索のためだけにある気)
            if (item.match(input_text))
            {
                return true;
            }
            // ひらがなをカタカナにして確認
            else if (item.match(Jisho.hiraToKata(input_text)))
            {
                return true;
            }
            // 全角英数を半角英数にして確認
            else if (item.match(Jisho.zenToHan(input_text)))
            {
                return true;
            }
            // ない場合
            else
            {
                return false;
            }
        }
    }

    // 入力された値を辞書jsonから検索してマッチしたものを返す。exact_matchは完全一致検索かどうか
    protected search(input_text: string, exact_match: boolean): JishoData
    {
        // '--all'と入力された場合
        if (input_text === '--all')
        {
            // 辞書jsonのすべてを返す
            return this.jisho_data;
        }
        // 普通の入力の場合
        else
        {
            // 完全一致検索でしたら
            if (exact_match)
            {
                // kotbのみで探す
                const item: string = this.word_items[0];
                // 辞書jsonを最初から見ていく。keyには辞書jsonで何遍目の単語かがはいる
                for (const key in this.jisho_data)
                {
                    // 入力した内容があるか(完全一致検索)
                    if (this.containing(this.jisho_data[key][item], input_text, exact_match))
                    {
                        // その単語返す
                        // 辞書データ形式で返すので配列に入れるの
                        return [this.jisho_data[key]];
                    }
                }
            }
            // 完全一致検索じゃなかったら
            else
            {
                // 最終的に返すことになる単語要素
                let required_elements: JishoData = {} as JishoData;
                // 最終的に返すことになる単語要素の連番つけるための
                let i: number = 0;
                // 辞書jsonを最初から見ていく。keyには辞書jsonで何遍目の単語かがはいる
                for (const key in this.jisho_data)
                {
                    // 一単語に対して、先に定義してあるword_itemsの要素ぶん回す。
                    for (const item_key in this.word_items)
                    {
                        // 単語の中の一つの項目のキー
                        const item: string = this.word_items[item_key];
                        // 入力した内容があるか(あてはまるもの全部検索)
                        if (this.containing(this.jisho_data[key][item], input_text, exact_match))
                        {
                            // 必要な単語ということで追加する
                            required_elements[i] = this.jisho_data[key];
                            // 単語が追加されたので増やす
                            i++;
                            // 追加したらその単語に用はないのでこのforループを抜ける
                            // これがないと単語内で入力文字が複数項目である場合に重複する
                            break;
                        }
                    }
                }
                // 辞書jsonから必要な部分が選ばれたものを返す
                return required_elements;
            }
        }
        // 中身が空のjisho要素を返します。関数的にそうでないとおかしいっていわれます。が、ここに来ることは普通ないでしょう？？()
        return [{"":""}];
    }

    // 1単語の情報からHTMLを作成
    protected generateHTML(element: Tango): HTMLString
    {
        // 一単語をつつむおおいなるdiv要素(これに追加していって最後返す)
        let html: HTMLString = `<div class="tango">`;
        // 単語内の各要素を一つづつみていく
        for (const key in element)
        {
            // 内容が空でなかったら
            if (element[key] !== '')
            {
                // 単語内の各要素の種類に応じて内容を含めたHTML要素をつくる
                // そのkeyはclassになんねん
                switch (key)
                {
                    // 言葉はh2要素。絶対ある前提
                    case 'kotb':
                        html +=
                            `<div class="tango_head">` +
                                `<h2 class="${key}">${element[key]}</h2>`;
                        break;
                    // 絶対ある前提
                    case 'kwsk':
                        html +=
                            `</div>` +
                            `<p class="${key}">${element[key]}</p>`;
                    break;
                    // だいたいp要素
                    case 'eigo':
                    case 'btmi':
                    case 'mnim':
                    case 'tigg':
                        html +=
                            `<p class="${key}">${element[key]}</p>`;
                        break;
                    // 関連語はアコーディオンに
                    case 'krng':
                        // 関連語アコーディオンの処理のためのランダムな文字列を作る
                        const random_id: string = 'random_' + Math.random().toString(32).substring(2);
                        html +=
                            `<div class="${key}">` +
                            // ここだめ、はやくしゅうしゅうせいしよう
                                `<label class="krng_facade" for="${random_id}" value="${element[key]}" onClick="${this.krngJisho_instance_name}.createKanrengo(this)"></label>` +
                                `<input id="${random_id}" class="krng_checkbox" type="checkbox">` +
                                `<div class="krng_contents"></div>` +
                            `</div>`;
                        break;
                    default:
                        break;
                }
            }
        }
        // 最後の綴じdiv
        html += `</div>`;
        // かえす
        return html;
    }

    // 入力から結果(HTML)を返す
    public createResult(input_text: string): HTMLString
    {
        // 最後かえす文字列
        let entity: HTMLString = '';
        // スペース文字を削除
        input_text = input_text.replace(/\s+/g, '');
        // 必要な要素を選定する
        const required_elements: JishoData = this.search(input_text, false);
        // 返すべき結果があれば
        if (Object.keys(required_elements).length)
        {
            // 選定した要素から一つづついじる
            for (const key in required_elements)
            {
                // HTMLを作成して追加していく
                entity += this.generateHTML(required_elements[key]);
            }
        }
        // なければ
        else
        {
            // ないって情報を用意
            entity += `<h2 class="nothing">nothing</h2>`;
        }
        // かえす
        return entity;
    }

    // 入力から完全一致の結果(HTML)を返す
    // 今の所、これは検索対象が絶対ある前提でやります
    // なぜならそういう使い方しか今はしていないからです
    public createExactResult(input_text: string): HTMLString
    {
        // search関数でその単語を完全一致検索で探してきてそれでHTMLつくる
        // [0]指定なのは、search関数は複数個対応の単語の配列(jisho型)を返すため。
        // 完全一致検索なため0番目の要素のみある。
        return this.generateHTML(this.search(input_text, true)[0]);
    }

    // ランダムに一単語を取得した結果(HTML)を返す
    public createRandomOneTangoResult(): HTMLString
    {
        // 単語の数内でランダムにただひとつの番号を得ました
        const random_num: number = Math.floor(Math.random() * this.tango_quantity);
        // ランダム番号からいち単語取得
        const random_tango: Tango = this.jisho_data[random_num];
        // 単語のタイトル(?)'kotb'を格納(別のとこで使うため)
        this.last_random_word = random_tango[this.word_items[0]];
        // HTMLにして返す
        return this.generateHTML(random_tango);
    }

    // 関連語を開くボタンがおされたら呼ばれる関数
    public createKanrengo(krng_facade: HTMLLabelElement)
    {
        // 押された開くボタンで開く要素(それは次の次にある要素)
        const krng_contents: Element = krng_facade!.nextElementSibling!.nextElementSibling!;
        // 押されたボタンで必要なの単語を取り出し1つずつ配列に入れる
        const tangos: string[] = krng_facade!.getAttribute('value')!.split(',');
        // 関連語の内容(HTML)がすでに一回ここで生成されていれば空を返させるので
        // (関連語HTML自体のありなしもここでしているということ！)
        let entity: HTMLString = '';
        // 関連語の内容(HTML)がなければ
        if (!krng_contents.innerHTML)
        {
            // 単語たちをひとつずつ触っていく
            for (const key in tangos)
            {
                // でそのひと単語の情報からHTMLを作成して追加していく
                entity += this.createExactResult(tangos[key]);
            }
        }
        // 設置
        // (描画(目に見えて)はCSSで行う)
        krng_contents.innerHTML = entity;
    }
}

// お星様
class Hoshi
{
    // スターエレメントパス
    protected static readonly hoshiPath_normal: string = 'images/hoshixxx.svg';
    protected static readonly hoshiPath_rare: string = 'images/hoshixxx_a1.svg';
    protected static readonly hoshiPath_superRare1: string = 'images/hoshixxx_a2.svg';
    protected static readonly hoshiPath_superRare2: string = 'images/hoshixxx_a3.svg';
    protected static readonly hoshiPath_superRare3: string = 'images/hoshixxx_a4.svg';

    // 受け取ったパスの画像によるimg要素をつくる
    public static createImageElement(image_path: string): HTMLImageElement
    {
        // img要素を生成
        const imageElement: HTMLImageElement = document.createElement('img');
        // class指定
        imageElement.classList.add('hoshi');
        // 画像のパスを指定
        imageElement.setAttribute('src', image_path);
        // かえす
        return imageElement;
    }

    // newされたときにする
    constructor()
    {
        // 0~99のランダム数字生成
        const random_num: number = Math.floor(Math.random() * 100);
        // 数字によって星イメージ生成しをインスタンスに設定
        // 各星エレメントを予め生成して保持せずここでしているのは参照渡しになると個々に動かせず困るため
        this.element = Hoshi.createImageElement((function()
        {
            if (random_num === 99)
            {
                return Hoshi.hoshiPath_superRare1;
            }
            else if (random_num === 98)
            {
                return Hoshi.hoshiPath_superRare2;
            }
            else if (random_num === 97)
            {
                return Hoshi.hoshiPath_superRare3;
            }
            else if (random_num >= 70)
            {
                return Hoshi.hoshiPath_rare;
            }
            else
            {
                return Hoshi.hoshiPath_normal;
            }
        })());
    }

    // インスタンスのスターエレメント
    protected element!: HTMLImageElement;
    public get _element(): HTMLImageElement {return this.element}
}



////////////////////
// 定数
////////////////////

// HTML要素
const all_area: HTMLDivElement = document.getElementById('wrap') as HTMLDivElement;
const result_area: HTMLDivElement = document.getElementById('result_area') as HTMLDivElement;
const quickSearch_btns: HTMLCollection = document.getElementsByClassName('quickSearch_btn') as HTMLCollection;
const tangoSu_area: HTMLSpanElement = document.getElementById('tangoSu') as HTMLSpanElement;
const qrcode_btn: HTMLButtonElement = document.getElementById('qrcode_btn') as HTMLButtonElement;
const nyuryoku_btn: HTMLButtonElement = document.getElementById('nyuryoku_btn') as HTMLButtonElement;
const random_btn: HTMLButtonElement = document.getElementById('random_btn') as HTMLButtonElement;
const guguru_btn: HTMLAnchorElement = document.getElementById('guguru_btn') as HTMLAnchorElement;

// ぐぐりにつかうURL
const guguru_url: string = 'https://www.google.com/search?q=';

// 色達
const black: string = '#555';
const white: string = '#FFF';
const blue: string = '#3CC';
const yello: string = '#FF6';
const pink: string = '#F9F';
const green: string = '#9F6';
const orange: string = '#F93';
const purple: string = '#96F';

// これからの状態をもつもの
// こうも一旦どこかにおさめずにStateに渡しているのはそこ以外から触ってほしくないからですよそれを
const state: State = new State(
    document.getElementById('input_area') as HTMLInputElement,
    document.getElementById('darkMode_btn') as HTMLButtonElement,
    document.documentElement.style
);
// 辞書というモノはいまはこのひとつ
const jisho: Jisho = new Jisho('jisho.json', 'jisho');





////////////////////
// イベント登録
////////////////////

// HTMLパースが終わってから発火
document.addEventListener('DOMContentLoaded', function()
{
    // クイックサーチボタン(readme的なとこに書いてあるJISHOで間作するためのリンク)に関する処理
    // クイックサーチのためのもの複数あるのでclassでしているのでそのぶんまわす
    // classからとったオブジェクトに適応するための形です。
    for (let key = 0; key < quickSearch_btns['length']; key++)
    {
        // ひとつのボタンのための処理
        quickSearch_btns[key].addEventListener('click', function()
        {
            // 一番上にスムーススクロール
            window.scrollTo({top: 0, behavior: "smooth"});
            // その単語が入力されているものとする(インプットエリア上書き)
            state.input_area.value = quickSearch_btns[key].getAttribute('value')!;
            // 出力
            result_area.innerHTML = (function()
            {
                // 前方に`--`の付いてる特殊なやつなら
                // それってつまり`--`の最初に現れる位置が最初つまり0ってことなの
                if (state.input_area.value.indexOf('--') === 0)
                {
                    // 基本複数あるのでふつう検索
                    return jisho.createResult(state.input_area.value);
                }
                // ふつうのやつなら
                else
                {
                    // 完全一致検索
                    // いまはクイックサーチボタンからの要求はは完全一致検索ということになっています。用語の解説用だしね！
                    return jisho.createExactResult(state.input_area.value);
                }
            }
            )();
        });
    }
});

// 入力エリアでの文字いじりそうさのたびに
state.input_area.addEventListener('keyup', function()
{
    // result_areaエリアの内容を変更(描画し直す)
    result_area.innerHTML = (function()
    {
        // 入力内容があれば
        if (state.input_area.value !== '')
        {
            // input_textから結果を作成して返す
            return jisho.createResult(state.input_area.value);
        }
        // 入力内容がなければ
        else
        {
            // 無い内容を返す
            return '';
        }
    }
    )();
});

// タッチ終わりに発火
all_area.addEventListener('touchend', function()
{
    // 選択されている文字を取得
    state.selected_text = window.getSelection()!.toString();
    // 内容があれば
    if (state.selected_text)
    {
        // ぐぐるボタンを「選択をぐぐる」に
        guguru_btn.classList.add('guguru_btn__sentaku');
    }
    // 内容がなかれば
    else
    {
        // ぐぐるボタンを「ぐぐる」に
        guguru_btn.classList.remove('guguru_btn__sentaku');
    }
});

// ダークモードトグルボタンが変わったら
state._darkMode_btn.addEventListener('change', function()
{
    // ダークモード状態を変えるのです
    state.changeDarkMode();
});

// QRコードボタンが押されたら
qrcode_btn.addEventListener('click', function()
{
    // 次の要素(QRコード画像)取得
    const qrcode_img: Element = qrcode_btn!.nextElementSibling!;
    // 現れている状態のQRコード画像スタイルを、なかったらつけて、あったら消す。
    qrcode_img.classList.toggle('qrcode__open');
});

// 入力ボタン押されたら
nyuryoku_btn.addEventListener('click', function()
{
    // いんぷっとえりあにフォーカス
    state.input_area.focus();
});

// それはランダムの表示ボタンが押されることにより達成されます
random_btn.addEventListener('click', function()
{
    // お星さまジェネレート
    // const hoshi: Hoshi = new Hoshi();
    // // お星さまエレメント
    // const hoshiElement: HTMLImageElement = hoshi._element;
    // // お星さまアクティベート
    // all_area.appendChild(hoshiElement);
    // できればめそっどでアニメーションさせるのさ
    // code...
    // 一番上にスムーススクロール
    window.scrollTo({top: 0, behavior: "smooth"});
    // ランダム一単語を表示させる
    result_area.innerHTML = jisho.createRandomOneTangoResult();
    // その単語が入力されているものとする
    state.input_area.value =  jisho._last_random_word;
});

// ぐぐるボタン押されたらぐぐる
guguru_btn.addEventListener('click', function()
{
    // 選択された文字があれば
    if (state.selected_text)
    {
        // 選択された文字でぐぐる
        window.open(guguru_url + state.selected_text);
        // 選択文字は空とする
        state.selected_text = null;
        // 選択ないのでボタンはもどす
        guguru_btn.classList.remove('guguru_btn__sentaku');
    }
    // 選択された文字がなければ
    else
    {
        // 入力されている文字でぐぐる
        window.open(guguru_url + state.input_area.value);
    }
});