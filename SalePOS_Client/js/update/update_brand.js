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
        url:"http://localhost:8000/Brand/"+SearchString+"/"
    }).then(function(data) {
        console.log(SearchString);
 	$('[id=brand_name]').attr('value',data.brand_name);
    $('[id=description]').attr('value',data.description);

$("#updateBrand").click(function(){
    var brand_name=document.getElementById("brand_name").value;
    var description=document.getElementById("description").value;
    var post_data = {
            "id": 15,
            "brand_name": brand_name,
            "description": description,
            "product_id": []
    }
    $.ajax({
                        type    : 'PUT',
                        contentType : 'application/json; charset=utf-8',
                        url     : "http://localhost:8000/Brand/"+SearchString+"/",
                        data    : JSON.stringify(post_data),
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data){
                            alert("success! Update Brand");
                            window.location.assign("brand.html");
                        }
                    });
                    });
 	});
});


