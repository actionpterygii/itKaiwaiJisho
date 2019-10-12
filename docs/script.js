"use strict";var jisho,input=document.getElementById("input"),result=document.getElementById("result"),nyuryoku_btn=document.getElementById("nyuryoku_btn"),guguru_btn=document.getElementById("guguru_btn"),input_value="",jisho_path="jisho.json",xhr=new XMLHttpRequest;xhr.overrideMimeType("application/json"),xhr.open("GET",jisho_path,!0),xhr.onreadystatechange=function(){xhr.readyState==XMLHttpRequest.DONE&&200==xhr.status&&(jisho=JSON.parse(xhr.responseText||"null"))},xhr.send();var word_items=["kotb","eigo","kwsk","mnim"];function hiraToKata(e){return e.replace(/[\u3041-\u3096]/g,function(e){return String.fromCharCode(e.charCodeAt(0)+96)})}function zenToHan(e){return e.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(e){return String.fromCharCode(e.charCodeAt(0)-65248)})}function containing(e,t,n){return e=(e=e.replace(/\s+/g,"")).toLowerCase(),t=t.toLowerCase(),n?e===t||void 0:!!e.match(t)||(!!e.match(hiraToKata(t))||!!e.match(zenToHan(t)))}function serch(e,t,n){if("--all"===t)return e;if(""!==t){var r={},a=0;for(var i in e)if(n){var o=word_items[0];if(containing(e[i][o],t,n))return e[i]}else for(var s in word_items){o=word_items[s];if(containing(e[i][o],t,n)){r[a]=e[i],a++;break}}return r}}function createHtml(e){var t='<div class="tango">';for(var n in e)if(""!==e[n])switch(n){case"kotb":t+="<h2>"+e[n]+"</h2>";break;case"eigo":t+='<p class="eigo">'+e[n]+"</p>";break;case"kwsk":t+='<p class="kwsk">'+e[n]+"</p>";break;case"mnim":t+='<dl class="mnim"><dt>もとのいみ：</dt><dd>'+e[n]+"</dd></dl>";break;case"tigg":t+='<dl class="tigg"><dt>対義語：</dt><dd>'+e[n]+"</dd></dl>";break;case"krng":var r=e.kotb+(new Date).getTime();t+='<div class="krng"><label class="krng_facade" for="'+r+'" value="'+e[n]+'" onClick="createKanrengo(this)"><span class="krng_facade_title">関連語</span><span class="krng_facade_mark"></span></label><input id="'+r+'" class="krng_checkbox" type="checkbox"><div class="krng_contents"></div></div>'}return t+="</div>"}function createKanrengo(e){var t=e.nextElementSibling.nextElementSibling,n=e.getAttribute("value").split(",");t.innerHTML=function(){var e="";for(var t in n)e+=createHtml(serch(jisho,n[t],!0));return e}()}function createResult(e,t){var n="",r=serch(e,t,!1);for(var a in r)n+=createHtml(r[a]);return n.replace("undefined","")}input.addEventListener("keyup",function(){input_value=input.value,result.innerHTML=createResult(jisho,input_value)}),nyuryoku_btn.addEventListener("click",function(){input.focus()}),guguru_btn.addEventListener("click",function(){window.open("https://www.google.com/search?q="+input_value)});