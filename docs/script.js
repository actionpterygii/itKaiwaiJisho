"use strict";var jisho,input=document.getElementById("input"),result=document.getElementById("result"),usageBtn=document.getElementById("usageBtn"),readme=document.getElementById("readme"),jishoPath="jisho.json",xhr=new XMLHttpRequest;xhr.overrideMimeType("application/json"),xhr.open("GET",jishoPath,!0),xhr.onreadystatechange=function(){xhr.readyState==XMLHttpRequest.DONE&&200==xhr.status&&(jisho=JSON.parse(xhr.responseText))},xhr.send();var wordItems=["kotb","eigo","kwsk","mnim"];function hiraToKata(e){return e.replace(/[\u3041-\u3096]/g,function(e){return String.fromCharCode(e.charCodeAt(0)+96)})}function zenToHan(e){return e.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(e){return String.fromCharCode(e.charCodeAt(0)-65248)})}function containing(e,t){return e=e.toLowerCase().replace(/\s+/g,""),t=t.toLowerCase(),!!e.match(t)||(!!e.match(hiraToKata(t))||!!e.match(zenToHan(t)))}function serch(e,t,n){if("--all"===t)return e;if(""!==t){var r={},o=0;for(var a in e)if(n){var i=wordItems[0];if(e[a][i]===t)return e[a]}else for(var s in wordItems){i=wordItems[s];if(containing(e[a][i],t)){r[o]=e[a],o++;break}}return r}}function createHtml(t,n){var r='<div class="tango">',e=function(e){if(""!==t[e])switch(e){case"kotb":r+="<h2>"+t[e]+"</h2>";break;case"eigo":r+='<p class="eigo">'+t[e]+"</p>";break;case"kwsk":r+='<p class="kwsk">'+t[e]+"</p>";break;case"mnim":r+='<dl class="mnim"><dt>もとのいみ：</dt><dd>'+t[e]+"</dd></dl>";break;case"tigg":r+='<dl class="tigg"><dt>対義語：</dt><dd>'+t[e]+"</dd>"+function(){if(n)return createHtml(serch(jisho,t[e],!0),!1)}()}};for(var o in t)e(o);return r+="</div>"}function createResult(e,t){var n="",r=serch(e,t,!1);for(var o in r)n+=createHtml(r[o],!0);return n.replace("undefined","")}window.onload=function(){input.focus()},input.onkeyup=function(){var e=input.value;result.innerHTML=createResult(jisho,e)},window.document.onkeydown=function(e){if(13===e.keyCode){var t=input.value;window.open("https://www.google.com/search?q="+t)}};