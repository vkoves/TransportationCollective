//		https://spreadsheets.google.com/tq?&tq=&key=1oNIORrgb9beapo4S6AiRAwBZrEQ3U-OwYROQvPKnzdI&gid=2

function drawChart() {
	// Define the chart to be drawn.
	/*
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Element');
	data.addColumn('number', 'Percentage');
	data.addRows([
		['Nitrogen', 0.78],
		['Oxygen', 0.21],
		['Other', 0.01]
	]);
	
	// Instantiate and draw the chart.
	var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
	chart.draw(data, null);
	*/
	
	
	
	//var query = new google.visualization.Query(
        //'http://spreadsheets.google.com/tq?key=pCQbetd-CptGXxxQIG7VFIQ&pub=1');
        //'https://docs.google.com/spreadsheets/d/1oNIORrgb9beapo4S6AiRAwBZrEQ3U-OwYROQvPKnzdI/edit#gid=1575241258'
        //'https://spreadsheets.google.com/tq?key=1oNIORrgb9beapo4S6AiRAwBZrEQ3U-OwYROQvPKnzdI&pub=1');
    //    'https://docs.google.com/spreadsheets/d/1oNIORrgb9beapo4S6AiRAwBZrEQ3U-OwYROQvPKnzdI/edit?usp=sharing');
        
    //console.log(query);
//}

//function drawVisualization() {
    //var query = new google.visualization.Query(
    //    'http://spreadsheets.google.com/tq?key=pCQbetd-CptGXxxQIG7VFIQ&pub=1');
     
    var queryString = encodeURIComponent('SELECT D,R LIMIT 20');
    
    var query = new google.visualization.Query(
          'https://docs.google.com/spreadsheets/d/1oNIORrgb9beapo4S6AiRAwBZrEQ3U-OwYROQvPKnzdI/edit#gid=1575241258&headers=1&tq=' + queryString);
      query.send(handleQueryResponse);

    // Apply query language statement.
    //query.setQuery('SELECT A,D WHERE D > 100 ORDER BY D');
    
    // Send the query with a callback function.
    //query.send(handleQueryResponse);
  }

  function handleQueryResponse(response) {
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }

    var data = response.getDataTable();
    console.log(data);
    /*visualization = new google.visualization.LineChart(document.getElementById('myPieChart'));
    visualization.draw(data, {legend: 'bottom'});*/
   
   var table = new google.visualization.Table(document.getElementById('myPieChart'));

        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
  }
  




function lineIssues() {
	var queryString = encodeURIComponent('SELECT D, count(*)');
	var query = new google.visualization.Query(
          'https://docs.google.com/spreadsheets/d/1oNIORrgb9beapo4S6AiRAwBZrEQ3U-OwYROQvPKnzdI/gviz/tq?gid=1575241258&headers=1&tq=' + queryString);
    //query.setQuery('SELECT D, count(*)');
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
