// CRUD FUNCTIONALITIES

// READ
$.ajax({
	type: "get",
	url: "http://127.0.0.1:3000/applications",
	success: function(data){
		console.log("Successful call to get from script.js");
	}
});

$(document).ready(function() {
	loadApplicationList();
});

function loadApplicationList(){
	$.ajax({
		url: "http://127.0.0.1:3000/applications",
		success: function (data) {
			var applicationList = document.querySelector("#applicationList");
			if (applicationList) {
				while(applicationList.firstChild) {
					applicationList.removeChild(applicationList.firstChild);
				}
			}
			for (var i=0;i< data.length; i++){
				var name = data[i].name;
				var email = data[i].email;
				var address = data[i].address;
				var number = data[i].number;
				var pet = data[i].pet;

				var li = document.createElement('li');
				li.appendChild(document.createTextNode("\nName: " + name +
						"\nEmail: " + email +
						"\nAddress: " + address +
						"\nPhone Number: " + number +
						"\nPet Name: " + pet));
				applicationList.appendChild(li);
			}
		},
		error: function(data){
			alert("error " + data.error);
		}
	});
}

// CREATE
$(document).ready(function () {
	$("#submit").click(function (e) {
		var name = $("#name").val();
		var email = $("#email").val();
		var address = $("#address").val();
		var number = $("#number").val();
		var pet = $("#pet").val();

		e.preventDefault();
		var data = {};
		data.name = name;
		data.email = email;
		data.address = address;
		data.number = number;
		data.pet = pet;

		console.log("Data values are: " +
				data.name + " and " +
				data.email + " and " +
				data.address + " and " +
				data.number + " and " +
				data.pet
			);
		$.ajax({
			type:'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: 'http://127.0.0.1:3000/applications',
			success: function (data) {
				loadApplicationList();
				document.querySelector("#appForm").reset();
			},
			error: function(data){
				alert("error " + data.error);
			}
		});
	})
})

// UPDATE
$(document).ready(function () {
	$("#updateApp").click(function (e) {
		var name = $("#name").val();
		var email = $("#email").val();
		var address = $("#address").val();
		var number = $("#number").val();
		var pet = $("#pet").val();


		e.preventDefault();
		var data = {};
		data.name = name;
		data.email = email;
		data.address = address;
		data.number = number;
		data.pet = pet;

		console.log("Updated data values are: " +
				data.name + " and " +
				data.email + " and " +
				data.address + " and " +
				data.number + " and " +
				data.pet
			);
		$.ajax({
			method:'PUT',
			data: JSON.stringify(data),
			contentType: 'application/json',
			dataType: 'json',
			url: 'http://127.0.0.1:3000/applications/' + data.name,
			success: function (data) {
				loadApplicationList();
			},
			complete: function () {
				loadApplicationList();
				document.querySelector("#appForm").reset();
			}
		});
	})
})

// DELETE
$(document).ready(function () {
	$("#deleteApp").click(function (e) {
		var name = $("#name").val();

		e.preventDefault();
		var data = {};
		data.name = name;

		console.log("Deleted data values are: " +
				data.name
			);
		$.ajax({
			type:'DELETE',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: 'http://127.0.0.1:3000/applications/' + data.name,
			success: function (data) {
				loadApplicationList();
			},
			complete: function () {
				loadApplicationList();
				document.querySelector("#appForm").reset();
			}
		});
	})
})
