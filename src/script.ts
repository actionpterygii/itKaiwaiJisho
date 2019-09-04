const input: HTMLInputElement = document.getElementById('input') as HTMLInputElement;
const result: HTMLElement = document.getElementById('result') as HTMLElement;
const usageBtn: HTMLButtonElement = document.getElementById('usageBtn') as HTMLButtonElement;
const kekkaKopi: HTMLAnchorElement = document.getElementById('kekkaKopi') as HTMLAnchorElement;

let inputValue: string = '';

// 辞書情報を辞書jsonから取得する
const jishoPath: string = 'jisho.json';
var jisho: [{[key: string]: string;}];
const xhr: XMLHttpRequest = new XMLHttpRequest();
xhr.overrideMimeType("application/json");
xhr.open('GET', jishoPath, true);
xhr.onreadystatechange = function()
{
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
    {
        jisho = JSON.parse(xhr.responseText || "null");
    }
};
xhr.send();

// 文字列をクリップボードにコピーする
function copyTextToClipboard(text: string)
{
    const copyFrom: HTMLTextAreaElement = document.createElement('textarea');
    const bodyElm: HTMLBodyElement = document.getElementsByTagName('body')[0];
    copyFrom.textContent = text;
    bodyElm.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    bodyElm.removeChild(copyFrom);
}

// 一単語にある項目の中で調べるべきもの(対義語以外ね)
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

// itemの内容がinputValueのなかにあればtrueるなければfalseる
function containing(item: string, inputValue: string)
{
    // アルファベットは小文字にする、スペースを削除する
    item = item.toLowerCase().replace(/\s+/g, '');
    // アルファベットは小文字する
    inputValue = inputValue.toLowerCase();
    
    // inputValueの文字がitem内にあるか(じつはひらがな→ひらがな検索のためだけにある気)
    if(item.match(inputValue))
    {
        return true;
    }
    // ひらがなをカタカナにして確認
    else if(item.match(hiraToKata(inputValue)))
    {
        return true;
    }
    // 全角英数を半角英数にして確認
    else if(item.match(zenToHan(inputValue)))
    {
        return true;
    }
    // ない場合
    else
    {
        return false;
    }
}

// 入力された値を辞書jsonから検索してマッチしたものを返す
function serch(jisho: [{[key: string]: string;}], inputValue: string, exactMatch: boolean)
{
    // '--all'と入力された場合
    if(inputValue === '--all')
    {
        // 辞書jsonのすべてを返す
        return jisho;
    }
    // 何か入力があった場合
    else if(inputValue !== '')
    {
        // 最終的に返すことになる単語要素
        var requiredElements: any = {} as [{[key: string]: string;}];
        // 最終的に返すことになる単語要素の連番つけるための
        var i: number = 0;
        // 辞書jsonを最初から見ていく。keyには辞書jsonで何遍目の単語かがはいる
        for(let key in jisho)
        {
            // 完全一致検索でしたら
            if(exactMatch)
            {
                // kotbのみで探す
                const item: string = wordItems[0];
                // 一緒なら
                if(jisho[key][item] === inputValue)
                {
                    // その単語を追加する
                    return jisho[key];
                }
            }
            // 完全一致検索じゃなかったら
            else
            {
                // 一単語に対して、先に定義してあるwordItemsの要素ぶん回す。
                for(let itemKey in wordItems)
                {
                    // 単語の中の一つの項目のキー
                    const item: string = wordItems[itemKey];
                    // 入力した内容があるか
                    if(containing(jisho[key][item], inputValue))
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
function createHtml(element: {[key: string]: string;}, base: boolean)
{
    // 一単語をつつむおおいなるa要素(これに追加していって最後返す)
    let html: string = '<div class="tango">';
    // 単語内の各要素を一つづつみていく
    for(let key in element)
    {
        // 内容が空でなかったら
        if(element[key] !== '')
        {
            // 単語内の各要素の種類に応じて内容を含めたHTML要素をつくる
            switch(key)
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
                            // ここのときにすぐ実行される
                            (function()
                            {
                                // base==true、つまり何かの対義語として表示されてるやつじゃなかったら
                                if(base)
                                {
                                    // 対義語のを探して(完全一致検索でひとつだけ)、HTMLを構成する(base==falseで)
                                    return createHtml(serch(jisho, element[key], true), false);
                                }
                            }
                            )(); +
                        '</dl>';
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

// 入力から結果を返す
function createResult(jisho: [{[key: string]: string;}], inputValue: string)
{
    // 最後かえす文字列
    let entity: string = '';
    // 必要な要素を選定する
    const requiredElements: [{[key: string]: string;}] = serch(jisho, inputValue, false);
    // 選定した要素から一つづついじる
    for(let key in requiredElements)
    {
        // HTMLを作成して追加していく
        entity += createHtml(requiredElements[key], true);
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

// エンター押されたらぐぐる
window.document.onkeydown = function(event)
{
    // エンターキーのキーコードは13ゆえ
    if(event.keyCode === 13)
    {
        // ぐぐる
        window.open('https://www.google.com/search?q=' + inputValue);
    }
};
