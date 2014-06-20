//a function to compute the real-world distance (in feet) between a set of points and a reference location
function computeDistance(geodata, referenceLocation) {
    for(var index = 0; index < geodata.features.length; index++){
        //save a reference to the feature
        var feature = geodata.features[index];
        //create a lat/lng property from the feature's geometry
        feature.LatLng = new google.maps.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
        //compute the distance
        feature.distance = google.maps.geometry.spherical.computeDistanceBetween(referenceLocation, feature.LatLng);
    }
    //return the (updated) set of points
    return geodata;
}

//simple compare function for two objects with a distance property
function compareDistance(a,b) {
    if (a.distance < b.distance)
        return -1;
    if (a.distance > b.distance)
        return 1;
    return 0;
}

//draw a google map on the given target, centered at the given position
function initializeMap(mapTarget, position) {
    //create a lat/lng object from the position coords
    var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    //some map initialization options
    var mapOptions = {
        center: currentLocation,
        zoom: 15
    };

    //create a new map object
    var map = new google.maps.Map(mapTarget, mapOptions);

    //place a green marker at the current position
    var markerColor = "00DD69";
    var markerIcon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=|" + markerColor);

    addMarker(map, currentLocation, { icon: markerIcon, title: "You are here" });

    //return the map object
    return map;
}

//add a marker to a given map, at the given position (options are 'optional')
function addMarker(map, position, options) {
    var defaultOptions = {
        map: map,
        position: position
    };

    //make sure options are initialized
    options = options || { };

    //combine the defaults and the custom options
    var markerOptions = $.extend(options, defaultOptions);

    //add a new marker with the options
    return new google.maps.Marker(markerOptions);
}
