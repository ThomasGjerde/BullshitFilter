chrome.browserAction.setBadgeBackgroundColor({ color: "#000000"});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
       localStorage["total_elements"] = request.total_elements;
	   localStorage["headlines"] = request.headlines;
	   chrome.browserAction.setBadgeText({text: String(request.total_elements)});
    }
);