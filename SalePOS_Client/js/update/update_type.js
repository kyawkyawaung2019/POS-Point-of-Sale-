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

    console.log(window.location.search.substring(1));
    var SearchString = window.location.search.substring(1);


    $.ajax({
        url:"http://localhost:8000/Type/"+SearchString+"/"
    }).then(function(data) {
        console.log(SearchString);
 	$('[id=type_name]').attr('value',data.type_name);

$("#updateType").click(function(){
    var type_name=document.getElementById("type_name").value;
    var post_data = {
            "id": 15,
            "type_name": type_name,
            "product_id": []
    }
    $.ajax({
                        type    : 'PUT',
                        contentType : 'application/json; charset=utf-8',
                        url     : "http://localhost:8000/Type/"+SearchString+"/",
                        data    : JSON.stringify(post_data),
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data){
                            alert("success! Update Type");
                            window.location.assign("type.html");
                        }
                    });
                    });
 	});
});


