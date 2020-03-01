"use strict";var State=function(){function t(){this.input_text="",this.selected_text=null,this.darkMode_flg=!1,localStorage.getItem("darkMode")&&localStorage.setItem("darkMode","true"),"true"===localStorage.getItem("darkMode")&&(this.changeDarkMode(!1),darkMode_btn.checked=!0)}return t.prototype.inputOverwrite=function(t){input_area.value=t,this.input_text=t},t.prototype.changeDarkMode=function(t){void 0===t&&(t=this.darkMode_flg),t?(style_sheet.setProperty("--text","#555"),style_sheet.setProperty("--background","#FFF"),this.darkMode_flg=!1,localStorage.setItem("darkMode","false")):(style_sheet.setProperty("--text","#FFF"),style_sheet.setProperty("--background","#555"),this.darkMode_flg=!0,localStorage.setItem("darkMode","true"))},t}(),Jisho=function(){function a(t){this.word_items=["kotb","eigo","kwsk","btmi","mnim"],this.last_random_word="";var e=new XMLHttpRequest;e.overrideMimeType("application/json"),e.open("GET",t,!0),e.onreadystatechange=function(){e.readyState==XMLHttpRequest.DONE&&200==e.status&&(jisho.jisho_data=JSON.parse(e.responseText||"null"),jisho.tango_quantity=Object.keys(jisho.jisho_data).length)},e.send()}return a.hiraToKata=function(t){return t.replace(/[\u3041-\u3096]/g,function(t){return String.fromCharCode(t.charCodeAt(0)+96)})},a.zenToHan=function(t){return t.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(t){return String.fromCharCode(t.charCodeAt(0)-65248)})},a.prototype.containing=function(t,e,n){return t=(t=t.replace(/\s+/g,"")).toLowerCase(),e=e.toLowerCase(),n?t===e:!!t.match(e)||(!!t.match(a.hiraToKata(e))||!!t.match(a.zenToHan(e)))},a.prototype.search=function(t,e){if("--all"===t)return this.jisho_data;if(!e){var n=void 0,a=0;for(var r in jisho){i=parseInt(r);for(var o in this.word_items){s=this.word_items[o];if(this.containing(this.jisho_data[i][s],t,e)){n[a]=this.jisho_data[i],a++;break}}}return n}var s=this.word_items[0];for(var r in this.jisho_data){var i=parseInt(r);if(this.containing(this.jisho_data[i][s],t,e))return[this.jisho_data[i]]}return[{"":""}]},a.prototype.createHtml=function(t){var e='<div class="tango">';for(var n in t)if(""!==t[n])switch(n){case"kotb":e+='<div class="tango_head"><h2 class="'+n+'">'+t[n]+"</h2>";break;case"kwsk":e+='</div><p class="'+n+'">'+t[n]+"</p>";break;case"eigo":case"btmi":case"mnim":case"tigg":e+='<p class="'+n+'">'+t[n]+"</p>";break;case"krng":var a="random_"+Math.random().toString(32).substring(2);e+='<div class="'+n+'"><label class="krng_facade" for="'+a+'" value="'+t[n]+'" onClick="jisho.createKanrengo(this)"></label><input id="'+a+'" class="krng_checkbox" type="checkbox"><div class="krng_contents"></div></div>'}return e+="</div>"},a.prototype.createResult=function(t){var e="",n=this.search(t,!1);if(Object.keys(n).length)for(var a in n)e+=this.createHtml(n[a]);else e+='<h2 class="nothing">nothing</h2>';return e},a.prototype.createExactResult=function(t){return this.createHtml(this.search(t,!0)[0])},a.prototype.createRandomOneWordResult=function(){var t=Math.floor(Math.random()*this.tango_quantity),e=this.jisho_data[t];return this.last_random_word=e.kotb,this.createHtml(e)},a.prototype.createKanrengo=function(t){var n=t.nextElementSibling.nextElementSibling,a=t.getAttribute("value").split(",");n.innerHTML=function(){var t="";if(!n.innerHTML)for(var e in a)t+=jisho.createExactResult(a[e]);return t}()},a}(),all_area=document.getElementById("wrap"),input_area=document.getElementById("input_area"),result_area=document.getElementById("result_area"),darkMode_btn=document.getElementById("darkMode_btn"),quickSearch_btns=document.getElementsByClassName("quickSearch_btn"),qrcode_btn=document.getElementById("qrcode_btn"),nyuryoku_btn=document.getElementById("nyuryoku_btn"),random_btn=document.getElementById("random_btn"),guguru_btn=document.getElementById("guguru_btn"),style_sheet=document.documentElement.style,guguru_url="https://www.google.com/search?q=",state=new State,jisho=new Jisho("jisho.json");input_area.addEventListener("keyup",function(){state.input_text=input_area.value.replace(/\s+/g,""),result_area.innerHTML=""!==state.input_text?jisho.createResult(state.input_text):""}),all_area.addEventListener("touchend",function(){state.selected_text=window.getSelection().toString(),state.selected_text?guguru_btn.classList.add("guguru_btn__sentaku"):guguru_btn.classList.remove("guguru_btn__sentaku")}),darkMode_btn.addEventListener("change",function(){state.changeDarkMode()}),document.addEventListener("DOMContentLoaded",function(){for(var t=function(t){quickSearch_btns[t].addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"}),state.input_text=quickSearch_btns[t].getAttribute("value"),input_area.value=state.input_text,result_area.innerHTML=0===state.input_text.indexOf("--")?jisho.createResult(state.input_text):jisho.createExactResult(state.input_text)})},e=0;e<quickSearch_btns.length;e++)t(e)}),qrcode_btn.addEventListener("click",function(){qrcode_btn.nextElementSibling.classList.toggle("qrcode__open")}),nyuryoku_btn.addEventListener("click",function(){input_area.focus()}),random_btn.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"}),result_area.innerHTML=jisho.createRandomOneWordResult(),state.inputOverwrite(jisho.last_random_word)}),guguru_btn.addEventListener("click",function(){state.selected_text?(window.open(guguru_url+state.selected_text),state.selected_text=null,guguru_btn.classList.remove("guguru_btn__sentaku")):window.open(guguru_url+state.input_text)});