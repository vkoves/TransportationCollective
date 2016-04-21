var a = {};

jQuery(function() {
	$.getJSON('stops.json', function (data) {
		$.each(data, function(i, field){
			a[i] = field;
		});
	});
});

function getStopLocation(name) {
	if (a['name'].indexOf(name) > -1) {
		//return a['location'];
		console.log(a['location']);
	}
	console.log("not found");
}