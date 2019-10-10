//後で使うHTML要素
const input: HTMLInputElement = document.getElementById('input') as HTMLInputElement;
const result: HTMLDivElement = document.getElementById('result') as HTMLDivElement;
const nyuryokuBtn: HTMLButtonElement = document.getElementById('nyuryokuBtn') as HTMLButtonElement;
const guguruBtn: HTMLAnchorElement = document.getElementById('guguruBtn') as HTMLAnchorElement;


// 入力内容を保存しておく
let inputValue: string = '';

// 辞書情報を辞書jsonから取得する
const jishoPath: string = 'jisho.json';
var jisho: [{[key: string]: string;}];
const xhr: XMLHttpRequest = new XMLHttpRequest();
xhr.overrideMimeType("application/json");
xhr.open('GET', jishoPath, true);
xhr.onreadystatechange = function()
{
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
    {
        jisho = JSON.parse(xhr.responseText || "null");
    }
};
xhr.send();


// 一単語にある項目の中で調べるべきもの(対義語と関連語以外ね)
const wordItems: string[] = ['kotb', 'eigo', 'kwsk', 'mnim'];

// ひらがなをカナカナに変換するための
function hiraToKata(inputValue: string)
{
    // ひらがなをおきかえるよって
    return inputValue.replace(/[\u3041-\u3096]/g, function(inputValue: string)
    {
        // 文字コード的にずらしてカタカナにする
        return String.fromCharCode(inputValue.charCodeAt(0) + 0x60);
    });
}

// 全角英数を半角英数に変換するための
function zenToHan(inputValue: string)
{
    //全角英数置き換えるよって
    return inputValue.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(inputValue: string)
    {
        //　文字コード的にずらして半角にする
        return String.fromCharCode(inputValue.charCodeAt(0) - 65248);
    });
}

