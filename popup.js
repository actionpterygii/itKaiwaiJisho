const input = document.getElementById('input');
const result = document.getElementById('result');
const usageBtn = document.getElementById('usageBtn');
const readme = document.getElementById('readme');

const jishoPath = 'jisho.json';
var jisho = {};
const xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL(jishoPath), true);
xhr.onreadystatechange = function()
{
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
    {
        jisho = JSON.parse(xhr.responseText);
    }
};
xhr.send();

function serch(jisho, inputValue)
{
    if(inputValue === '--all')
    {
        return jisho;
    }
    else
    {
        for(let key in jisho)
        {
            
        }
    }
}

function createHtml(element)
{
    let html = '<div class="tango">';
    for(let key in element)
    {
        if(element[key] !== null)
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

function createResult(jisho, inputValue)
{
    let entity;
    const requiredElements = serch(jisho, inputValue);
    for(let key in requiredElements)
    {
        entity += createHtml(requiredElements[key]);
    }
    return entity;
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
    const inputValue = input.value;
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
