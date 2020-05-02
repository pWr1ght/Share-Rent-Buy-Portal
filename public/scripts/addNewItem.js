document.getElementById('addItemSubmit').addEventListener('click', (event) => {
	let name = document.getElementById('name').value;
	let description = document.getElementById('description').value;
	let price = document.getElementById('price').value;
	let sell_type = document.getElementById('select_buy_choice').value;
	let phone = document.getElementById('phone').value;
	let address = document.getElementById('address').value;
	let city = document.getElementById('city').value;
	let state = document.getElementById('state').value;
	let zip = document.getElementById('zip').value;
	var data = { name, description, price, sell_type, phone, address, city, state, zip };
	if (!name || !description || !price || !phone || !address || !city || !state || !zip) {
		console.log('Error1 Please fill out all fields', data);
		return { error1: 'No fields should be empty.', data };
	} else {
		//modal for saving screen
		document.getElementById("loadingModalStatus").textContent = "Saving new listing...";
		$("#LoadingModal1").modal();

		fetch('/api/addNewItem', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
			.then((data1) => {
				//var node = document.getElementById('divInForm');
				//let newElement = (document.createElement('h3').innerText = 'New Item Added');
				//node.replaceWith(newElement);

				return data1.json();
	
			}).then((data2) => {
				console.log(data2);
				//upload attachment
				document.getElementById("loadingModalStatus").textContent = "Uploading attachment...";
				var form = document.forms.namedItem("fileinfo");
				var formData = new FormData(form);
				formData.append("listId",data2.insertID);
				return fetch('/aws/upload', {method: 'POST', body: formData});
						
			}).then((data3) => {
				return data3.json();
			}).then((data4) => {
				console.log(data4);
				document.getElementById("loadingModalStatus").textContent = data4.uploadStatus;
                //redirect to home page
                setTimeout(function(){
                    window.location.href = "./";
				},2000);
				return data4; 
			})
			.catch((err) => console.log(err));
	}
});
