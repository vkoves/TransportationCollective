var userStops = [];
var defaultStopCookie = "favoriteStops=Red:Sox-35th,Blue:Irving Park,Green:35th-Bronzeville-IIT,Purple:Linden,Brown:Western,Yellow:Skokie,Pink:Cicero,Orange:Midway";

$(document).ready(function()
{
	//Cookies tutorial http://www.w3schools.com/js/js_cookies.asp
	document.cookie = defaultStopCookie;
	console.log("Set cookies! \"" + document.cookie + "\"");

	showFavoriteStops();
});

function showFavoriteStops()
{
	var cookieString = defaultStopCookie;
	if(document.cookie.length > 0)
		cookieString = document.cookie;

	var arr = cookieString.split("favoriteStops=");
	var stopString = arr[arr.length - 1];
	var stopArray = stopString.split(",");
	console.log(stopArray);

	for(var i = 0; i < stopArray.length; i++)
	{
		var stop = stopArray[i].split(":");
		var lineName = stop[0];
		var stopName = stop[1];
		$("#overview").append("<div class='stop-listing'><div class='circle " + lineName.toLowerCase() + "'></div>"
			+ "<div class='stop-name'>" + stopName + "</div></div>");
	}
}