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

	let data = getFormFields();

	if (isInputValid(data)){
		//modal for saving screen
		let loadingModal = document.getElementById('loadingModalStatus');
		loadingModal.textContent = 'Saving new listing...';
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
				//upload attachment
				loadingModal.textContent = 'Uploading attachment...';
				return fetch('/aws/upload', { method: 'POST', body: getMultiformData(data2.insertID) });
			})
			.then((data3) => {
				return data3.json();
			})
			.then((data4) => {
				loadingModal.textContent = data4.uploadStatus;
				redirectToHomePage(1000);
				return data4;
			})
			.catch((err) => {
				loadingModal.textContent = err;
        		reloadPage(1000);
			});
	}
});


function isInputValid(data){
	if (!data.name || !data.description || !data.price || !data.phone || !data.address || !data.city || !data.state || !data.zip || !data.category || !data.sell_type) {
		console.log('Error1 Please fill out all fields', data);
		return false;
	} 
	return true;
}

function getFormFields(){
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
	return { name, description, price, sell_type, phone, address, city, state, zip, category };
}

function getMultiformData(listingId){
	let form = document.forms.namedItem('fileinfo');
	let formData = new FormData(form);
	formData.append('listId', listingId);
	formData.append('newFileCt', document.getElementById('myFile').files.length);
	return formData;
}

function redirectToHomePage(timeout){
    setTimeout(function(){
        window.location.href = './';
    },timeout);
}