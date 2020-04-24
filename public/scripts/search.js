document.getElementById('input_search_button').onclick = function () {
    let search = document.getElementById('input_search').value;
    let lat = document.getElementById('user_lat').value
    let long = document.getElementById('user_lon').value
    if (!search) {
        return;
    }

    fetch('/api/search', {
        search: 'sofa',
        lat,
        long
    }).then((data) => console.log(data)).catch((err) => console.log(err));
};