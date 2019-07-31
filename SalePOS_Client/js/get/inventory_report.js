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

	var SearchString = window.location.search.substring(1);
	$.ajax({
		url: "http://localhost:8000/Product/"
	}).then(function(data) {
		for (var i = 0; i < data.results.length; i++) {
			var tr = $('<tr/>');
			var id=data.results[i].id;
			var product_price=data.results[i].product_price;
			var quantity=data.results[i].quantity;
			var total_stock=product_price * quantity;
			$(tr).append("<td>" + data.results[i].product_name+"</td>");
			$(tr).append("<td>" + data.results[i].quantity+"</td>");
			$(tr).append("<td>" + data.results[i].product_price+"</td>");
			$(tr).append("<td>" + total_stock+"</td>");
			$('#inventory').append(tr);
		}
	});
});


