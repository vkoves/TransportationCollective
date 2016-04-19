function drawCharts() {
    pieIssuePerLine();

    var options = {
        line: 'Green Line',
    };
    //recentIssues(options,document.getElementById('wow'));
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
function recentIssues(options, element) {

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
