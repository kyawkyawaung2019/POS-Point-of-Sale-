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

/*    console.log(window.location.search.substring(1));*/
    var SearchString = window.location.search.substring(1);

    $.ajax({
        url:"http://localhost:8000/Supplier/"+SearchString+"/"
    }).then(function(data) {
        console.log(data);


    $('[id=supplier_name]').attr('value',data.supplier_name);
    $('[id=description]').attr('value',data.description);
    $('[id=phone]').attr('value',data.phone);
    $('[id=mobile]').attr('value',data.mobile);
    $('[id=fax]').attr('value',data.fax);
    $('[id=email]').attr('value',data.email);
    $('[id=bDate]').attr('value',data.date_of_birth);
    $('[id=gender]').attr('value',data.gender);
    $('[id=company]').attr('value',data.company);
    $('[id=road]').attr('value',data.road);
    $('[id=street]').attr('value',data.street);
    $('[id=suburb]').attr('value',data.suburb);
    $('[id=city]').attr('value',data.city);
    $('[id=post_code]').attr('value',data.post_code);
    $('[id=state]').attr('value',data.state);
    $('[id=country]').attr('value',data.country);
    $('[id=website]').attr('value',data.website);
});

    $("#updateSupplier").click(function(){

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
            "id": 17,
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
            "website": website
        }

    $.ajax({
                        type    : 'PUT',
                        contentType : 'application/json; charset=utf-8',
                         url:"http://localhost:8000/Supplier/"+SearchString+"/",

                        data    : JSON.stringify(post_data),
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data){
                            alert("success! Update Supplier");
                            window.location.assign("supplier.html");
                        }
                    });
    });
});