let input = document.getElementById('input');
let result = document.getElementById('result');

window.onload = function()
{
    input.focus();
};

input.onblur = function()
{
    input.focus();
}

input.onkeyup =  function()
{
    result.innerHTML = input.value;
}