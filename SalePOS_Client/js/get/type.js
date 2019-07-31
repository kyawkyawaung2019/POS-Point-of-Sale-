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
        url: "http://localhost:8000/Type/"
    }).then(function(data) {
        console.log(data.results);
      for (var i = 0; i < data.results.length; i++) {
        var tr = $('<tr/>');
        var id=data.results[i].id;
              $(tr).append("<td>" + data.results[i].type_name+"</td>");
              $(tr).append("<td><a href=type.html?"+data.results[i].id+" id='deleteType' class='btn btn-danger'>DELETE</a></td>");
              $(tr).append("<td><a href=update_type.html?"+data.results[i].id+" class='btn btn-primary'>EDIT</a></td>");
              $('#type').append(tr);
          }
           $('#type_table').dataTable();
} );
  });
