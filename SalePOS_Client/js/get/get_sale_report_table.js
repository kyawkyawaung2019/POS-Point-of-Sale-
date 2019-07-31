$(document).ready(function(){
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
	$.when( 
		$.ajax( "http://localhost:8000/Register/" ), 
		$.ajax( "http://localhost:8000/Sales/" ),
	).then(function(registerdata,saledata){
		var sale_data = saledata[0].results
		var register_data = registerdata[0].results
		var sale_data_formated = [];
		var sale_record = [];
		for(var i =0; i < sale_data.length; i++){
			var cost_of_good_sold = 0;
			var tot_qty = 0;
			var sale_json = {
				"transaction_date":sale_data[i].transaction_date,
				"revenue":sale_data[i].amount_paid,
				"busket_value":sale_data[i].subtotal,
			};
			if (sale_data[i].saledetails_id.length!= 0){
				$.each(sale_data[i].saledetails_id, function( key, value ) {
					cost_of_good_sold += value.sub_total;
					tot_qty += value.quantity;
				});
			}
			sale_json["cost_of_good_sold"] = cost_of_good_sold;
			sale_json["gross_profit"] = sale_data[i].amount_paid - cost_of_good_sold;
			sale_json["busket_size"] = tot_qty;
			sale_data_formated.push(sale_json);
		}
		var sale_unique_date = sale_data_formated.reduce(function(a,b){
			if(a.indexOf(b)<0){
				a.push(b);
			}
			return a;
		},[]);
		for(var i =0; i < sale_data_formated.length; i++){
			var tr = $('<tr/>');
			$(tr).append("<td>"+sale_data_formated[i].transaction_date+"</td>");
			$(tr).append("<td>"+sale_data_formated[i].revenue+"</td>");
			$(tr).append("<td>"+sale_data_formated[i].cost_of_good_sold+"</td>");
			$(tr).append("<td>"+sale_data_formated[i].gross_profit+"</td>");
			$(tr).append("<td>"+sale_data_formated[i].busket_size+"</td>");
			$(tr).append("<td>"+sale_data_formated[i].busket_value+"</td>");
			$('#transaction_date_range').append(tr);
		}
	});
});

