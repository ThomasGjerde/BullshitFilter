// ==UserScript==
// @name         Bullshit filter
// @version      0.2
// @description  Userscript for filtering bullshit
// @author       Thomas Gjerde
// @match        http://www.dagbladet.no/
// @match		 http://www.vg.no/
// ==/UserScript==

var keywords = ["farmen","reality-tv"];
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
		if(elem.innerHTML.indexOf(keywords[j]) > -1){
			garbage.push([elements[i],keywords[j]]);
			break;
		}  
	}   
}
for(var i = 0; i < garbage.length; i++) {
    elem = garbage[i][0];
    elem.innerHTML = "Redacted: " + garbage[i][1];
    //elem.parentNode.removeChild(elem);
}
console.log("Removed " + garbage.length + " bullshit element(s)");