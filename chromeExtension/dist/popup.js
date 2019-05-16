"use strict";var jisho,input=document.getElementById("input"),result=document.getElementById("result"),usageBtn=document.getElementById("usageBtn"),readme=document.getElementById("readme"),jishoPath="jisho.json",xhr=new XMLHttpRequest;xhr.open("GET",chrome.extension.getURL(jishoPath),!0),xhr.onreadystatechange=function(){xhr.readyState==XMLHttpRequest.DONE&&200==xhr.status&&(jisho=JSON.parse(xhr.responseText))},xhr.send();var wordItems=["kotb","eigo","kwsk","mnim"];function hiraToKata(e){return e.replace(/[\u3041-\u3096]/g,function(e){return String.fromCharCode(e.charCodeAt(0)+96)})}function zenToHan(e){return e.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(e){return String.fromCharCode(e.charCodeAt(0)-65248)})}function containing(e,t){return e=e.toLowerCase().replace(/\s+/g,""),t=t.toLowerCase(),!!e.match(t)||(!!e.match(hiraToKata(t))||!!e.match(zenToHan(t)))}function serch(e,t,n){if("--all"===t)return e;if(""!==t){var r={},o=0;for(var a in e)if(n){var i=wordItems[0];if(e[a][i]===t)return e[a]}else for(var s in wordItems){i=wordItems[s];if(containing(e[a][i],t)){r[o]=e[a],o++;break}}return r}}function createHtml(e){var t='<div class="tango">';for(var n in e)if(""!==e[n])switch(n){case"kotb":t+="<h2>"+e[n]+"</h2>";break;case"eigo":t+='<p class="eigo">'+e[n]+"</p>";break;case"kwsk":t+='<p class="kwsk">'+e[n]+"</p>";break;case"mnim":t+='<dl class="mnim"><dt>もとのいみ：</dt><dd>'+e[n]+"</dd></dl>";break;case"tigg":t+='<dl class="tigg"><dt>対義語：</dt><dd>'+e[n]+"</dd>"+createHtml(serch(jisho,e[n],!0))+"</dl>"}return t+="</div>"}function createResult(e,t){var n="",r=serch(e,t,!1);for(var o in r)n+=createHtml(r[o]);return n.replace("undefined","")}window.onload=function(){input.focus()},input.onblur=function(){input.focus()},input.onkeyup=function(){var e=input.value;result.innerHTML=createResult(jisho,e)},usageBtn.onclick=function(){"none"==readme.style.display?readme.style.display="block":readme.style.display="none"},window.document.onkeydown=function(e){if(13===e.keyCode){var t=input.value;window.open("https://www.google.com/search?q="+t)}};