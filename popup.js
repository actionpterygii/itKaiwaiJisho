const input = document.getElementById('input');
const result = document.getElementById('result');
const usageBtn = document.getElementById('usageBtn');
const readme = document.getElementById('readme');

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
    result.innerHTML = input.value;
};

usageBtn.onclick = function()
{
    if(readme.style.display == "none")
    {
        readme.style.display = "block";
    }
    else
    {
        readme.style.display = "none";
    }
};
