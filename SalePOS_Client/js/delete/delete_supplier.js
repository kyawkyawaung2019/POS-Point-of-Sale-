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
        url:"http://localhost:8000/Supplier/"
    }).then(function(data) {
        console.log(SearchString);
    });

        $.ajax({
                        type    : 'DELETE',
                        contentType : 'application/json; charset=utf-8',
                        url:"http://localhost:8000/Supplier/"+SearchString+"/",
                        //data    : JSON.stringify(post_data),
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data){
                            alert("success! Delete");
                             window.location.assign("supplier.html")
                        }
                    });
    });

