$(document).ready(function() {
	var SearchString = window.location.search.substring(1);
	$.ajax({
		url: "http://localhost:8000/Sales/"
	}).then(function(data) {
		var chrtdata = [];
		var labeldata = [];
		for(var i =0; i < data.results.length; i++)
		{
			labeldata.push(data.results[i].transaction_date);
			chrtdata.push(data.results[i].paid)
		}
		var ctx = document.getElementById("sale").getContext("2d");
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: labeldata,
				datasets: [{
					label: 'Sale',
					data: chrtdata,
					backgroundColor: "#F44336"
				}]
			}
		});
	});
});


