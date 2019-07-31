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

    console.log(window.location.search.substring(1));
    var SearchString = window.location.search.substring(1);

    $.ajax({
        url:"http://localhost:8000/Product/"+SearchString+"/"
    }).then(function(data) {
        console.log(data);


    $('[id=product_name]').attr('value',data.product_name);
    // $('[id=type]').attr('value',data.type);
    $('[id=description]').attr('value',data.description);
    $('[id=quantity]').attr('value',data.quantity);
    // $('[id=brand_name]').attr('value',data.brand_name);
    // $('[id=tags_name]').attr('value',data.tags_name);
    // $('[id=supplier_name]').attr('value',data.supplier_name);
    $('[id=product_price]').attr('value',data.product_price);
    $('[id=supplier_price]').attr('value',data.supplier_price);
    $('[id=created_date]').attr('value',data.create_date);
});

    $("#updateProduct").click(function(){

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
                        type    : 'PUT',
                        contentType : 'application/json; charset=utf-8',
                        url:"http://localhost:8000/Product/"+SearchString+"/",

                        data    : JSON.stringify(test_data),
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data){
                            alert("success! Update Product");
                            window.location.assign("product.html");
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