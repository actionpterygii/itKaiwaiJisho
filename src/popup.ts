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
    // '--all'と入力された場合はすべて
    if(inputValue === '--all')
    {
        return jisho;
    }
    // 何か入力がった場合
    else if(inputValue !== '')
    {
        // 最終的に返すことになる単語要素
        var requiredElements: any = {};
        // 最終的に返すことになる単語要素の連番つけるための
        var i: number = 0;
        for(let key in jisho)
        {
            if(jisho[key]['kotb'].match(inputValue) || jisho[key]['kotb'].match(hiraToKata(inputValue)))
            {
                requiredElements[i] = jisho[key];
                i++;
            }
            else if(jisho[key]['eigo'].match(inputValue))
            {
                requiredElements[i] = jisho[key];
                i++;
            }
            else if(jisho[key]['kwsk'].match(inputValue))
            {
                requiredElements[i] = jisho[key];
                i++;
            }
            else if(jisho[key]['tnjt'].match(inputValue))
            {
                requiredElements[i] = jisho[key];
                i++;
            }
            else if(jisho[key]['tigg'].match(inputValue))
            {
                requiredElements[i] = jisho[key];
                i++;
            }
        }
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
    // よくわからんけどundefinedを消す
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
    const inputValue: string = input.value;
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
    if(event.keyCode === 13)
    {
        const inputValue: string = input.value;
        window.open('https://www.google.com/search?q=' + inputValue);
    }
};
