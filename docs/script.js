"use strict";var jisho,input_area=document.getElementById("input_area"),result_area=document.getElementById("result_area"),nyuryoku_btn=document.getElementById("nyuryoku_btn"),guguru_btn=document.getElementById("guguru_btn"),jisho_path="jisho.json",my_xhr_1=new XMLHttpRequest;my_xhr_1.overrideMimeType("application/json"),my_xhr_1.open("GET",jisho_path,!0),my_xhr_1.onreadystatechange=function(){my_xhr_1.readyState==XMLHttpRequest.DONE&&200==my_xhr_1.status&&(jisho=JSON.parse(my_xhr_1.responseText||"null"))},my_xhr_1.send();var word_items=["kotb","eigo","kwsk","mnim"],input_value="",selected_text=null;function hiraToKata(e){return e.replace(/[\u3041-\u3096]/g,function(e){return String.fromCharCode(e.charCodeAt(0)+96)})}function zenToHan(e){return e.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(e){return String.fromCharCode(e.charCodeAt(0)-65248)})}function containing(e,t,n){return e=(e=e.replace(/\s+/g,"")).toLowerCase(),t=t.toLowerCase(),n?e===t:!!e.match(t)||(!!e.match(hiraToKata(t))||!!e.match(zenToHan(t)))}function scarch(e,t,n){if("--all"===t)return e;if(!n){var r={},a=0;for(var u in e)for(var i in word_items){o=word_items[i];if(containing(e[u][o],t,n)){r[a]=e[u],a++;break}}return r}var o=word_items[0];for(var u in e)if(containing(e[u][o],t,n))return[e[u]];return e}function createHtml(e){var t='<div class="tango">';for(var n in e)if(""!==e[n])switch(n){case"kotb":t+='<h2 class="kotb">'+e[n]+"</h2>";break;case"eigo":t+='<p class="eigo">'+e[n]+"</p>";break;case"kwsk":t+='<p class="kwsk">'+e[n]+"</p>";break;case"mnim":t+='<p class="mnim">'+e[n]+"</p>";break;case"tigg":t+='<p class="tigg">'+e[n]+"</p>";break;case"krng":var r="random_"+Math.random().toString(32).substring(2);t+='<div class="krng"><label class="krng_facade" for="'+r+'" value="'+e[n]+'" onClick="createKanrengo(this)"></label><input id="'+r+'" class="krng_checkbox" type="checkbox"><div class="krng_contents"></div></div>'}return t+="</div>"}function createResult(e,t){var n="",r=scarch(e,t,!1);for(var a in r)n+=createHtml(r[a]);return n}function createKanrengo(e){var t=e.nextElementSibling.nextElementSibling,n=e.getAttribute("value").split(",");t.innerHTML=function(){var e="";for(var t in n){e+=createHtml(scarch(jisho,n[t],!0)[0])}return e}()}input_area.addEventListener("keyup",function(){input_value=input_area.value,result_area.innerHTML=""!==input_value?createResult(jisho,input_value):""}),result_area.addEventListener("touchend",function(){(selected_text=window.getSelection().toString())?guguru_btn.classList.add("guguru_btn__sentaku"):guguru_btn.classList.remove("guguru_btn__sentaku")}),nyuryoku_btn.addEventListener("click",function(){input_area.focus()}),guguru_btn.addEventListener("click",function(){selected_text?(window.open("https://www.google.com/search?q="+selected_text),selected_text=null,guguru_btn.classList.remove("guguru_btn__sentaku")):window.open("https://www.google.com/search?q="+input_value)});