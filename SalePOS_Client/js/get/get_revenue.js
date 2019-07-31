$(document).ready(function() {
	var userId = sessionStorage.getItem("userId");
	// var userId = localStorage.getItem("userId");
	$.ajax({
		url: "http://localhost:8000/Staff/"+userId+"/",
	}).then(function(data){
		console.log(data);
		// Check browser support
		if (typeof(Storage) !== "undefined") {
			$('#username').text(data.username);
			$('#dUsername').text(data.username);
			$('#rank').text(data.rank);
			$('#createdDate').text("Member since " + data.created_date);
		}
		else
		{
			$('#username').text("Admin");
			$('#dUsername').text("Admin");
			$('#rank').text("Web Developer");
			$('#createdDate').text("Member since -");
		}
	});

	$.ajax({
		url: "http://localhost:8000/Register/"
	}).then(function(data) {
		var chrtdata = [];
		var labeldata = [];
		var dt = new Date(data.results[0].transaction_date);
		var transaction_date = dt.toDateString();
		for(var i =0; i < data.results.length; i++)
		{
			labeldata.push(transaction_date);
			chrtdata.push(data.results[i].difference)
		}
		var ctx = document.getElementById("revenue").getContext("2d");
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
			labels: labeldata,
				datasets: [{
					label: 'Revenue',
					data: chrtdata,
					backgroundColor: '#82B1FF',
				}]
			}
		});
	});
});
