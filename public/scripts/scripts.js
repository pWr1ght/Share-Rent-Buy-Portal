document.addEventListener("DOMContentLoaded", () => {
    getBrowserLocation(function (){
        getNearby();
    });   
});

  //Get current user's browser location
function getBrowserLocation(getDistances) {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    function success(pos) {
        var crd = pos.coords;
        document.getElementById("user_lat").value = `${crd.latitude}`;
        document.getElementById("user_lon").value = `${crd.longitude}`;
        getDistances();
    }
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
    //alert("lat: "+ document.getElementById("user_lat").value + " lon:" + document.getElementById("user_lon").value);
}

// Gets cities near user's browser. The city with its center nearest user is displayed in the navbar
function getNearby(){
    var userLat = document.getElementById("user_lat").value ;
    var userLon = document.getElementById("user_lon").value;

    payload = {
        lat: userLat,
        lon: userLon
    }
    
    var req = new XMLHttpRequest();
    req.open('POST', '/locate/get-near-places' , true)
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function () {
        //Process response
        if (req.status >= 200 && req.status < 400) {
            var resp = JSON.parse(req.responseText);
            
            const currLocation = resp.geonames[0].name? resp.geonames[0].name + ", " + resp.geonames[0].adminCode1 : " ";
            document.getElementById("currLoc").innerText = currLocation;
            // for (let index = 0; index < resp.geonames.length; index++) {
            //     console.log(resp.geonames[index].name + ", " + resp.geonames[index].adminCode1);
            // } 
                
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
}