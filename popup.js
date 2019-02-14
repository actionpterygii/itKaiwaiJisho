const input = document.getElementById('input');
const result = document.getElementById('result');
const usageBtn = document.getElementById('usageBtn');
const readme = document.getElementById('readme');

const jishoPath = 'jisho.json';
var jisho = {};
var xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL(jishoPath), true);
xhr.onreadystatechange = function()
{
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
    {
        jisho = JSON.parse(xhr.responseText);
    }
};
xhr.send();

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
    let value = input.value;

    result.innerHTML = jisho[0]['kwsk'];
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
