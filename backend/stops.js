var stopsList = stopListJSON;

function getStopLocation(name, line) {
	if(name == null || line == null) //if we got invalid params
		return null; //return null

	name = name.toLowerCase(); //make input's lowercase
	line = line.toLowerCase();

	for (var i = 0; i < stopsList.length; i++)
	{
		var currName = stopsList[i]['name'].toLowerCase(); //get the current location, and make it lowercase

		if (currName.indexOf(name) > -1 && currName.indexOf(line) > -1)
		{
			return stopsList[i]['location'];
		}
	}
	return null;
}