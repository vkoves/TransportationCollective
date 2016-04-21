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
		if (a[i]['name'].indexOf(name) > -1) {
			return a['location'];
		}
	}
	return null;
}