// itemの内容がinputValueのなかにあればtrueるなければfalseる。exactMatchは完全一致検索かどうか
function containing(item: string, inputValue: string, exactMatch: boolean)
{
    // アルファベットは小文字にする、スペースを削除する
    item = item.toLowerCase().replace(/\s+/g, '');
    // アルファベットは小文字する
    inputValue = inputValue.toLowerCase();
    // 完全一致検索でしたら
    if (exactMatch)
    {
        // inputValueの文字がitemと同じならおっけ
        if (item === inputValue)
        {
            return true;
        }
    }
    // 完全一致検索じゃなかったら
    else
    {
        // inputValueの文字がitem内にあるか(じつはひらがな→ひらがな検索のためだけにある気)
        if (item.match(inputValue))
        {
            return true;
        }
        // ひらがなをカタカナにして確認
        else if (item.match(hiraToKata(inputValue)))
        {
            return true;
        }
        // 全角英数を半角英数にして確認
        else if (item.match(zenToHan(inputValue)))
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

// 入力された値を辞書jsonから検索してマッチしたものを返す。exactMatchは完全一致検索かどうか
function serch(jisho: [{[key: string]: string;}], inputValue: string, exactMatch: boolean)
{
    // '--all'と入力された場合
    if (inputValue === '--all')
    {
        // 辞書jsonのすべてを返す
        return jisho;
    }
    // 何か入力があった場合
    else if (inputValue !== '')
    {
        // 最終的に返すことになる単語要素
        var requiredElements: any = {} as [{[key: string]: string;}];
        // 最終的に返すことになる単語要素の連番つけるための
        var i: number = 0;
        // 辞書jsonを最初から見ていく。keyには辞書jsonで何遍目の単語かがはいる
        for (let key in jisho)
        {
            // 完全一致検索でしたら
            if (exactMatch)
            {
                // kotbのみで探す
                const item: string = wordItems[0];
                // 入力した内容があるか(完全一致検索)
                if (containing(jisho[key][item], inputValue, exactMatch))
                {
                    // その単語を追加する
                    return jisho[key];
                }
            }
            // 完全一致検索じゃなかったら
            else
            {
                // 一単語に対して、先に定義してあるwordItemsの要素ぶん回す。
                for (let itemKey in wordItems)
                {
                    // 単語の中の一つの項目のキー
                    const item: string = wordItems[itemKey];
                    // 入力した内容があるか
                    if (containing(jisho[key][item], inputValue, exactMatch))
                    {
                        // 必要な単語ということで追加する
                        requiredElements[i] = jisho[key];
                        // 単語が追加されたので増やす
                        i++;
                        // 追加したらその単語に用はないのでこのforループを抜ける
                        // これがないと単語内で入力文字が複数項目である場合に重複する
                        break;
                    }
                }
            }
        }
        // 辞書jsonから必要な部分を返す
        return requiredElements;
    }
}

// 必要な部分の辞書jsonからHTMLを作成
// base は 対義語をそのまま1単語検索で表示していたときに無限ループにならないようにです。
function createHtml(element: {[key: string]: string;})
{
    // 一単語をつつむおおいなるa要素(これに追加していって最後返す)
    let html: string = '<div class="tango">';
    // 単語内の各要素を一つづつみていく
    for (let key in element)
    {
        // 内容が空でなかったら
        if (element[key] !== '')
        {
            // 単語内の各要素の種類に応じて内容を含めたHTML要素をつくる
            switch (key)
            {
                case 'kotb':
                    html += 
                        '<h2>' + element[key] + '</h2>';
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
                        '<dl class="mnim">' +
                            '<dt>もとのいみ：</dt>' +
                            '<dd>' + element[key] + '</dd>' +
                        '</dl>';
                    break;
                case 'tigg':
                    html +=
                        '<dl class="tigg">' +
                            '<dt>対義語：</dt>' +
                            '<dd>' + element[key] + '</dd>' +
                        '</dl>';
                    break;
                case 'krng':
                        // 関連語アコーディオンの処理のためのランダムな文字列を言葉と今の時間から作る
                        const randomId: string = element['kotb'] + new Date().getTime();
                        html += 
                            '<div class="krng">' +
                                '<label class="krng_facade" for="' + randomId + '" value="' + element[key] + '" onClick="createKanrengo(this)">' +
                                    '<span class="krng_facade_title">関連語</span>' +
                                    '<span class="krng_facade_mark"></span>' +
                                '</label>' +
                                '<input id="' + randomId + '" class="krng_checkbox" type="checkbox">' +
                                '<div class="krng_contents">' +
                                '</div>' +
                            '</div>';
                    break;
                default:
                    break;
            }
        }
    }
    // 最後の綴じdiv
    html += '</div>';
    // かえせ
    return html;
}

// 関連語を開くボタンがおされたら呼ばれる関数
function createKanrengo(krngLabel: HTMLElement)
{
    // 押された開くボタンで開く要素(それは次の次にある要素)
    const krngContents: Element = krngLabel.nextElementSibling.nextElementSibling;

    // 押されたボタンで必要なの単語を取り出し1つずつ配列に入れる
    const tangos: string[] = krngLabel.getAttribute('value').split(',');
    // の内容を検索して設置
    krngContents.innerHTML = (function()
    {
        // 最後に返す要素
        let tangosHTML: string = "";
        // 関連語にある単語の数だけおこなうね
        for (const tangoKey in tangos)
        {
            // 対義語のを探して(完全一致検索でひとつだけ)、HTMLを構成する
            tangosHTML += createHtml(serch(jisho, tangos[tangoKey], true));
        }
        // かえす
        return tangosHTML;
    }
    )();
}

// 入力から結果を返す
function createResult(jisho: [{[key: string]: string;}], inputValue: string)
{
    // 最後かえす文字列
    let entity: string = '';
    // 必要な要素を選定する
    const requiredElements: [{[key: string]: string;}] = serch(jisho, inputValue, false);
    // 選定した要素から一つづついじる
    for (let key in requiredElements)
    {
        // HTMLを作成して追加していく
        entity += createHtml(requiredElements[key]);
    }
    // よくわからんけど出るundefinedを消しつつ返す
    return entity.replace('undefined','');
}

// 文字が入力されるたんびに
input.onkeyup = function()
{
    // inputにあるvalueを格納
    inputValue = input.value;
    // inputValueから結果を作成して描画
    result.innerHTML = createResult(jisho, inputValue);
};

// 入力押されたら入力
nyuryokuBtn.onclick = function()
{
    // いんぷっとえりあにフォーカス
    input.focus();
};

// ぐぐる押されたらぐぐる
guguruBtn.onclick = function()
{
    // ぐぐる
    window.open('https://www.google.com/search?q=' + inputValue);
};
