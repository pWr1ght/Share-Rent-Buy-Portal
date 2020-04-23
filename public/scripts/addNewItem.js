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
	var lat = 0;
	var long = 0;
	var data = { name, description, price, sell_type, phone, address, city, state, zip, lat, long };
	if (!name || !description || !price || !phone || !address || !city || !state || !zip) {
		console.log('Error1 Please fill out all fields', data);
		return { error1: 'No fields should be empty.', data };
	} else {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				lat = position.coords.latitude;
				long = position.coords.longitude;
				data.lat = lat;
				data.long = long;
				fetch('/api/addNewItem', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data)
				})
					.then((data1) => {
						var node = document.getElementById('divInForm');
						let newElement = (document.createElement('h3').innerText = 'New Item Added');
						node.replaceWith(newElement);
						window.location.href = '/';
						return data1;
					})
					.catch((err) => console.log(err));
			});
		} else {
			console.log('Error');
		}
	}
});
