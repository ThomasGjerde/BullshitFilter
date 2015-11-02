window.addEventListener('DOMContentLoaded', function() {
	document.getElementById('total').textContent = localStorage["total_elements"];
	var headlineList = localStorage["headlines"].split(",");
	var output = '<ul class="list-group">';
	for(var i = 0; i < headlineList.length; i++){
		output += '<li class="list-group-item">' + headlineList[i] + '</li>';
	}
	output += '</ul>';
	document.getElementById('headlines').innerHTML = output;
});
