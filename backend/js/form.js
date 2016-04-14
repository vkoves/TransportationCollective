function drawCharts() {
    pieIssuePerLine();
    recentIssues("Green Line",null,document.getElementById('wow'));
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
 *
 * @param line String which line are we talking about
 * @param stop String or Null which stop. If its null then all stops will be reported for line and stop column will be added to table
 * @param where Element document element where table will be drawn
 */
function recentIssues(line, stop, where) {
    if(stop == null) var queryString = encodeURIComponent('SELECT A,E,F,G WHERE D = "'+line+'"');
    else var queryString = encodeURIComponent('SELECT A,F,G WHERE D = "'+line+'" AND E = "'+stop+'"');
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1oNIORrgb9beapo4S6AiRAwBZrEQ3U-OwYROQvPKnzdI/gviz/tq?gid=1575241258&headers=1&tq=' + queryString);
    query.send(function(response){
        var data = response.getDataTable();

        console.log(data);

        var chart = new google.visualization.Table(where);
        chart.draw(data, null);
    });
}
