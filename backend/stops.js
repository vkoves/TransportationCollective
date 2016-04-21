var a = [];

jQuery(function() {
	$.getJSON('backend/stops.json', function (data) {
		$.each(data, function(i, field){
			a[i] = field;
		});
	});
});

function getStopLocation(name, line) {

	name = name.toLowerCase();
	line = line.toLowerCase();

	for (var i = 0; i < a.length; i++) {
		var currName = a[i]['name'].toLowerCase();
		if (currName.indexOf(name) > -1 && currName.indexOf(line) > -1) {
			return a[i]['location'];
		}
	}
	return null;
}