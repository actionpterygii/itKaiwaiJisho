"use strict";var jisho,input=document.getElementById("input"),result=document.getElementById("result"),usageBtn=document.getElementById("usageBtn"),kekkaKopi=document.getElementById("kekkaKopi"),url=window.location.href.replace(/\?.*$/,""),inputValue="",jishoPath="jisho.json",xhr=new XMLHttpRequest;function copyTextToClipboard(e){var t=document.createElement("textarea"),n=document.getElementsByTagName("body")[0];t.textContent=e,n.appendChild(t),t.select(),document.execCommand("copy"),n.removeChild(t)}function getParamValue(e){var t=window.location.href;e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}var wordItems=["kotb","eigo","kwsk","mnim"];function hiraToKata(e){return e.replace(/[\u3041-\u3096]/g,function(e){return String.fromCharCode(e.charCodeAt(0)+96)})}function zenToHan(e){return e.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(e){return String.fromCharCode(e.charCodeAt(0)-65248)})}function containing(e,t){return e=e.toLowerCase().replace(/\s+/g,""),t=t.toLowerCase(),!!e.match(t)||(!!e.match(hiraToKata(t))||!!e.match(zenToHan(t)))}function serch(e,t,n){if("--all"===t)return e;if(""!==t){var o={},r=0;for(var a in e)if(n){var i=wordItems[0];if(e[a][i]===t)return e[a]}else for(var u in wordItems){i=wordItems[u];if(containing(e[a][i],t)){o[r]=e[a],r++;break}}return o}}function createHtml(t,n){var o='<a href="'+encodeURI(url+"?inputValue="+t.kotb+"&displayType=oneWord")+'" class="tango">';console.log(url+"?inputValue="+t.kotb+"&displayType=oneWord"),console.log(t);var e=function(e){if(""!==t[e])switch(e){case"kotb":o+="<h2>"+t[e]+"</h2>";break;case"eigo":o+='<p class="eigo">'+t[e]+"</p>";break;case"kwsk":o+='<p class="kwsk">'+t[e]+"</p>";break;case"mnim":o+='<dl class="mnim"><dt>もとのいみ：</dt><dd>'+t[e]+"</dd></dl>";break;case"tigg":o+='<dl class="tigg"><dt>対義語：</dt><dd>'+t[e]+"</dd>"+function(){if(n)return createHtml(serch(jisho,t[e],!0),!1)}()}};for(var r in t)e(r);return o+="</a>"}function createResult(e,t){var n="",o=serch(e,t,!1);for(var r in o)n+=createHtml(o[r],!0);return n.replace("undefined","")}window.onload=function(){xhr.overrideMimeType("application/json"),xhr.open("GET",jishoPath,!0),xhr.onreadystatechange=function(){xhr.readyState==XMLHttpRequest.DONE&&200==xhr.status&&(jisho=JSON.parse(xhr.responseText||"null"))},xhr.send();var e=getParamValue("inputValue");console.log(e);var t=getParamValue("displayType");console.log(t),e&&("oneWord"==t?(console.log("oneWord"),result.innerHTML=createHtml(serch(jisho,e,!0),!1),console.log(jisho),console.log(e)):"searchResult"==t&&(console.log("searchResult"),result.innerHTML=createResult(jisho,e))),kekkaKopi.setAttribute("href",url)},input.onkeyup=function(){inputValue=input.value,result.innerHTML=createResult(jisho,inputValue),kekkaKopi.setAttribute("href",encodeURI(url+"?inputValue="+inputValue+"&displayType=searchResult"))},window.document.onkeydown=function(e){13===e.keyCode&&window.open("https://www.google.com/search?q="+inputValue)};