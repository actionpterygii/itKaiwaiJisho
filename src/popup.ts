const input: HTMLInputElement = document.getElementById('input') as HTMLInputElement;
const result: HTMLElement = document.getElementById('result') as HTMLElement;
const usageBtn: HTMLButtonElement = document.getElementById('usageBtn') as HTMLButtonElement;
const readme: HTMLDivElement = document.getElementById('readme') as HTMLDivElement;

// 辞書情報を辞書jsonから取得してく
const jishoPath: string = 'jisho.json';
var jisho: any = {};
const xhr: any = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL(jishoPath), true);
xhr.onreadystatechange = function()
{
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
    {
        jisho = JSON.parse(xhr.responseText);
    }
};
xhr.send();

// 一単語にある項目
const wordItems: string[] = ['kotb', 'eigo', 'kwsk', 'tnjt', 'tigg'];

// ひらがなをカナカナに変換するための
function hiraToKata(inputValue: string)
{
    return inputValue.replace(/[\u3041-\u3096]/g, function(inputValue)
    {
        return String.fromCharCode(inputValue.charCodeAt(0) + 0x60);
    });
}

// 入力された値を辞書jsonから検索してマッチしたものを返す
function serch(jisho: any, inputValue: string)
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
        var requiredElements: any = {};
        // 最終的に返すことになる単語要素の連番つけるための
        var i: number = 0;
        // 辞書jsonを最初から見ていく。keyには辞書jsonで何遍目の単語かがはいる
        for(let key in jisho)
        {
            // 一単語に対して、先に定義してあるwordItemsの要素ぶん回す。
            for(let itemKey in wordItems)
            {
                // 単語の中の一つの項目のキー
                const item: string = wordItems[itemKey];
                // 入力した内容があるか
                if(jisho[key][item].match(inputValue) || jisho[key][item].match(hiraToKata(inputValue)))
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
        // 辞書jsonから必要な部分を
        return requiredElements;
    }
}

// 必要な部分の辞書jsonからHTMLを作成
function createHtml(element: {[key: string]: string;})
{
    let html: string = '<div class="tango">';
    for(let key in element)
    {
        if(element[key] !== '')
        {
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
                case 'tnjt':
                    html +=
                        '<dl class="tnjt">' +
                            '<dt>転じて</dt>' +
                            '<dd>' + element[key] + '</dd>' +
                        '</dl>';
                    break;
                case 'tigg':
                    html +=
                        '<dl class="tigg">' +
                            '<dt>対義語</dt>' +
                            '<dd>' + element[key] + '</dd>' +
                        '</dl>';
                    break;
                default:
                    break;
            }
        }
    }
    html += '</div>';
    return html;
}

// 入力から結果を返す
function createResult(jisho: any, inputValue: string)
{
    let entity: string = '';
    const requiredElements: any = serch(jisho, inputValue);
    for(let key in requiredElements)
    {
        entity += createHtml(requiredElements[key]);
    }
    // よくわからんけど出るundefinedを消す
    return entity.replace('undefined','');
}

// 拡張機能開いたら入力部分にフォーカスを当てる
window.onload = function()
{
    input.focus();
};

// 入力部分にフォーカスを当てる
input.onblur = function()
{
    input.focus();
};

// 文字が入力されるたんびに
input.onkeyup = function()
{
    // inputにあるvalueを格納
    const inputValue: string = input.value;
    // そこから結果を作成して描画
    result.innerHTML = createResult(jisho, inputValue);
};

usageBtn.onclick = function()
{
    if(readme.style.display == 'none')
    {
        readme.style.display = 'block';
    }
    else
    {
        readme.style.display = 'none';
    }
};

// エンター押されたらぐぐる
window.document.onkeydown = function(event)
{
    // エンターキーのキーコードは13ゆえ
    if(event.keyCode === 13)
    {
        // inputにあるvalueを格納
        const inputValue: string = input.value;
        // ぐぐる
        window.open('https://www.google.com/search?q=' + inputValue);
    }
};
