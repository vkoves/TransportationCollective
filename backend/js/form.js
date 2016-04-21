function drawCharts() {
    pieIssuePerLine();

    var options = {
        line: 'Green Line',
    };
    //issuesTable(options,document.getElementById('wow'));
    issuesByType(options,document.getElementById('wow'));
}

function pieIssuePerLine(response) {
    if(typeof(response) == 'undefined') {
        var queryString = encodeURIComponent('SELECT D, COUNT(A) GROUP BY D');
        var query = new google.visualization.Query(
            'https://docs.google.com/spreadsheets/d/1oNIORrgb9beapo4S6AiRAwBZrEQ3U-OwYROQvPKnzdI/gviz/tq?gid=1575241258&headers=1&tq=' + queryString);
        query.send(pieIssuePerLine);
    }
    else {
        if (response.isError()) {
            alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
            return;
        }
        var data = response.getDataTable();

        //If we want to use the number of issues on a line, this would be it
        for (var i = 0; i < data.getNumberOfRows(); i++) {
            var line = data.getValue(i, 0);
            var totalIssues = data.getValue(i, 1);
        };

        var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
        chart.draw(data, {
        	colors: ['#f9e300', '#00a1de', '#62361b', '#009b3a', '#f9461c', '#e27ea6', '#522398', '#c60c30'],	//yellow, blue, brown, green, orange, pink, purple, red
        	width: 400,
        	height: 400
        });
    }
}

/**
 * Draws a table of issues
 * @param options object. Attributes include line, stop, and limit (of number of results)
 * @param element this is the element where the table will be drawn
 */
function issuesTable(options, element) {

    if(typeof(options.line) === 'undefined') {
        throw Error('Line must be specified');
    }

    var queryString = 'SELECT A,E,F,G WHERE D = "'+options.line+'"';

    if(typeof(options.stop) !== 'undefined') {
        queryString += ' AND E = "'+stop+'"';
    }

    queryString += ' ORDER BY A DESC'

    if(typeof(options.limit) !== 'undefined') {
        queryString += ' LIMIT '+options.limit;
    }
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1oNIORrgb9beapo4S6AiRAwBZrEQ3U-OwYROQvPKnzdI/gviz/tq?gid=1575241258&headers=1&tq=' + queryString);
    query.send(function(response){
        var data = response.getDataTable();

        var chart = new google.visualization.Table(element);
        chart.draw(data, null);
    });
}

function issuesByType(options,element) {
    if(typeof(options.line) === 'undefined') {
        throw Error('Line must be specified');
    }

    var queryString = 'SELECT F,COUNT(A) WHERE D = "'+options.line+'"';

    if(typeof(options.stop) !== 'undefined') {
        queryString += ' AND E = "'+stop+'"';
    }

    queryString += ' GROUP BY F';

    if(typeof(options.limit) !== 'undefined') {
        queryString += ' LIMIT '+options.limit;
    }
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1oNIORrgb9beapo4S6AiRAwBZrEQ3U-OwYROQvPKnzdI/gviz/tq?gid=1575241258&headers=1&tq=' + queryString);
    query.send(function(response){
        var data = response.getDataTable();

        var chart = new google.visualization.PieChart(element);
        chart.draw(data, null);
    });
}

function issuesOverTime(options, element)
{
    var queryString = 'SELECT B'; //grab everything from the date column

    if(typeof(options.line) !== 'undefined') {
        queryString += ' WHERE D = "' + options.line + '"';
    }

    if(typeof(options.stop) !== 'undefined') {
        queryString += ' AND E = "' + options.stop + '"';
    }

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1oNIORrgb9beapo4S6AiRAwBZrEQ3U-OwYROQvPKnzdI/gviz/tq?gid=1575241258&headers=1&tq=' + queryString);

    query.send(function(response){
        var data = response.getDataTable();

        var countHash = {}; //a hash to count the number of issues on a date

        for(i = 0; i < data.getNumberOfRows(0); i++) //iterate through the data
        {
            var date = data.getValue(i, 0);
            if(date) //null check
            {
                 var dateSimple = "" + new Date(date.getFullYear(), date.getMonth(), date.getDate()); //convert to a time-less date
                 if(dateSimple in countHash) //and then either increment the hash counter on the date
                    countHash[dateSimple] += 1;
                else //or set it to one if it's the first issue
                    countHash[dateSimple] = 1;
            }
        }

        var allDates = Object.keys(countHash);
        var date = new Date(allDates[0]);
        var lastDate = new Date(allDates[allDates.length - 1]);
        while(date < lastDate)
        {
            date.setDate(date.getDate()+1);
            var dateString = "" + date;
            if(!(dateString in countHash))
                countHash[dateString] = 0;
        }

        var dataT = new google.visualization.DataTable(); //then create a new data table
        dataT.addColumn('date', 'Date'); //add columns
        dataT.addColumn('number', 'Issues');

        for(key in countHash) //iterate through the hash
        {
            dataT.addRow([new Date(key), countHash[key]]); //and add a row to the data table
        }
        dataT.sort(0); //apply sorting by the date column

        var chart = new google.visualization.LineChart(element);
        chart.draw(dataT, {pointSize: 5, colors: [options["color"]]}); //draw the chart with points visible
    });
}

