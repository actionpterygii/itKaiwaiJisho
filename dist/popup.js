"use strict";var input=document.getElementById("input"),result=document.getElementById("result"),usageBtn=document.getElementById("usageBtn"),readme=document.getElementById("readme"),jishoPath="jisho.json",jisho={},xhr=new XMLHttpRequest;function hiraToKata(e){return e.replace(/[\u3041-\u3096]/g,function(e){return String.fromCharCode(e.charCodeAt(0)+96)})}function serch(e,t){if("--all"===t)return e;if(""!==t){var n={},a=0;for(var r in e)e[r].kotb.match(t)||e[r].kotb.match(hiraToKata(t))?(n[a]=e[r],a++):e[r].eigo.match(t)?(n[a]=e[r],a++):e[r].kwsk.match(t)?(n[a]=e[r],a++):e[r].tnjt.match(t)?(n[a]=e[r],a++):e[r].tigg.match(t)&&(n[a]=e[r],a++);return n}}function createHtml(e){var t='<div class="tango">';for(var n in e)if(""!==e[n])switch(n){case"kotb":t+="<h2>"+e[n]+"</h2>";break;case"eigo":t+='<p class="eigo">'+e[n]+"</p>";break;case"kwsk":t+='<p class="kwsk">'+e[n]+"</p>";break;case"tnjt":t+='<dl class="tnjt"><dt>転じて</dt><dd>'+e[n]+"</dd></dl>";break;case"tigg":t+='<dl class="tigg"><dt>対義語</dt><dd>'+e[n]+"</dd></dl>"}return t+="</div>"}function createResult(e,t){var n="",a=serch(e,t);for(var r in a)n+=createHtml(a[r]);return n.replace("undefined","")}xhr.open("GET",chrome.extension.getURL(jishoPath),!0),xhr.onreadystatechange=function(){xhr.readyState==XMLHttpRequest.DONE&&200==xhr.status&&(jisho=JSON.parse(xhr.responseText))},xhr.send(),window.onload=function(){input.focus()},input.onblur=function(){input.focus()},input.onkeyup=function(){var e=input.value;result.innerHTML=createResult(jisho,e)},usageBtn.onclick=function(){"none"==readme.style.display?readme.style.display="block":readme.style.display="none"},window.document.onkeydown=function(e){if(13===e.keyCode){var t=input.value;window.open("https://www.google.com/search?q="+t)}};