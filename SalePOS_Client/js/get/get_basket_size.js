$(document).ready(function() {
	$.ajax({
		url: "http://localhost:8000/Sales/"
	}).then(function(data) {
		var chrtdata = [];
		var labeldata = [];
		var total_quantity;
		var basket_size;
		for(var i =0; i < data.results.length; i++)
		{
			var tot_qty = 0;
			if (data.results[i].saledetails_id.length!= 0){
				$.each(data.results[i].saledetails_id, function( key, value ) {
					tot_qty += value.quantity;
				});
			}
			basket_size=tot_qty/data.results.length;

			labeldata.push(data.results[i].transaction_date);

			chrtdata.push(basket_size)
		}
		var ctx = document.getElementById("basket_size").getContext("2d");
		var myChart = new Chart(ctx, {
		type: 'line',
			data: {
				labels: labeldata,
				datasets: [{
					label: 'Basket Size',
					data: chrtdata,
					backgroundColor: '#82B1FF',
				}]
			}
		});
	});
});
