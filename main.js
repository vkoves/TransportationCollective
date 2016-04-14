var userStops = [];
var defaultStopCookie = "favoriteStops=red:Sox-35th,blue:Irving Park,green:35th-Bronzeville-IIT,purple:Linden,brown:Western,yellow:Skokie,pink:Cicero,orange:Midway";
var stopCookie = "";
var settingsPage = false;

$(document).ready(function()
{
	//Cookies tutorial http://www.w3schools.com/js/js_cookies.asp

	showFavoriteStops();

	if(settingsPage)
		initSettings();
});

function initSettings()
{
	console.log("TEST");

	$("#line-choices .circle").click(function()
	{
		$("#line-choices .circle").removeClass("selected");
		$(this).addClass("selected");
	});

	$("#add-stop").click(function()
	{
		parseStopAdder();
	});

	$("#line-name").keypress(function(e)
	{
		if(e.keyCode == 13)
		{
			parseStopAdder();
		}
	});

	$(".stop-listing .delete").click(function()
	{
		var parent = $(this).parent();
		parent.slideUp();
		removeStop(parent.attr("data-line"), parent.attr("data-stop"));
	});
}

function showFavoriteStops()
{
	var cookieString = defaultStopCookie;
	if(document.cookie.length > 0)
	{
		cookieString = document.cookie;
		console.log("Found valid cookie: " + document.cookie);
	}

	var arr = cookieString.split("favoriteStops=");
	stopCookie = arr[arr.length - 1];
	var stopArray = stopCookie.split(",");
	console.log(stopArray);

	for(var i = 0; i < stopArray.length; i++)
	{
		var stop = stopArray[i].split(":");
		var lineName = stop[0];
		var stopName = stop[1];
		appendStopDiv(lineName, stopName);
	}
}

function parseStopAdder()
{
	if($("#line-choices .circle.selected").length == 0) //if there is not a selected line
	{
		alert("Please select a line!");
		return;
	}

	//submit data
	var lineName = $("#line-choices .circle.selected").attr("class").split(" ")[1];
	var stopName = $("#line-name").val();
	addStop(lineName, stopName);
	//clear data
	$("#line-choices .circle").removeClass("selected");
	$("#line-name").val("");
}

function addStop(lineName, stopName)
{
	stopCookie = "favoriteStops=" + stopCookie + "," + lineName + ":" + stopName;
	document.cookie = stopCookie;
	appendStopDiv(lineName, stopName);

	$(".stop-listing .delete").click(function()
	{
		var parent = $(this).parent();
		parent.slideUp();
		removeStop(parent.attr("data-line"), parent.attr("data-stop"));
	});
}

function removeStop(lineName, stopName)
{
	var stopArray = stopCookie.split(",");
	var index = stopArray.indexOf(lineName + ":" + stopName);

	if(index > -1)
		stopArray.splice(index, 1);
	else
		console.log("ERROR: Couldn't find stop to remove.");

	stopCookie = stopArray.join(",");
	document.cookie = "favoriteStops=" + stopCookie;
}

function appendStopDiv(lineName, stopName)
{
	$("#stops-list").append("<div class='stop-listing' data-line='" + lineName.toLowerCase() + "' data-stop='" + stopName + "'>"
		+ "<div class='circle " + lineName.toLowerCase() + "'></div>"
		+ "<div class='stop-name'>" + stopName + "</div><div class='delete'></div></div>");
}