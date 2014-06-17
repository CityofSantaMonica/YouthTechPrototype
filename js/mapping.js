function computeDistance(geodata, referenceLocation) {
    for(var index = 0; index < geodata.features.length; index++){
        var feature = geodata.features[index];
        feature.LatLng = new google.maps.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
        feature.distance = google.maps.geometry.spherical.computeDistanceBetween(referenceLocation, feature.LatLng);
    }
    return geodata;
}

function compareDistance(a,b) {
    if (a.distance < b.distance)
        return -1;
    if (a.distance > b.distance)
        return 1;
    return 0;
}

function initializeMap(mapTarget, position) {
    var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
        center: currentLocation,
        zoom: 15
    };

    var map = new google.maps.Map(mapTarget, mapOptions);

    var markerColor = "00DD69";
    var markerIcon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=|" + markerColor);

    addMarker(map, currentLocation, "You are here", { icon: markerIcon });

    return map;
}

function addMarker(map, position, title, options) {
    var defaultOptions = {
        map: map,
        position: position,
        title: title
    };

    options = options || { };

    var markerOptions = $.extend(options, defaultOptions);

    new google.maps.Marker(markerOptions);
}
