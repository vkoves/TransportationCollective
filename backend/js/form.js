function lineIssues() {
	var queryString = encodeURIComponent('SELECT D');
	var query = new google.visualization.Query(
          'https://docs.google.com/spreadsheets/d/1oNIORrgb9beapo4S6AiRAwBZrEQ3U-OwYROQvPKnzdI/gviz/tq?gid=1575241258&headers=1&tq=' + queryString);
    query.send(lineIssuesQuery);
}
function lineIssuesQuery(response) {
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
    }
    
    var data = response.getDataTable();
    
    console.log(data);
    
    var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
	chart.draw(data, null);
}
