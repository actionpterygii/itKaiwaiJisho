"use strict";var jisho,all_area=document.getElementById("wrap"),input_area=document.getElementById("input_area"),result_area=document.getElementById("result_area"),quickSearch_btns=document.getElementsByClassName("quickSearch_btn"),nyuryoku_btn=document.getElementById("nyuryoku_btn"),random_btn=document.getElementById("random_btn"),guguru_btn=document.getElementById("guguru_btn"),jisho_path="jisho.json",my_xhr_1=new XMLHttpRequest;my_xhr_1.overrideMimeType("application/json"),my_xhr_1.open("GET",jisho_path,!0),my_xhr_1.onreadystatechange=function(){my_xhr_1.readyState==XMLHttpRequest.DONE&&200==my_xhr_1.status&&(jisho=JSON.parse(my_xhr_1.responseText||"null"))},my_xhr_1.send();var word_items=["kotb","eigo","kwsk","btmi","mnim"],guguru_url="https://www.google.com/search?q=",input_text="",selected_text=null;function hiraToKata(t){return t.replace(/[\u3041-\u3096]/g,function(t){return String.fromCharCode(t.charCodeAt(0)+96)})}function zenToHan(t){return t.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(t){return String.fromCharCode(t.charCodeAt(0)-65248)})}function containing(t,e,n){return t=(t=t.replace(/\s+/g,"")).toLowerCase(),e=e.toLowerCase(),n?t===e:!!t.match(e)||(!!t.match(hiraToKata(e))||!!t.match(zenToHan(e)))}function search(t,e,n){if("--all"===e)return t;if(!n){var r={},a=0;for(var u in t)for(var i in word_items){o=word_items[i];if(containing(t[u][o],e,n)){r[a]=t[u],a++;break}}return r}var o=word_items[0];for(var u in t)if(containing(t[u][o],e,n))return[t[u]];return[{"":""}]}function createHtml(t){var e='<div class="tango">';for(var n in t)if(""!==t[n])switch(n){case"kotb":e+='<h2 class="'+n+'">'+t[n]+"</h2>";break;case"eigo":case"kwsk":case"btmi":case"mnim":case"tigg":e+='<p class="'+n+'">'+t[n]+"</p>";break;case"krng":var r="random_"+Math.random().toString(32).substring(2);e+='<div class="'+n+'"><label class="krng_facade" for="'+r+'" value="'+t[n]+'" onClick="createKanrengo(this)"></label><input id="'+r+'" class="krng_checkbox" type="checkbox"><div class="krng_contents"></div></div>'}return e+="</div>"}function createResult(t,e){var n="",r=search(t,e,!1);if(Object.keys(r).length)for(var a in r)n+=createHtml(r[a]);else n+='<h2 class="nothing">nothing</h2>';return n}function createExactResult(t,e){return createHtml(search(t,e,!0)[0])}function createKanrengo(t){var e=t.nextElementSibling.nextElementSibling,n=t.getAttribute("value").split(",");e.innerHTML=function(){var t="";for(var e in n)t+=createExactResult(jisho,n[e]);return t}()}input_area.addEventListener("keyup",function(){input_text=input_area.value,result_area.innerHTML=""!==input_text?createResult(jisho,input_text):""}),all_area.addEventListener("touchend",function(){(selected_text=window.getSelection().toString())?guguru_btn.classList.add("guguru_btn__sentaku"):guguru_btn.classList.remove("guguru_btn__sentaku")}),document.addEventListener("DOMContentLoaded",function(){console.log(quickSearch_btns);var t=function(t){quickSearch_btns[t].addEventListener("click",function(){input_text=quickSearch_btns[t].getAttribute("value"),input_area.value=input_text,result_area.innerHTML=0===input_text.indexOf("--")?createResult(jisho,input_text):createExactResult(jisho,input_text)})};for(var e in quickSearch_btns)t(e)}),nyuryoku_btn.addEventListener("click",function(){input_area.focus()}),random_btn.addEventListener("click",function(){var t=Object.keys(jisho).length,e=Math.floor(Math.random()*t),n=jisho[e];result_area.innerHTML=createHtml(n),input_text=n.kotb,input_area.value=input_text}),guguru_btn.addEventListener("click",function(){selected_text?(window.open(guguru_url+selected_text),selected_text=null,guguru_btn.classList.remove("guguru_btn__sentaku")):window.open(guguru_url+input_text)});