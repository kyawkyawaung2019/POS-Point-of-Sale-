function Login(){
	$.ajax({
		url: "http://localhost:8000/Staff/",
	}).then(function(data){
		var username = $('#username').val();
		var pwd = $('#password').val();
		
		for(var i=0; i<data.results.length; i++)
		{
			var u = data.results[i].username;
			var e = data.results[i].email;
			var p = data.results[i].password;
			if(username == u || username == e && pwd == p)
			{
				// Check browser support
				if (typeof(Storage) !== "undefined") {
					// Store
					sessionStorage.setItem("userId", data.results[i].id);
					// localStorage.setItem("userId", data.results[i].id);
				}
				else
				{
					alert("Your browser does not support session storage.");
				}
				window.location.assign("home.html");
			}
			else 
			{
				if(username != u || username != e)
				{
					$('#username').val("");
					$('#username').focus();
					var incorrectUsername = $('<p style="color:red;">( Username is incorrect. )</p>');
					$('#lblUsername').empty();
					$('#lblUsername').append(incorrectUsername);
				}
				else if(pwd != p)
				{
					$('#password').val("");
					$('#password').focus();
					var incorrectPassword = $('<p style="color:red;">( Password is incorrect.)</p>');
					$('#lblPassword').empty();
					$('#lblPassword').append(incorrectPassword);
				}
			}
		}
	});
};

function ClearRegisterModal(){
	$('#rUsername').val("");
	$('#rEmail').val("");
	$('#rPassword').val("");
	
	$('#registerModal').modal('hide');
};

function Register(){
	var username = $('#rUsername').val();
	var email = $('#rEmail').val();
	var pwd = $('#rPassword').val();
	var rank = $('#rRank').val();
	var postData = {
		"username": username,
		"email": email,
		"password": pwd,
		"rank": rank,
	};
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8000/Staff/",
		data: JSON.stringify(postData),
		dataType: "json",
		success: function(){
			ClearRegisterModal();
		}
	});
};