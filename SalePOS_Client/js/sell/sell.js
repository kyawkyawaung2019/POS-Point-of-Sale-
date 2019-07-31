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
	
	CheckGroup();
	
	$.ajax({
		url:"http://localhost:8000/Register/",
	}).then(function(register_data){
		if(register_data.results.length != 0)
		{
			var sts = register_data.results[register_data.results.length-1].status;
			if(sts == "Opened")
			{
				$('#saleSecondPage').hide();
				$('#openRegister').hide();
			
				$('#saleFirstPage').show();
				$('#saleProduct').show();
				$('#productTable').show();
				
				RetrieveProduct();
				
				$('#subtotal').val('0.00');
				$('#txtTax').val('0.00');
				$('#txtDiscount').val('0.00');
				
				CreateSelectBoxByCustomerName();
				
				$('#txtPaid').val('0.00');
				$('#txtRepay').val('0.00');
			}
			else if(sts == "Closed")
			{
				$('#saleSecondPage').hide();
				$('#saleProduct').hide();
			
				$('#saleFirstPage').show();
				$('#productTable').show();
				$('#openRegister').show();
				
				RetrieveProduct();
				
				$('#subtotal').val('0.00');
				$('#txtTax').val('0.00');
				$('#txtDiscount').val('0.00');
				
				CreateSelectBoxByCustomerName();
				
				$('#txtPaid').val('0.00');
				$('#txtRepay').val('0.00');
			}
			else 
			{
				alert("Something is wrong!\nPlease contact to developer.");
			}
		}
		else 
		{
			$('#saleSecondPage').hide();
			$('#saleProduct').hide();

			$('#saleFirstPage').show();
			$('#productTable').show();
			$('#openRegister').show();
			
			RetrieveProduct();
			
			$('#subtotal').val('0.00');
			$('#txtTax').val('0.00');
			$('#txtDiscount').val('0.00');
			
			CreateSelectBoxByCustomerName();
			
			$('#txtPaid').val('0.00');
			$('#txtRepay').val('0.00');
		}
	});
});
//
//////////////////////////////////////////////Show & hide function
//
function OpenRegister(){
	if($('#openingFloat').val() != "" && $('#openingNote').val() != "")
	{
		CreateOpenRegister();
		
		$('#openingFloat').val("");
		$('#openingNote').val("");
		
		SaleProduct();
	}
	else 
	{
		alert("Please insert data into open register!");
	}
};

function Sell(){
	window.location.assign("Sell.html");
	
	$('#saleSecondPage').hide();
	$('#saleProduct').hide();
	
	$('#saleFirstPage').show();
	$('#productTable').show();
	$('#openRegister').show();
};

function SaleProduct(){
	$('#saleSecondPage').hide();
	$('#openRegister').hide();
	
	$('#saleFirstPage').show();
	$('#productTable').show();
	$('#saleProduct').show();
};

function Pay(){
	$('#saleFirstPage').hide();
	$('#done').hide();
	
	$('#saleSecondPage').show();
	$('#saleSummary').show();
	$('#pay').show();
	
	$('#txtAmountPaid').val($('#btnTotal').text());
	$('#txtPaid').val($('#btnTotal').text());
	
	var saleProduct = [];
	var headers = $("#saleProductTable th");
	var rows = $("#saleProductTable tbody tr").each(function(index){
		cells = $(this).find("td");
		saleProduct[index] = {};
		cells.each(function(cellIndex){
			saleProduct[index][$(headers[cellIndex]).html()] = $(this).html();
		});
	});
	var myObj = {};
	myObj.saleProduct = saleProduct;
	// var summary = JSON.stringify(myObj);
	
	AddSummary(myObj);
};

function Cash(){
	var amountPaid = Number($('#txtAmountPaid').val());
	var paid = Number($('#txtPaid').val());
	if($('#txtPaid').val() != "" && $('#txtPaid').val() != 0.00 && paid >= amountPaid)
	{
		$('#saleFirstPage').hide();
		$('#pay').hide();
		
		$('#saleSecondPage').show();
		$('#saleSummary').show();
		$('#done').show();
		
		CalculateRepay();
	}
	else 
	{
		alert("Please enter paid amount!\n Your paid amount must be greater than or equal to AmountPaid!");
	}
};

function Done(){
	CreateSale();
};

//////////////////////////////////////////////External function
// Retrieve product information
function RetrieveProduct(){
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8000/Product/",
		// data: JSON.stringify(),
		dataType: "json",
	}).then(function(data){
		for(var i=0; i<data.results.length; i++)
		{
			var productId = data.results[i].id;
			var productName = data.results[i].product_name;
			var productPrice = data.results[i].product_price;
			
			var tr = $('<tr>')
			$(tr).append('<td>'+productId+'</td>')
			$(tr).append('<td>'+productName+'</td>')
			$(tr).append('<td>'+productPrice+'</td>')
			$(tr).append('<td><button type="button" class="btn btn-success" onclick="AddItem('+productId+');">Add Item</button></td>')
			$('#productTableBody').append(tr);
		}
	});
};

