
// actionpterygii
// itKaiwaiJisho



////////////////////
// 型
////////////////////

// 辞書の型(単語の配列)
type jisho = [{[key: string]: string;}];
// 単語の型
type tango = {[key: string]: string;};
// HTMLとしての文字列
type HTMLString = string;



////////////////////
// 定数
////////////////////

//後で使うHTML要素
const input_area: HTMLInputElement = document.getElementById('input_area') as HTMLInputElement;
const result_area: HTMLDivElement = document.getElementById('result_area') as HTMLDivElement;
const nyuryoku_btn: HTMLButtonElement = document.getElementById('nyuryoku_btn') as HTMLButtonElement;
const guguru_btn: HTMLAnchorElement = document.getElementById('guguru_btn') as HTMLAnchorElement;

// 入力内容を保存しておくためのもの
let input_value: string = '';

// 一単語にある項目の中で調べるべきもの(対義語と関連語以外ね)
const word_items: string[] = ['kotb', 'eigo', 'kwsk', 'mnim'];

// 辞書情報を辞書jsonから取得する
var jisho: jisho;
{
    const jisho_path: string = 'jisho.json';
    const my_xhr: XMLHttpRequest = new XMLHttpRequest();
    my_xhr.overrideMimeType("application/json");
    my_xhr.open('GET', jisho_path, true);
    my_xhr.onreadystatechange = function()
    {
        if (my_xhr.readyState == XMLHttpRequest.DONE && my_xhr.status == 200)
        {
            jisho = JSON.parse(my_xhr.responseText || 'null');
        }
    };
    my_xhr.send();
}



////////////////////
// 関数
////////////////////

// ひらがなをカナカナに変換するための
function hiraToKata(input_value: string): string
{
    // ひらがなをおきかえるよって
    return input_value.replace(/[\u3041-\u3096]/g, function(input_value: string)
    {
        // 文字コード的にずらしてカタカナにする
        return String.fromCharCode(input_value.charCodeAt(0) + 0x60);
    });
}

// 全角英数を半角英数に変換するための
function zenToHan(input_value: string): string
{
    //全角英数置き換えるよって
    return input_value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(input_value: string)
    {
        //　文字コード的にずらして半角にする
        return String.fromCharCode(input_value.charCodeAt(0) - 65248);
    });
}

