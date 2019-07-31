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
        url: "http://localhost:8000/Customer/"
    }).then(function(data) {
        console.log(data.results);
      for (var i = 0; i < data.results.length; i++) {
        var tr = $('<tr id='+data.results[i].id+'/>');
        var id=data.results[i].id;

              $(tr).append("<td>" + data.results[i].customer_name+"</td>");
              $(tr).append("<td>" + data.results[i].company + "</td>");
              $(tr).append("<td>" + data.results[i].phone+"</td>");
              $(tr).append("<td>" + data.results[i].email+"</td>");
              $(tr).append("<td>" + data.results[i].state+"</td>");
              $(tr).append("<td>" + data.results[i].country+ "</td>");
              $(tr).append("<td><a href=customer.html?"+data.results[i].id+" id='deleteCustomer' class='btn btn-danger'>DELETE</a></td>");
              $(tr).append("<td><a href=update_customer.html?"+data.results[i].id+" class='btn btn-primary'>EDIT</a></td>");
              $('#customer').append(tr);
          }
           $('#customer_table').DataTable();
} );
  });

// (".deleteAddress").getElementsByClassName(click(function(){                       
//                        $.ajax({
//                         type    : 'DELETE',
//                         contentType : 'application/json; charset=utf-8',
//                         url     : url.partner+SearchString+"/",
//                         dataType:'json',
//                         success: function(data){
//                             alert("success! Partner Deleted");
//                             window.location.assign("Customer_list.html")
//                         }
//                     });
