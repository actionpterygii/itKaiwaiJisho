
// Copyright 2020 actionpterygii

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
interface HTMLButtonElement {checked: boolean};



////////////////////
// 辞書クラス
////////////////////

class Jisho
{
    // 辞書のデータ
    readonly jisho_data!: JishoData;
    // 一単語にある項目の中で調べるときにみにいくべきもの(対義語と関連語以外ね)
    readonly word_items: string[] = ['kotb', 'eigo', 'kwsk', 'btmi', 'mnim'];

    constructor(jisho_data_path: string)
    {
        const my_xhr: XMLHttpRequest = new XMLHttpRequest();
        my_xhr.overrideMimeType("application/json");
        my_xhr.open('GET', jisho_data_path, true);
        if (my_xhr.readyState == XMLHttpRequest.DONE && my_xhr.status == 200)
        {
            this.jisho_data = JSON.parse(my_xhr.responseText || 'null');
        }
        my_xhr.send();
    }
}



////////////////////
// 定数
////////////////////

// HTML要素
const all_area: HTMLDivElement = document.getElementById('wrap') as HTMLDivElement;
const input_area: HTMLInputElement = document.getElementById('input_area') as HTMLInputElement;
const result_area: HTMLDivElement = document.getElementById('result_area') as HTMLDivElement;

const darkMode_btn: HTMLButtonElement = document.getElementById('darkMode_btn') as HTMLButtonElement;
const quickSearch_btns: HTMLCollection = document.getElementsByClassName('quickSearch_btn') as HTMLCollection;
const qrcode_btn: HTMLButtonElement = document.getElementById('qrcode_btn') as HTMLButtonElement;

const nyuryoku_btn: HTMLButtonElement = document.getElementById('nyuryoku_btn') as HTMLButtonElement;
const random_btn: HTMLButtonElement = document.getElementById('random_btn') as HTMLButtonElement;
const guguru_btn: HTMLAnchorElement = document.getElementById('guguru_btn') as HTMLAnchorElement;

// CSS要素
const style_sheet: CSSStyleDeclaration = document.documentElement.style;

// ぐぐりにつかうURL
const guguru_url: string = 'https://www.google.com/search?q=';

// 辞書というモノはいまはこのひとつ
const jisho: Jisho = new Jisho('jisho.json');



////////////////////
// 変数
////////////////////

// 入力内容を保存しておくためのもの
let input_text: string = '';

// 選択された文字(ぐぐるボタンを押したときに更新)
let selected_text: string | null = null;

// ダークモードか否かのやつ
let darkMode_flg: boolean = false;



////////////////////
// 関数
////////////////////

// ひらがなをカナカナに変換するための
function hiraToKata(input_text: string): string
{
    // ひらがなをおきかえるよって
    return input_text.replace(/[\u3041-\u3096]/g, function(input_text: string)
    {
        // 文字コード的にずらしてカタカナにする
        return String.fromCharCode(input_text.charCodeAt(0) + 0x60);
    });
}

// 全角英数を半角英数に変換するための
function zenToHan(input_text: string): string
{
    //全角英数置き換えるよって
    return input_text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(input_text: string)
    {
        //　文字コード的にずらして半角にする
        return String.fromCharCode(input_text.charCodeAt(0) - 65248);
    });
}



