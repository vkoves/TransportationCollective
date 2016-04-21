var a = [];

jQuery(function() {
	$.getJSON('backend/stops.json', function (data) {
		$.each(data, function(i, field){
			a[i] = field;
		});
	});
});

function getStopLocation(name) {
	for (var i = 0; i < a.length; i++) {
		if (a[i]['name'].indexOf(name) > -1) {
			return a[i]['location'];
		}
	}
	return null;
}