// Add items
function AddItem(id){
	$.ajax({
		url:"http://localhost:8000/Register/",
	}).then(function(register_data){
		var sts = register_data.results[register_data.results.length-1].status;
		if(sts == "Opened")
		{
			SaleProduct();
			
			$.ajax({
				type: "GET",
				contentType: "application/json; charset=utf-8",
				url: "http://localhost:8000/Product/"+id+"/",
				// data: JSON.stringify(),
				dataType: "json",
			}).then(function(data){
				var productId = data.id;
				var productName = data.product_name;
				var productPrice = data.product_price;
				
				var tr = $('<tr>')
				$(tr).append('<td id="productId">'+productId+'</td>')
				$(tr).append('<td id="productName">'+productName+'</td>')
				$(tr).append('<td id="quantity">'+1+'</td')
				$(tr).append('<td id="productSubtotal">'+productPrice+'</td>')
				$(tr).append('<td><img src="images/delete.png" height="20px" onclick="RemoveItem(this);"></td>')
				$(tr).append('<td><input type="number" value="1" class="form-control" id="editQuantity" onchange="ChangeQuantity(this, '+productPrice+');"></td>')
				
				$('#saleProductTableBody').append(tr);

				var subtotal = Number($('#subtotal').val()) + productPrice;
				$('#subtotal').val(subtotal);
				
				var items = Number($('#items').text()) + 1;
				$('#items').text(items);
				
				var total = Number($('#btnTotal').text()) + productPrice;
				$('#btnTotal').text(total);
				
				CalculatePay();
			});
		}
		else 
		{
			alert("Please open register");
		}
	});
};

// Add summary
function AddSummary(summary){
	$('#saleSummaryProductTableBody').empty();
	for(var i=0; i<summary.saleProduct.length; i++)
	{
		var row = $('<tr>')
		$(row).append('<td>'+summary.saleProduct[i].ID+'</td>')
		$(row).append('<td>'+summary.saleProduct[i].ProductName+'</td>')
		$(row).append('<td>'+summary.saleProduct[i].Quantity+'</td>')
		$(row).append('<td>'+summary.saleProduct[i].Subtotal+'</td>')
		
		$('#saleSummaryProductTableBody').append(row);
	}
	
	$('#smSubtotal').text($('#subtotal').val());
	$('#smTax').text($('#txtTax').val());
	$('#smDiscount').text($('#txtDiscount').val());
	$('#smItems').text($('#items').text());
	$('#smTotal').text($('#btnTotal').text());
	
};

// Remove items
function RemoveItem(row){
	var productSubtotal = $(row).closest('tr').find('#productSubtotal').text();
	var subtotal = $('#subtotal').val();
	var btnTotal = $('#btnTotal').text();
	var items = $('#items').text();
	$('#subtotal').val(subtotal - productSubtotal);
	$('#items').text(items - 1);
	$(row).closest('tr').remove();
	
	CalculatePay();
};

// Create select box by using customer name
function CreateSelectBoxByCustomerName(){
	$('#selCourseName').children().remove();
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8000/Customer/",
		// data: JSON.stringify(),
		dataType: "json",
	}).then(function(data){
		if(data.results.length > 0)
		{
			for(var i=0; i<data.results.length; i++)
			{
				var val = data.results[i].id;
				var text = data.results[i].customer_name;
				
				var option = document.createElement("option");
				option.text = text;
				option.value = val;
				var select = document.getElementById("selCustomerName");
				select.appendChild(option);
			}
		}
	});
};

// Calculate subtotal and txtTax
function CalculatePay(){
	var subtotal = Number(document.getElementById("subtotal").value);
	var tax = Number(document.getElementById("txtTax").value);
	
	var d = Number(document.getElementById("txtDiscount").value);
	var discount = ((d / 100) * subtotal)

	var total = (subtotal + tax) - discount;
	$('#btnTotal').text(total);
};

// Calculate repay
function CalculateRepay(){
	var amountPaid = Number($('#txtAmountPaid').val());
	var paid = Number($('#txtPaid').val());
	if($('#txtPaid').val() != "" && $('#txtPaid').val() != 0.00 && paid >= amountPaid)
	{
		$('#lblRepay').text(paid - amountPaid);
	}
	else 
	{
		alert("Please enter paid amount!\n Your paid amount must be greater than or equal to AmountPaid!");
	}
};

// Change quantity
function ChangeQuantity(quant, price){
	$(quant).closest('tr').find('#quantity').text($(quant).val());
	
	var quantity = $(quant).val();
	var productPrice = price;
	var pSub = $(quant).closest('tr').find('#productSubtotal').text();
	var productSubtotal = quantity * productPrice;
	$(quant).closest('tr').find('#productSubtotal').text(productSubtotal);
	
	var subtotal = $('#subtotal').val();
	$('#subtotal').val((subtotal - pSub) + productSubtotal);
	
	CalculatePay();
};

// Create register by opening
function CreateOpenRegister(){
	var sts = "Opened";
	var opening_balance = $('#openingFloat').val();
	var opening_note = $('#openingNote').val();
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
			}
		});
	}
	else 
	{
		alert("Please fill out this fields.");
	}
};

