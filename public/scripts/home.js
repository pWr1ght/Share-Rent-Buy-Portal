document.addEventListener("DOMContentLoaded", () => {
    getBrowserLocation(function (){
        getDistances();
    });
    
  });

function getDistances(){
    var ids = document.getElementsByName("elemId").length;
    console.log("ids: " + ids)
    for (let index = 1; index < ids + 1; index++) {
        getDist(index);
    }
}


function getDist(id){
    var destLat = document.getElementById(id + "-lat").innerHTML;
    var destLon = document.getElementById(id + "-lon").innerHTML;
    var userLat = document.getElementById("user_lat").value ;
    var userLon = document.getElementById("user_lon").value;

    payload = {
        destLat: destLat,
        destLon: destLon,
        userLat: userLat,
        userLon: userLon
    }
    
    var req = new XMLHttpRequest();
    req.open('POST', '/locate' , true)
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function () {
        //Process response
        if (req.status >= 200 && req.status < 400) {
            var resp = JSON.parse(req.responseText);
            document.getElementById(id + "-dist").innerText = resp.distText + '    |    ' + resp.durText
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
}

//-----------------------------------------------------------------------------
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

//----------------------------------------------------------------------------