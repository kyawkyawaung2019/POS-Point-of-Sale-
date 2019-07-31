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

 	$("#saveProduct").click(function(){
 	var product_name=document.getElementById("product_name").value;
    var type=document.getElementById("type").value;
    var description=document.getElementById("description").value;
    var quantity=document.getElementById("quantity").value;
    var brand_name=document.getElementById("brand_name").value;
    var tags_name=document.getElementById("tags_name").value;
    var supplier_name=document.getElementById("supplier_name").value;
    var product_price=document.getElementById("product_price").value;
    var supplier_price=document.getElementById("supplier_price").value;
    var created_date=document.getElementById("created_date").value;

        var test_data = {
            "product_name": product_name,
            "type_id":parseInt(type),
            "description": description,
            "quantity": parseInt(quantity),
            "brand_id": parseInt(brand_name),
            "tag_id": parseInt(tags_name),
            "supplier_id": parseInt(supplier_name),
            "product_price": parseInt(product_price),
            "supplier_price": parseInt(supplier_price),
            "create_date": created_date
        }



    $.ajax({
                        type    : 'POST',
                        contentType : 'application/json; charset=utf-8',
                        url     : "http://localhost:8000/Product/",
                        data    : JSON.stringify(test_data),
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data){
                            alert("success! Post");
                             window.location.assign("product.html")
                        }
                    });
 	});
});


$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8000/Type/",
    }).then(function(data){
        console.log(data.results);
        $.each(data.results, function(k,v){
            $('#type').append('<option value="'+v.id+'">'+v.type_name+'</option>');
        });
    });
});

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8000/Brand/",
    }).then(function(data){
        console.log(data.results);
        $.each(data.results, function(k,v){
            $('#brand_name').append('<option value="'+v.id+'">'+v.brand_name+'</option>');
        });
    });
});

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8000/Tags/",
    }).then(function(data){
        console.log(data.results);
        $.each(data.results, function(k,v){
            $('#tags_name').append('<option value="'+v.id+'">'+v.tags_name+'</option>');
        });
    });
});

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8000/Supplier/",
    }).then(function(data){
        console.log(data.results);
        $.each(data.results, function(k,v){
            $('#supplier_name').append('<option value="'+v.id+'">'+v.supplier_name+'</option>');
        });
    });
});

