var userStops = [];

$(document).ready(function()
{
	//Cookies tutorial http://www.w3schools.com/js/js_cookies.asp
	document.cookie = "favoriteStops=Red:Sox-35th,Blue:Irving Park,Green:35th-Bronzeville-IIT,"
	console.log("Set cookies! \"" + document.cookie + "\"");

	showFavoriteStops();
});

function showFavoriteStops()
{
	var arr = document.cookie.split("favoriteStops=");
	var stopString = arr[arr.length];
	var stopArray = stopString.split(",");
	console.log("Stop arr: ");
	console.log(stopArray);
}