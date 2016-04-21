function getStopLocation() {
	var a = {};
	
	$.getJSON('stops.json', function (data) {
		$.each(data, function(i, field){
			a[i] = field;
			console.log(i);
			console.log(field);
			//$("posts").append(field + " ");
		});
		console.log(data);
		console.log(a);

		
		if (a['name'] === name) {
			
		}

		//addPost(a['postid'], q, a['likes'], a['message']);
	});
}