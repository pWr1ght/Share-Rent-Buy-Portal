var distanceFixed = function(distance) {
	return distance.toFixed(2);
};

let capitalize = function(cap) {
	return cap.charAt(0).toUpperCase() + cap.slice(1);
};

// let json = function(obj) {
// 	console.log(obj, "this is")
// 	return JSON.stringify(obj);
// }

module.exports = {distanceFixed, capitalize };
