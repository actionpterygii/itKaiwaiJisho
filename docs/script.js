"use strict";var State=function(){function e(e,t,a){this.selected_text=null,this.input_area=e,this.darkMode_btn=t,this.style_sheet=a,null===localStorage.getItem("darkMode")&&localStorage.setItem("darkMode","true"),"true"===localStorage.getItem("darkMode")&&(this.darkMode_btn.checked=!0,this.changeDarkMode())}return Object.defineProperty(e.prototype,"_darkMode_btn",{get:function(){return this.darkMode_btn},enumerable:!0,configurable:!0}),e.prototype.changeDarkMode=function(){this.darkMode_btn.checked?(this.style_sheet.setProperty("--text",white),this.style_sheet.setProperty("--background",black),localStorage.setItem("darkMode","true")):(this.style_sheet.setProperty("--text",black),this.style_sheet.setProperty("--background",white),localStorage.setItem("darkMode","false"))},e}(),Jisho=function(){function n(e,t){this.word_items=["kotb","eigo","kwsk","btmi","mnim"],this.last_random_word="";var a=this,n=new XMLHttpRequest;n.overrideMimeType("application/json"),n.open("GET",e,!0),n.onreadystatechange=function(){n.readyState==XMLHttpRequest.DONE&&200==n.status&&(a.jisho_data=JSON.parse(n.responseText||"null"),a.tango_quantity=Object.keys(a.jisho_data).length)},n.send(),this.krngJisho_instance_name=t}return n.hiraToKata=function(e){return e.replace(/[\u3041-\u3096]/g,function(e){return String.fromCharCode(e.charCodeAt(0)+96)})},n.zenToHan=function(e){return e.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(e){return String.fromCharCode(e.charCodeAt(0)-65248)})},Object.defineProperty(n.prototype,"_last_random_word",{get:function(){return this.last_random_word},enumerable:!0,configurable:!0}),n.prototype.containing=function(e,t,a){return e=(e=e.replace(/\s+/g,"")).toLowerCase(),t=t.toLowerCase(),a?e===t:!!e.match(t)||(!!e.match(n.hiraToKata(t))||!!e.match(n.zenToHan(t)))},n.prototype.search=function(e,t){if("--all"===e)return this.jisho_data;if(!t){var a={},n=0;for(var r in this.jisho_data)for(var o in this.word_items){s=this.word_items[o];if(this.containing(this.jisho_data[r][s],e,t)){a[n]=this.jisho_data[r],n++;break}}return a}var s=this.word_items[0];for(var r in this.jisho_data)if(this.containing(this.jisho_data[r][s],e,t))return[this.jisho_data[r]];return[{"":""}]},n.prototype.generateHTML=function(e){var t='<div class="tango">';for(var a in e)if(""!==e[a])switch(a){case"kotb":t+='<div class="tango_head"><h2 class="'+a+'">'+e[a]+"</h2>";break;case"kwsk":t+='</div><p class="'+a+'">'+e[a]+"</p>";break;case"eigo":case"btmi":case"mnim":case"tigg":t+='<p class="'+a+'">'+e[a]+"</p>";break;case"krng":var n="random_"+Math.random().toString(32).substring(2);t+='<div class="'+a+'"><label class="krng_facade" for="'+n+'" value="'+e[a]+'" onClick="'+this.krngJisho_instance_name+'.createKanrengo(this)"></label><input id="'+n+'" class="krng_checkbox" type="checkbox"><div class="krng_contents"></div></div>'}return t+="</div>"},n.prototype.createResult=function(e){var t="";e=e.replace(/\s+/g,"");var a=this.search(e,!1);if(Object.keys(a).length)for(var n in a)t+=this.generateHTML(a[n]);else t+='<h2 class="nothing">nothing</h2>';return t},n.prototype.createExactResult=function(e){return this.generateHTML(this.search(e,!0)[0])},n.prototype.createRandomOneTangoResult=function(){var e=Math.floor(Math.random()*this.tango_quantity),t=this.jisho_data[e];return this.last_random_word=t[this.word_items[0]],this.generateHTML(t)},n.prototype.createKanrengo=function(e){var t=e.nextElementSibling.nextElementSibling,a=e.getAttribute("value").split(","),n="";if(!t.innerHTML)for(var r in a)n+=this.createExactResult(a[r]);t.innerHTML=n},n}(),Hoshi=function(){function t(){var e=Math.floor(100*Math.random());this.element=t.createImageElement(99===e?t.hoshiPath_superRare1:98===e?t.hoshiPath_superRare2:97===e?t.hoshiPath_superRare3:70<=e?t.hoshiPath_rare:t.hoshiPath_normal)}return t.createImageElement=function(e){var t=document.createElement("img");return t.classList.add("hoshi"),t.setAttribute("src",e),t},Object.defineProperty(t.prototype,"_element",{get:function(){return this.element},enumerable:!0,configurable:!0}),t.hoshiPath_normal="images/hoshixxx.svg",t.hoshiPath_rare="images/hoshixxx_a1.svg",t.hoshiPath_superRare1="images/hoshixxx_a2.svg",t.hoshiPath_superRare2="images/hoshixxx_a3.svg",t.hoshiPath_superRare3="images/hoshixxx_a4.svg",t}(),all_area=document.getElementById("wrap"),result_area=document.getElementById("result_area"),quickSearch_btns=document.getElementsByClassName("quickSearch_btn"),qrcode_btn=document.getElementById("qrcode_btn"),nyuryoku_btn=document.getElementById("nyuryoku_btn"),random_btn=document.getElementById("random_btn"),guguru_btn=document.getElementById("guguru_btn"),guguru_url="https://www.google.com/search?q=",black="#555",white="#FFF",blue="#3CC",yello="#FF6",pink="#F9F",green="#9F6",orange="#F93",purple="#96F",state=new State(document.getElementById("input_area"),document.getElementById("darkMode_btn"),document.documentElement.style),jisho=new Jisho("jisho.json","jisho");document.addEventListener("DOMContentLoaded",function(){for(var e=function(e){quickSearch_btns[e].addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"}),state.input_area.value=quickSearch_btns[e].getAttribute("value"),result_area.innerHTML=0===state.input_area.value.indexOf("--")?jisho.createResult(state.input_area.value):jisho.createExactResult(state.input_area.value)})},t=0;t<quickSearch_btns.length;t++)e(t)}),state.input_area.addEventListener("keyup",function(){result_area.innerHTML=""!==state.input_area.value?jisho.createResult(state.input_area.value):""}),all_area.addEventListener("touchend",function(){state.selected_text=window.getSelection().toString(),state.selected_text?guguru_btn.classList.add("guguru_btn__sentaku"):guguru_btn.classList.remove("guguru_btn__sentaku")}),state._darkMode_btn.addEventListener("change",function(){state.changeDarkMode()}),qrcode_btn.addEventListener("click",function(){qrcode_btn.nextElementSibling.classList.toggle("qrcode__open")}),nyuryoku_btn.addEventListener("click",function(){state.input_area.focus()}),random_btn.addEventListener("click",function(){var e=(new Hoshi)._element;all_area.appendChild(e),window.scrollTo({top:0,behavior:"smooth"}),result_area.innerHTML=jisho.createRandomOneTangoResult(),state.input_area.value=jisho._last_random_word}),guguru_btn.addEventListener("click",function(){state.selected_text?(window.open(guguru_url+state.selected_text),state.selected_text=null,guguru_btn.classList.remove("guguru_btn__sentaku")):window.open(guguru_url+state.input_area.value)});