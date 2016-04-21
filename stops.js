var a = [];

jQuery(function() {
	$.getJSON('stops.json', function (data) {
		$.each(data, function(i, field){
			a[i] = field;
		});
	});
});

function getStopLocation(name) {
	for (var i = 0; i < a.length; i++) {
		console.log(i);
		console.log(a[i]['name'].indexOf(name) > -1);
		if (a[i]['name'].indexOf(name) > -1) {
			//return a['location'];
			//console.log(a[i]['location']);
			console.log('found');
		}
	}
	console.log("not found");
}