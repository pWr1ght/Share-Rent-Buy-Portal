showCategories = async () => {
	let catElem = document.getElementById('categories');

	let allAvailableCats = await fetch('/api/getCategories');
	let listCategories = await allAvailableCats.json();

	let defaultNode = document.createElement('option');
	defaultNode.textContent = 'Please Select';
	catElem.appendChild(defaultNode);

	listCategories.categoryResults.forEach((element) => {
		let newNode = document.createElement('option');
		newNode.value = element.categoryId;
		newNode.innerText = element.categoryName;
		catElem.appendChild(newNode);
	});
};

showCategories();

document.getElementById('addItemSubmit').addEventListener('click', (event) => {
	let name = document.getElementById('name').value;
	let description = document.getElementById('description').value;
	let price = document.getElementById('price').value;
	let sell_type = document.getElementById('select_buy_choice').value;
	let category = document.getElementById('categories').value;
	let phone = document.getElementById('phone').value;
	let address = document.getElementById('address').value;
	let city = document.getElementById('city').value;
	let state = document.getElementById('state').value;
	let zip = document.getElementById('zip').value;
	var data = { name, description, price, sell_type, phone, address, city, state, zip, category };
	if (!name || !description || !price || !phone || !address || !city || !state || !zip || !category) {
		console.log('Error1 Please fill out all fields', data);
		return { error1: 'No fields should be empty.', data };
	} else {
		//modal for saving screen
		document.getElementById('loadingModalStatus').textContent = 'Saving new listing...';
		$('#LoadingModal1').modal();

		fetch('/api/addNewItem', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
			.then((data1) => {
				return data1.json();
			})
			.then((data2) => {
				console.log(data2);
				//upload attachment
				document.getElementById('loadingModalStatus').textContent = 'Uploading attachment...';
				var form = document.forms.namedItem('fileinfo');
				var formData = new FormData(form);
				formData.append('listId', data2.insertID);
				formData.append('newFileCt', document.getElementById('myFile').files.length);
				return fetch('/aws/upload', { method: 'POST', body: formData });
			})
			.then((data3) => {
				return data3.json();
			})
			.then((data4) => {
				console.log(data4);
				document.getElementById('loadingModalStatus').textContent = data4.uploadStatus;
				//redirect to home page
				setTimeout(function() {
					window.location.href = './';
				}, 2000);
				return data4;
			})
			.catch((err) => console.log(err));
	}
});
