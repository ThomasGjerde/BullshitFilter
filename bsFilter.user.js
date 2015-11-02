// ==UserScript==
// @name         Bullshit filter
// @version      0.3
// @description  Userscript for filtering bullshit
// @author       Thomas Gjerde
// @match        http://www.dagbladet.no/
// @match		 http://www.vg.no/
// ==/UserScript==

var keywords = ["farmen","reality-tv","dagbladet pluss","paradise","pluss.vg.no","minmote","bieber","rosablogg","sponset.vg.no","skal vi danse","/rampelys/"];
var garbage = [];
var elements;
if(location.hostname == "www.dagbladet.no"){
	//console.log("DB.no");
	elements = document.getElementsByTagName('article');
}else if(location.hostname == "www.vg.no"){
	//console.log("VG.no");
	elements = [];
	var vgElements = document.getElementsByTagName('div');
    for (var i in vgElements) {
        if((vgElements[i].className + "").indexOf("article-content") > -1) {
			elements.push(vgElements[i]);
		}		
	}
}
for(var i = 0; i < elements.length; i++) {
	elem = elements[i];
	for(var j = 0; j < keywords.length; j++){
		if(elem.innerHTML.toLowerCase().indexOf(keywords[j]) > -1){
		//console.log("Headline: " + elem.innerHTML.replace(/(<([^>]+)>)/ig,""));
		var headline = elem.innerText.replace(/ +(?= )/g,'').replace(/\t/g,""); //Strip concurrent whitespaces and tabs
			garbage.push([elements[i],keywords[j],headline.substring(0,Math.min(headline.length,25)) + "..."]);
			break;
		}  
	}   
}
var csvString = "";
var delimiter = "";
for(var i = 0; i < garbage.length; i++) {
    elem = garbage[i][0];
    elem.innerHTML = "Filtered: " + garbage[i][1];
	console.log("Headline: " + garbage[i][2]);
	csvString += delimiter + garbage[i][2].replace(",","&#44;");
	delimiter = ",";
    //elem.parentNode.removeChild(elem);
}
console.log("Removed " + garbage.length + " bullshit element(s)");
chrome.runtime.sendMessage({
  total_elements: garbage.length,
  headlines: csvString
});