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
        url:"http://localhost:8000/Group/"+SearchString+"/"
    }).then(function(data) {
        console.log(SearchString);
    $('[id=group_name]').attr('value',data.group_name);
    $('[id=no_customer]').attr('value',data.no_customer);
    $('[id=country]').attr('value',data.country);

 	$("#updateGroup").click(function(){
 		var group_name=document.getElementById("group_name").value;
 		var no_customer=document.getElementById("no_customer").value;
        var country=document.getElementById("country").value;
 		var post_data = {
            "id":7,
            "group_name":group_name,
            "no_customer":no_customer,
            "country":country,
            "customer_id":[],
        }


    $.ajax({
                        type    : 'PUT',
                        contentType : 'application/json; charset=utf-8',
                        url     : "http://localhost:8000/Group/"+SearchString+"/",
                        data    : JSON.stringify(post_data),
                        dataType: "json",
                        contentType: "application/json",
                        success: function(data){
                            alert("success! Update Group");
                            window.location.assign("group.html");
                        }
                    });
 	});
 });
});


