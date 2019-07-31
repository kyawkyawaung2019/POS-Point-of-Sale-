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

	$.ajax({
		url:"http://localhost:8000/Register/",
	}).then(function(register_data){
		if(register_data.results.length != 0)
		{
			var sts = register_data.results[register_data.results.length-1].status;
			if(sts == "Opened")
			{
				$('#openRegister').hide();
				
				$('#closeRegister').show();
				FillCloseRegister();
			}
			else if(sts == "Closed")
			{
				$('#closeRegister').hide();
				
				$('#openRegister').show();
			}
			else 
			{
				alert("Something is wrong!\nPlease contact to developer.");
			}
		}
		else 
		{
			$('#closeRegister').hide();
			
			$('#openRegister').show();
		}
	});
});

function OpenRegister(){
	if($('#opening_balance').val() != "" && $('#opening_note').val() != "")
	{
		CreateOpenRegister();
		
		$('#opening_balance').val("");
		$('#opening_note').val("");
	}
	else 
	{
		alert("Please insert data into open register!");
	}
};

function CloseRegister(){
	if($('#counted').val() != "" && $('#closing_note').val() != "")
	{
		$.ajax({
			url:"http://localhost:8000/Register/",
		}).then(function(register_data){
			var register_id = register_data.results[register_data.results.length-1].id;
			$.ajax({
				url : "http://localhost:8000/Register/"+register_id+"/",
			}).then(function(data){
				var sts = "Closed";
				var opening_balance = data.opening_balance;
				var opening_note = data.opening_note;
				var opening_time = data.opening_time;
				var closing_time = new Date().toLocaleTimeString();
				var expected = $('#expected').text();
				var counted = $('#counted').val();
				var difference = $('#difference').text();
				var cash_payment_received = $('#cash_payment_received').text();
				var store_credit = $('#store_credit').text();
				var total = $('#total').text();
				var closing_note = $('#closing_note').val();
				
				var putData = {
					"status": sts,
					"opening_balance": opening_balance,
					"opening_note": opening_note,
					"opening_time": opening_time,
					"closing_time": closing_time,
					"expected": expected,
					"counted": counted,
					"difference": difference,
					"cash_payment_received": cash_payment_received,
					"store_credit": store_credit,
					"total": total,
					"closing_note": closing_note,
				};
				$.ajax({
					type : "PUT",
					contentType : "application/json; charset=utf-8",
					url : "http://localhost:8000/Register/"+register_id+"/",
					data : JSON.stringify(putData),
					dataType: "json",
					success: function(){
						// alert("Successfully Update!");
						$('#closeRegister').hide();
						$('#openRegister').show();
					}
				});
			});
		});
	}
	else 
	{
		alert("Please insert data!");
	}
};

// Create register by opening
function CreateOpenRegister(){
	var sts = "Opened";
	var opening_balance = $('#opening_balance').val();
	var opening_note = $('#opening_note').val();
	var opening_time = new Date().toLocaleTimeString();
	var closing_time = new Date().toLocaleTimeString();

	if(sts != "" && opening_balance != "" && opening_note != "" && opening_time != "")
	{
		var postData = {
			"status": sts,
			"opening_balance": opening_balance,
			"opening_note": opening_note,
			"opening_time": opening_time,
			"closing_time": closing_time,
		};
		$.ajax({
			type: "POST",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Register/",
			data : JSON.stringify(postData),
			dataType: "json",
			success: function(){
				// alert("Sucessfully entered!");
				$('#openRegister').hide();
				
				$('#closeRegister').show();
				FillCloseRegister();
			}
		});
	}
	else 
	{
		alert("Please fill out this fields.");
	}
};

// Fill close register
function FillCloseRegister(){
	$('#counted').val("");
	$.ajax({
		url: "http://localhost:8000/Register/",
	}).then(function(register_data){
		var register_id = register_data.results[register_data.results.length-1].id;
		// console.log(register_id);
		$.ajax({
			url : "http://localhost:8000/Register/"+register_id+"/",
		}).then(function(data){
			// console.log(data.sales_id.length);
			var expected = 0;
			var cash_payment_received = 0;
			var store_credit = 0;
			var total = 0;
			for(var i=0; i<data.sales_id.length; i++)
			{
				expected = expected + data.sales_id[i].amount_paid;
				cash_payment_received = cash_payment_received + data.sales_id[i].amount_paid;
				store_credit = 0;
				total = total + data.sales_id[i].amount_paid;
				
			}
			var openingBalance = Number(register_data.results[register_data.results.length-1].opening_balance);
			$('#expected').text(expected + openingBalance);
			$('#cash_payment_received').text(cash_payment_received);
			$('#store_credit').text(store_credit);
			$('#total').text(total + openingBalance);
		});
	});
};

// Calculate difference
function CalculateDifference(){
	if($('#counted').val() != "")
	{
		var expected = Number($('#expected').text());
		var counted = Number($('#counted').val());
		var diff = counted - expected;
		$('#difference').text(diff);
		
		$('#tCounted').text(counted);
		$('#tDifference').text(diff);
	}
};