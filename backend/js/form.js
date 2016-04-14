function drawCharts() {
    pieIssuePerLine();
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
        chart.draw(data, {colors: ['#c60c30', '#00a1de', '#62361b', '#009b3a', '#f9461c', '#522398', '#e27ea6', '#f9e300']});
    }
}