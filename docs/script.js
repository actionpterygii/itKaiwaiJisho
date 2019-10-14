"use strict";var jisho,input_area=document.getElementById("input_area"),result_area=document.getElementById("result_area"),nyuryoku_btn=document.getElementById("nyuryoku_btn"),guguru_btn=document.getElementById("guguru_btn"),input_value="",word_items=["kotb","eigo","kwsk","mnim"],jisho_path="jisho.json",my_xhr_1=new XMLHttpRequest;function hiraToKata(e){return e.replace(/[\u3041-\u3096]/g,function(e){return String.fromCharCode(e.charCodeAt(0)+96)})}function zenToHan(e){return e.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(e){return String.fromCharCode(e.charCodeAt(0)-65248)})}function containing(e,n,t){return e=(e=e.replace(/\s+/g,"")).toLowerCase(),n=n.toLowerCase(),t?e===n:!!e.match(n)||(!!e.match(hiraToKata(n))||!!e.match(zenToHan(n)))}function scarch(e,n,t){if("--all"===n)return e;if(!t){var r={},a=0;for(var i in e)for(var o in word_items){u=word_items[o];if(containing(e[i][u],n,t)){r[a]=e[i],a++;break}}return r}var u=word_items[0];for(var i in e)if(containing(e[i][u],n,t))return[e[i]];return e}function createHtml(e){var n='<div class="tango">';for(var t in e)if(""!==e[t])switch(t){case"kotb":n+='<h2 class="kotb">'+e[t]+"</h2>";break;case"eigo":n+='<p class="eigo">'+e[t]+"</p>";break;case"kwsk":n+='<p class="kwsk">'+e[t]+"</p>";break;case"mnim":n+='<p class="mnim">'+e[t]+"</p>";break;case"tigg":n+='<p class="tigg">'+e[t]+"</p>";break;case"krng":var r="random_"+Math.random().toString(32).substring(2);n+='<div class="krng"><label class="krng_facade" for="'+r+'" value="'+e[t]+'" onClick="createKanrengo(this)"></label><input id="'+r+'" class="krng_checkbox" type="checkbox"><div class="krng_contents"></div></div>'}return n+="</div>"}function createResult(e,n){var t="",r=scarch(e,n,!1);for(var a in r)t+=createHtml(r[a]);return t.replace("undefined","")}function createKanrengo(e){var n=e.nextElementSibling.nextElementSibling,t=e.getAttribute("value").split(",");n.innerHTML=function(){var e="";for(var n in t){e+=createHtml(scarch(jisho,t[n],!0)[0])}return e}()}my_xhr_1.overrideMimeType("application/json"),my_xhr_1.open("GET",jisho_path,!0),my_xhr_1.onreadystatechange=function(){my_xhr_1.readyState==XMLHttpRequest.DONE&&200==my_xhr_1.status&&(jisho=JSON.parse(my_xhr_1.responseText||"null"))},my_xhr_1.send(),input_area.addEventListener("keyup",function(){input_value=input_area.value,result_area.innerHTML=""!==input_value?createResult(jisho,input_value):""}),nyuryoku_btn.addEventListener("click",function(){input_area.focus()}),guguru_btn.addEventListener("click",function(){window.open("https://www.google.com/search?q="+input_value)});