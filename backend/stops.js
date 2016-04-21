var a = [];

jQuery(function() {
	$.getJSON('backend/stops.json', function (data) {
		$.each(data, function(i, field){
			a[i] = field;
		});
	});
});

function getStopLocation(name, line) {
	for (var i = 0; i < a.length; i++) {
		if (a[i]['name'].indexOf(name) > -1 && a[i]['name'].indexOf(line) > -1) {
			return a[i]['location'];
		}
	}
	return null;
}