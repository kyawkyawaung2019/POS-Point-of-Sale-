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

    $("#saveSupplier").click(function(){

        var supplier_name=document.getElementById("supplier_name").value;
        var description=document.getElementById("description").value;
        var phone=document.getElementById("phone").value;
        var mobile=document.getElementById("mobile").value;
        var fax=document.getElementById("fax").value;
        var email=document.getElementById("email").value;
        var bDate=document.getElementById("bDate").value;
        var gender=document.getElementById("gender").value;
        var company=document.getElementById("company").value;
        var road=document.getElementById("road").value;
        var street=document.getElementById("street").value;
        var suburb=document.getElementById("suburb").value;
        var city=document.getElementById("city").value;
        var post_code=document.getElementById("post_code").value;
        var state=document.getElementById("state").value;
        var country=document.getElementById("country").value;
        var website=document.getElementById("website").value;


        var post_data = {
            "id": 1,
            "supplier_name": supplier_name,
            "product_id": [],
            "description": description,
            "company": company,
            "phone": phone,
            "mobile": mobile,
            "fax": fax,
            "email": email,
            "date_of_birth": bDate,
            "gender": gender,
            "road": road,
            "street": street,
            "suburb": suburb,
            "city": city,
            "post_code": post_code,
            "state": state,
            "country": country,
            "website": website,
        }

    $.ajax({
                        type    : 'POST',
                        contentType : 'application/json; charset=utf-8',
                        url     : "http://localhost:8000/Supplier/",
                        data    : JSON.stringify(post_data),
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data){
                            alert("success! Post Supplier");
                            window.location.assign("supplier.html");
                        }
                    });
    });
});


