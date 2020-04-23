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

	if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition((position) => {
			console.log(position);
			lat = position.coords.latitude;
			long = position.coords.longitude;
			console.log(lat, long);
			data = { name, description, price, sell_type, phone, address, city, state, zip, lat, long };
			fetch('/api/addNewItem', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			})
				.then((data1) => {
					return data1.json();
				})
				.then((data) => console.log(data));
		});
	} else {
		console.log('Error');
	}
});
