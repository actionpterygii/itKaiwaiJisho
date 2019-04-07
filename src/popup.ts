const input: HTMLInputElement = document.getElementById('input') as HTMLInputElement;
const result: HTMLElement = document.getElementById('result') as HTMLElement;
const usageBtn: HTMLButtonElement = document.getElementById('usageBtn') as HTMLButtonElement;
const readme: HTMLDivElement = document.getElementById('readme') as HTMLDivElement;

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

function hiraToKata(inputValue: string)
{
    return inputValue.replace(/[\u3041-\u3096]/g, function(inputValue)
    {
        return String.fromCharCode(inputValue.charCodeAt(0) + 0x60);
    });
}

function serch(jisho: any, inputValue: string)
{
    if(inputValue === '--all')
    {
        return jisho;
    }
    else if(inputValue !== '')
    {
        var requiredElements: any = {};
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

function createResult(jisho: any, inputValue: string)
{
    let entity: string = '';
    const requiredElements: any = serch(jisho, inputValue);
    for(let key in requiredElements)
    {
        entity += createHtml(requiredElements[key]);
    }
    return entity.replace('undefined','');
}

window.onload = function()
{
    input.focus();
};

input.onblur = function()
{
    input.focus();
};

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

window.document.onkeydown = function(event)
{
    if(event.keyCode === 13)
    {
        const inputValue: string = input.value;
        window.open('https://www.google.com/search?q=' + inputValue);
    }
};