function issuesMap(options, element)
{
    var queryString = 'SELECT D, E'; //grab everything from the date column

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1oNIORrgb9beapo4S6AiRAwBZrEQ3U-OwYROQvPKnzdI/gviz/tq?gid=1575241258&headers=1&tq=' + queryString);

    query.send(function(response){
        var data = response.getDataTable();

        var dataT = new google.visualization.DataTable(); //then create a new data table
        dataT.addColumn('number', 'Latitude'); //add columns
        dataT.addColumn('number', 'Longitude');
        dataT.addColumn('string', 'Issues');

        var issueHash = {}; //For counting issues

        for(i = 0; i < data.getNumberOfRows(0); i++) //iterate through the data
        {
            var line = data.getValue(i,0);
            var stop = data.getValue(i,1);

            if(line == null || stop == null) //if the stop or the  line is null
                continue; //skip it!

            var location = line + ": " + stop;

            if(location in issueHash)
                issueHash[location] += 1;
            else
                issueHash[location] = 1;
        }

        var mapOptions = {
          zoom: 10,
          center: {lat: 41.8781, lng: -87.6298},
          mapTypeId: google.maps.MapTypeId.NORMAL
        };

        var map = new google.maps.Map(element, mapOptions);

        var geoJSON = [];

        for(location in issueHash)
        {
            var locArr = location.split(":");
            var latLongString = getStopLocation(locArr[1].trim(), locArr[0]);
            if(latLongString)
            {
                var latString = latLongString.split(",")[0].replace(/["'()]/g,"");
                var longString = latLongString.split(",")[1].replace(/["'()]/g,"");
                var latitude = parseFloat(latString);
                var longitude = parseFloat(longString);

                var obj = {};
                obj["type"] = "Feature";
                obj["geometry"] = {"type": "Point", "coordinates": [latitude, longitude]};
                obj["properties"] = {"name": "Test"};

                geoJSON.push(obj);

                /*
                var marker = new google.maps.Marker({
                    position: {lat: latitude, lng: longitude},
                    map: map,
                    title: 'Hello World!'
                });
                */
                dataT.addRow([latitude, longitude, location + "<br>" + "Issues: " + issueHash[location]]);
            }
        }

        console.log(geoJSON);
        map.data.loadGeoJson(geoJSON);
        // var mapOptions = { showTip: true, mapType: "normal", enableScrollWheel: true };

        //var map = new google.visualization.Map(element);

        map.data.setStyle(function(feature) {
            console.log(feature);
            var magnitude = feature.getProperty('mag');
            return {
                icon: getCircle(2)
            };
        });



        //map.draw(dataT, mapOptions);
    });
}

function getCircle(magnitude) {
  var circle = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'red',
    fillOpacity: .2,
    scale: Math.pow(2, magnitude) / 2,
    strokeColor: 'white',
    strokeWeight: .5
  };
  return circle;
}


function recentIssues(limit, element)
{
    var queryString = 'SELECT B, D, E, F'; //time, line, stop and incident type

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1oNIORrgb9beapo4S6AiRAwBZrEQ3U-OwYROQvPKnzdI/gviz/tq?gid=1575241258&headers=1&tq=' + queryString);

    query.send(function(response){
        var data = response.getDataTable();
        data.sort({column: 0, desc: true}); //sort by date

        for(i = 0; i < data.getNumberOfRows(0); i++) //iterate through the data
        {
            var time = new Date(data.getValue(i,0));
            var line = data.getValue(i,1);
            var stop = data.getValue(i,2);
            var type = data.getValue(i,3);

            if(time == null || line == null || stop == null || type == null)
                continue;

            $(element).append("<div class='issue-listing'>"
                + "<div class='circle " + line.split(" ")[0].toLowerCase() + "'></div>"
                + "<div class='issue-text'>"
                + "<span class='location'>" + stop + "</span>" + " - "
                + "<span class='date'>" + time.toDateString() + "</span>" + " - "
                + "<span class='type'>" + type + "</span>"
                + "</div></div>");
        }
    });
}