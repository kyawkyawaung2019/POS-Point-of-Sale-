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
        url: "http://localhost:8000/Brand/"
    }).then(function(data) {
        console.log(data.results);
      for (var i = 0; i < data.results.length; i++) {
        var tr = $('<tr/>');
        var id=data.results[i].id;

              $(tr).append("<td>" + data.results[i].brand_name+"</td>");
              $(tr).append("<td>" + data.results[i].description+"</td>");
              $(tr).append("<td><a href=brand.html?"+data.results[i].id+" class='btn btn-danger'>DELETE</a></td>");
              $(tr).append("<td><a href=update_brand.html?"+data.results[i].id+" class='btn btn-primary'>EDIT</a></td>");
              $('#brand').append(tr);
          }
           $('#brand_table').DataTable();
} );
   $("#deleteBrand").click(function(){ 
$.ajax({
                        type    : 'DELETE',
                        contentType : 'application/json; charset=utf-8',
                        url:"http://localhost:8000/Brand/"+SearchString+"/",
                        //data    : JSON.stringify(post_data),
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data){
                            alert("success! Delete");
                             window.location.assign("brand.html")
                        }
                    });
});

});

