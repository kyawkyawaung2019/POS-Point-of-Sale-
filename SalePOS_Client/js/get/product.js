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
        url: "http://localhost:8000/Product/"
    }).then(function(data) {
        console.log(data.results);
      for (var i = 0; i < data.results.length; i++) {
        var tr = $('<tr/>');
        var id=data.results[i].id;

              $(tr).append("<td>" + data.results[i].product_name+"</td>");
              // $(tr).append("<td>" + data.results[i].description + "</td>");
              $(tr).append("<td>" + data.results[i].quantity+"</td>");
              $(tr).append("<td>" + data.results[i].product_price+"</td>");
              // $(tr).append("<td>" + data.results[i].supplier_price+"</td>");
              $(tr).append("<td>" + data.results[i].create_date+ "</td>");
              $(tr).append("<td><a href=product.html?"+data.results[i].id+" id='deleteProduct' class='btn btn-danger'>DELETE</a></td>");
              $(tr).append("<td><a href=update_product.html?"+data.results[i].id+" class='btn btn-primary'>EDIT</a></td>");
              
              $('#product').append(tr);
          }
           $('#product_table').DataTable(); 
} );
  });
