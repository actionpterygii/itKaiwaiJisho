"use strict";var jisho,input=document.getElementById("input"),result=document.getElementById("result"),usageBtn=document.getElementById("usageBtn"),guguru=document.getElementById("guguru"),main=document.getElementById("wrap"),inputValue="",jishoPath="jisho.json",xhr=new XMLHttpRequest;function copyTextToClipboard(e){var t=document.createElement("textarea"),n=document.getElementsByTagName("body")[0];t.textContent=e,n.appendChild(t),t.select(),document.execCommand("copy"),n.removeChild(t)}xhr.overrideMimeType("application/json"),xhr.open("GET",jishoPath,!0),xhr.onreadystatechange=function(){xhr.readyState==XMLHttpRequest.DONE&&200==xhr.status&&(jisho=JSON.parse(xhr.responseText||"null"))},xhr.send();var wordItems=["kotb","eigo","kwsk","mnim"];function hiraToKata(e){return e.replace(/[\u3041-\u3096]/g,function(e){return String.fromCharCode(e.charCodeAt(0)+96)})}function zenToHan(e){return e.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(e){return String.fromCharCode(e.charCodeAt(0)-65248)})}function containing(e,t){return e=e.toLowerCase().replace(/\s+/g,""),t=t.toLowerCase(),!!e.match(t)||(!!e.match(hiraToKata(t))||!!e.match(zenToHan(t)))}function serch(e,t,n){if("--all"===t)return e;if(""!==t){var r={},a=0;for(var o in e)if(n){var i=wordItems[0];if(e[o][i]===t)return e[o]}else for(var u in wordItems){i=wordItems[u];if(containing(e[o][i],t)){r[a]=e[o],a++;break}}return r}}function createHtml(t,n){var r='<div class="tango">',e=function(e){if(""!==t[e])switch(e){case"kotb":r+="<h2>"+t[e]+"</h2>";break;case"eigo":r+='<p class="eigo">'+t[e]+"</p>";break;case"kwsk":r+='<p class="kwsk">'+t[e]+"</p>";break;case"mnim":r+='<dl class="mnim"><dt>もとのいみ：</dt><dd>'+t[e]+"</dd></dl>";break;case"tigg":r+='<dl class="tigg"><dt>対義語：</dt><dd>'+t[e]+"</dd>"+function(){if(n)return createHtml(serch(jisho,t[e],!0),!1)}()}};for(var a in t)e(a);return r+="</div>"}function createResult(e,t){var n="",r=serch(e,t,!1);for(var a in r)n+=createHtml(r[a],!0);return n.replace("undefined","")}input.onkeyup=function(){inputValue=input.value,result.innerHTML=createResult(jisho,inputValue)},guguru.onclick=function(){window.open("https://www.google.com/search?q="+inputValue)};