// Create sale data
function CreateSale(){
	// var transaction_date = new Date();
	var subtotal = $('#smSubtotal').text();
	var tax = $('#smTax').text();
	var discount = $('#smDiscount').text();
	var items = $('#smItems').text();
	var amount_paid = $('#txtAmountPaid').val();
	var paid = $('#txtPaid').val();
	var repay = $('#lblRepay').text();
	var customer_id = $('#selCustomerName option:selected').val();
	var staff_id = sessionStorage.getItem("userId");
	$.ajax({
		url:"http://localhost:8000/Register/",
	}).then(function(register_data){
		var register_id = register_data.results[register_data.results.length-1].id;
		var postData = {
			"subtotal": subtotal,
			"tax": tax,
			"discount": discount,
			"items": items,
			"amount_paid": amount_paid,
			"paid": paid,
			"repay": repay,
			"staff_id": staff_id,
			"customer_id": customer_id,
  			"register_id": register_id,
		};
		$.ajax({
			type: "POST",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Sales/",
			data : JSON.stringify(postData),
			dataType: "json",
			success: function(){
				// alert("Done ESC!");
				CreateSaleDetail();
			}
		});
	});
};

// Create sale detail
function CreateSaleDetail(){
	var saleProduct = [];
	var headers = $("#saleSummaryProductTable th");
	var rows = $("#saleSummaryProductTable tbody tr").each(function(index){
		cells = $(this).find("td");
		saleProduct[index] = {};
		cells.each(function(cellIndex){
			saleProduct[index][$(headers[cellIndex]).html()] = $(this).html();
		});
	});
	var myObj = {};
	myObj.saleProduct = saleProduct;
	
	for(var i=0; i<myObj.saleProduct.length; i++)
	{
		var product_id = myObj.saleProduct[i].ID;
		var quantity = myObj.saleProduct[i].Quantity;
		var sub_total = myObj.saleProduct[i].Subtotal;
		// var sales_id = 1;    //need to edit
		
		$.ajax({
			url:"http://localhost:8000/Sales/",
		}).then(function(sales_data){
			var sales_id = sales_data.results[sales_data.results.length-1].id;
			var postData = {
				"product_id": product_id,
				"quantity": quantity,
				"sub_total": sub_total,
				"sales_id": sales_id,
			};
			$.ajax({
				type: "POST",
				contentType : "application/json; charset=utf-8",
				url : "http://localhost:8000/SaleDetails/",
				data : JSON.stringify(postData),
				dataType: "json",
				success: function(){
					// alert("Done ESC!");
					$('#saleProductTableBody').empty();
					$('#saleSummaryProductTableBody').empty();
					
					$('#subtotal').val('0.00');
					$('#txtTax').val('0.00');
					$('#txtDiscount').val('0.00');
					$('#btnTotal').text('0.00');
					$('#items').text(0);
					
					$('#txtAmountPaid').val('0.00');
					$('#txtPaid').val('0.00');
					$('#txtRepay').val('0.00');
					
					SaleProduct();
				}
			});
		});
	}
};

// Check group
function CheckGroup(){
	$.ajax({
		url: "http://localhost:8000/Group/",
	}).then(function(data){
		if(data.results.length == 0)
		{
			CreateDefaultGroup();
		}
		else
		{
			$.ajax({
				url: "http://localhost:8000/Group/",
			}).then(function(data){
				var group_id = data.results[data.results.length-1].id;
				CheckCustomer(group_id);
			});
		}
	});
};

// Create default group
function CreateDefaultGroup(){
	var postData = {
		"group_name": "default group",
		"no_customer": 0,
		"country": "default country",
	};
	$.ajax({
		type: "POST",
		contentType : "application/json; charset=utf-8",
		url : "http://localhost:8000/Group/",
		data : JSON.stringify(postData),
		dataType: "json",
		success: function(){
			$.ajax({
				url: "http://localhost:8000/Group/",
			}).then(function(data){
				var group_id = data.results[data.results.length-1].id;
				CheckCustomer(group_id);
			});
		}
	});
};

// Check customer
function CheckCustomer(group_id){
	$.ajax({
		url: "http://localhost:8000/Customer/",
	}).then(function(data){
		if(data.results.length == 0)
		{
			CreateDefaultCustomer(group_id);
		}
	});
};

// Create default customer
function CreateDefaultCustomer(group_id){
	var d = moment().format("YYYY-MM-DD");
	var postData = {
		"customer_name": "default customer",
		"description": "default",
		"company": "default",
		"phone": "default",
		"mobile": "default",
		"fax": "default",
		"email": "default@email.com",
		"date_of_birth":d,
		"gender": "default",
		"road": "default",
		"street": "default",
		"suburb": "default",
		"city": "default",
		"post_code": "000",
		"state": "default",
		"country": "default",
		"group_id": group_id,
	};
	$.ajax({
		type: "POST",
		contentType : "application/json; charset=utf-8",
		url : "http://localhost:8000/Customer/",
		data : JSON.stringify(postData),
		dataType: "json",
		success: function(){
			CreateSelectBoxByCustomerName();
		}
	});
};

