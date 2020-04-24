document.getElementById('input_search_button').onclick = function (event) {
    event.preventDefault()
    var search = document.getElementById('input_search').value;
    var lat = document.getElementById('user_lat').value
    var long = document.getElementById('user_lon').value
    if (!search) {
        return;
    }
    fetch('/api/search', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            search: search,
            lat: lat,
            long: long
        })
    }).then((response) => response.json()).then(data => console.log(data)).catch((err) => console.log(err));

};