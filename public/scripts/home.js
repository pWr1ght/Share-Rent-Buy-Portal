document.addEventListener('DOMContentLoaded', () => {
	getBrowserLocation(function() {
		getDistances2();
	});

	//remove the search function from the navbar
	document.getElementById("searchNav").innerHTML = "";
	document.getElementById("input_search_button").onclick = performSearch;

	//add enter key detection to input_search
	document.getElementById("input_search").addEventListener("keyup", function(event){
		if(event.keyCode === 13){
			event.preventDefault();
			document.getElementById("input_search_button").click();
		}
	})
});

function getDistances() {
	var ids = document.getElementsByName('elemId').length;
	console.log('ids: ' + ids);
	for (let index = 1; index < ids + 1; index++) {       //Need to fix, the id doesn't necessarily start from 1
		getDist(index);
	}
}

function getDist(id) {
	var destLat = document.getElementById(id + '-lat').innerHTML;
	var destLon = document.getElementById(id + '-lon').innerHTML;
	var userLat = document.getElementById('user_lat').value;
	var userLon = document.getElementById('user_lon').value;

	payload = {
		destLat: destLat,
		destLon: destLon,
		userLat: userLat,
		userLon: userLon
	};

	var req = new XMLHttpRequest();
	req.open('POST', '/locate', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function() {
		//Process response
		if (req.status >= 200 && req.status < 400) {
			var resp = JSON.parse(req.responseText);
			document.getElementById(id + '-dist').innerText = resp.distText + '    |    ' + resp.durText;
		} else {
			console.log('Error in network request: ' + req.statusText);
		}
	});
	req.send(JSON.stringify(payload));
}

function getDistances2(){
	let userCoord = {lat: document.getElementById('user_lat').value, long: document.getElementById('user_lon').value};
	let items = document.getElementsByClassName("LatLong");
	if(items.length > 0){
		for(let i = 0; i < items.length; i++){
			let curCoord = {lat:document.getElementById(items[i].id + "_lat").textContent, long: document.getElementById(items[i].id + "_lon").textContent};
			let curDist = calculateDistance(userCoord, curCoord);

			//update the distance from browser location
			let curMsg = document.getElementById(items[i].id + "_dist");
			curMsg.textContent = curMsg.textContent + " (" + curDist.toFixed(1) + " miles)";

		}
	}
}

function calculateDistance(oriLoc, destLoc){   // {latitude,longitude}

        //referenced from geeks for geeks
        let PI = 3.141592654;

        let oriLatR = oriLoc.lat * PI / 180;
        let oriLongR = oriLoc.long * PI / 180;
        let destLatR = destLoc.lat * PI /180;
        let destLongR = destLoc.long * PI / 180;

        //haversine formula
        let dlong = destLongR - oriLongR;
        let dlat = destLatR - oriLatR;

        //calculate final distance
        let distance = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(oriLatR) * Math.cos(destLatR) * Math.pow(Math.sin(dlong / 2),2);

        distance = 2 * Math.asin(Math.sqrt(distance)) * 3956; //Earth radius in miles

        return distance;

}

