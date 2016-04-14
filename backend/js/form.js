function drawCharts() {
    pieIssuePerLine();
    recentIssues("Green Line","Roosevelt",document.getElementById('wow'));
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

        console.log(data);

        var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
        chart.draw(data, null);
    }
}

/**
 *
 * @param line String which line are we talking about
 * @param stop String which stop
 * @param where Element document element where table will be drawn
 */
function recentIssues(line, stop, where) {
    var queryString = encodeURIComponent('SELECT F,G WHERE D = "'+line+'" AND E = "'+stop+'"');
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1oNIORrgb9beapo4S6AiRAwBZrEQ3U-OwYROQvPKnzdI/gviz/tq?gid=1575241258&headers=1&tq=' + queryString);
    query.send(function(response){
        var data = response.getDataTable();

        console.log(data);

        var chart = new google.visualization.Table(where);
        chart.draw(data, null);
    });
}