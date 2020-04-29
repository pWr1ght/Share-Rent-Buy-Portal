var distanceFixed = function(distance) {
	return distance.toFixed(2);
};

let capitalize = function(cap) {
	return cap.charAt(0).toUpperCase() + cap.slice(1);
};

module.exports = { distanceFixed, capitalize };