// itemの内容がinput_valueのなかにあればtrueるなければfalseる。exact_matchは完全一致検索かどうか
function containing(item: string, input_value: string, exact_match: boolean): boolean
{
    // スペースを削除する
    item = item.replace(/\s+/g, '');
    // アルファベットは小文字する
    item = item.toLowerCase();
    // アルファベットは小文字する
    input_value = input_value.toLowerCase();
    // 完全一致検索でしたら
    if (exact_match)
    {
        // input_valueの文字がitemと同じならおっけ
        if (item === input_value)
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
        // input_valueの文字がitem内にあるか(じつはひらがな→ひらがな検索のためだけにある気)
        if (item.match(input_value))
        {
            return true;
        }
        // ひらがなをカタカナにして確認
        else if (item.match(hiraToKata(input_value)))
        {
            return true;
        }
        // 全角英数を半角英数にして確認
        else if (item.match(zenToHan(input_value)))
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
function scarch(jisho: jisho, input_value: string, exact_match: boolean): jisho
{
    // '--all'と入力された場合
    if (input_value === '--all')
    {
        // 辞書jsonのすべてを返す
        return jisho;
    }
    // 普通の入力の場合
    else
    {
        // 完全一致検索でしたら
        if (exact_match)
        {
            // kotbのみで探す
            const item: string = word_items[0];
            // 辞書jsonを最初から見ていく。keyには辞書jsonで何遍目の単語かがはいる
            for (const key in jisho)
            {
                // 入力した内容があるか(完全一致検索)
                if (containing(jisho[key][item], input_value, exact_match))
                {
                    // その単語返すを
                    return [jisho[key]];
                }
            }
        }
        // 完全一致検索じゃなかったら
        else
        {
            // 最終的に返すことになる単語要素
            let required_elements: any = {} as jisho;
            // 最終的に返すことになる単語要素の連番つけるための
            let i: number = 0;
            // 辞書jsonを最初から見ていく。keyには辞書jsonで何遍目の単語かがはいる
            for (const key in jisho)
            {
                // 一単語に対して、先に定義してあるword_itemsの要素ぶん回す。
                for (const item_key in word_items)
                {
                    // 単語の中の一つの項目のキー
                    const item: string = word_items[item_key];
                    // 入力した内容があるか(あてはまるもの全部検索)
                    if (containing(jisho[key][item], input_value, exact_match))
                    {
                        // 必要な単語ということで追加する
                        required_elements[i] = jisho[key];
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
    return jisho;
}

// 1単語の情報からHTMLを作成
function createHtml(element: tango): HTMLString
{
    // 一単語をつつむおおいなるdiv要素(これに追加していって最後返す)
    let html: HTMLString = '<div class="tango">';
    // 単語内の各要素を一つづつみていく
    for (const key in element)
    {
        // 内容が空でなかったら
        if (element[key] !== '')
        {
            // 単語内の各要素の種類に応じて内容を含めたHTML要素をつくる
            switch (key)
            {
                case 'kotb':
                    html += 
                        '<h2 class="kotb">' + element[key] + '</h2>';
                    break;
                case 'eigo':
                    html +=
                        '<p class="eigo">' + element[key] + '</p>';
                    break;
                case 'kwsk':
                    html +=
                        '<p class="kwsk">' + element[key] + '</p>';
                    break;
                case 'mnim':
                    html +=
                        '<p class="mnim">' + element[key] + '</p>';
                    break;
                case 'tigg':
                    html +=
                        '<p class="tigg">' + element[key] + '</p>';
                    break;
                case 'krng':
                    // 関連語アコーディオンの処理のためのランダムな文字列を作る
                    const random_id: string = 'random_' + Math.random().toString(32).substring(2);
                    html += 
                        '<div class="krng">' +
                            '<label class="krng_facade" for="' + random_id + '" value="' + element[key] + '" onClick="createKanrengo(this)"></label>' +
                            '<input id="' + random_id + '" class="krng_checkbox" type="checkbox">' +
                            '<div class="krng_contents"></div>' +
                        '</div>';
                    break;
                default:
                    break;
            }
        }
    }
    // 最後の綴じdiv
    html += '</div>';
    // かえす
    return html;
}

// 入力から結果(HTML)を返す
function createResult(jisho: jisho, input_value: string): HTMLString
{
    // 最後かえす文字列
    let entity: HTMLString = '';
    // 必要な要素を選定する
    const required_elements: jisho = scarch(jisho, input_value, false);
    // 選定した要素から一つづついじる
    for (const key in required_elements)
    {
        // HTMLを作成して追加していく
        entity += createHtml(required_elements[key]);
    }
    // かえす
    return entity;
}

// 関連語を開くボタンがおされたら呼ばれる関数
function createKanrengo(krng_label: Element)
{
    // 押された開くボタンで開く要素(それは次の次にある要素)
    const krng_contents: Element = krng_label!.nextElementSibling!.nextElementSibling!;
    // 押されたボタンで必要なの単語を取り出し1つずつ配列に入れる
    const tangos: string[] = krng_label!.getAttribute('value')!.split(',');
    // 関連語とされる単語を検索して設置(描画(目に見えて)はCSSで行う)
    krng_contents.innerHTML = (function()
    {
        // 最後に返す要素
        let entity: HTMLString = '';
        // 単語たちをひとつずつ触っていく
        for (const key in tangos)
        {
            // scarch関数でその単語を完全一致検索で探してくる
            // [0]指定なのは、scarch関数は複数個対応の単語の配列(jisho型)を返すため。
            // 完全一致検索なため0番目の要素のみある。
            const required_element: tango = scarch(jisho, tangos[key], true)[0];
            // でそのひと単語の情報からHTMLを作成して追加していく
            entity += createHtml(required_element);
        }
        // かえす
        return entity;
    }
    )();
}



////////////////////
// イベント登録
////////////////////

// 文字が入力されるたんびに
input_area.addEventListener('keyup', function()
{
    // inputにあるvalueを格納
    input_value = input_area.value;
    // result_areaエリアの内容を変更(描画し直す)
    result_area.innerHTML = (function()
    {
        // 入力内容があれば
        if (input_value !== '')
        {
            // input_valueから結果を作成して返す
            return createResult(jisho, input_value);
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

// 入力押されたら入力
nyuryoku_btn.addEventListener('click', function()
{
    // いんぷっとえりあにフォーカス
    input_area.focus();
});

// ぐぐる押されたらぐぐる
guguru_btn.addEventListener('click', function()
{
    // ぐぐる
    window.open('https://www.google.com/search?q=' + input_value);
});
