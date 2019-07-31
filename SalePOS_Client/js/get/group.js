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
        url: "http://localhost:8000/Group/"
    }).then(function(data) {
        console.log(data.results);
      for (var i = 0; i < data.results.length; i++) {
        var tr = $('<tr/>');
        var id=data.results[i].id;

              $(tr).append("<td>" + data.results[i].group_name+"</td>");
              $(tr).append("<td>" + data.results[i].no_customer + "</td>");
              $(tr).append("<td>" + data.results[i].country+"</td>");
              $(tr).append("<td><a href=group.html?"+data.results[i].id+" id='deleteProduct' class='btn btn-danger'>DELETE</a></td>");
              $(tr).append("<td><a href=update_group.html?"+data.results[i].id+" class='btn btn-primary'>EDIT</a></td>");
              $('#group').append(tr);
          }
           $('#group_table').DataTable();
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
