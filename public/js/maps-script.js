/* -------- Google Map -------- MTCH */
var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

let map;
let infowindow;

function initFirstMap(elem,longitude,latitude, mapLocal) {
    // console.log("initFirstMap")
    // console.log(elem)
    // console.log(longitude)
    // console.log(latitude)
    // console.log(mapLocal)

    let lat = parseFloat(latitude || 40.8445867);
    let long = parseFloat(longitude ||  -73.9452655);
    let zoom = 15;

    let curr_marker_image = './images/curr-map-pin.png';
    let rest_marker_image = './images/rest-map-pin.png';
    let vac_marker_image = './images/vac-map-pin.png';
    let crime_marker_image = './images/crime-map-pin.png';

    //Map start init
    let mapOptions = {
        center: new google.maps.LatLng(lat, long),
        zoom: 15,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT,
        },
        disableDoubleClickZoom: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        },
        scaleControl: true,
        scrollwheel: true,
        streetViewControl: true,
        draggable : true,
        overviewMapControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{stylers:[{saturation:-100},{gamma:1}]},{elementType:"labels.text.stroke",stylers:[{visibility:"off"}]},{featureType:"poi.business",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi.business",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"poi.place_of_worship",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi.place_of_worship",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry",stylers:[{visibility:"simplified"}]},{featureType:"water",stylers:[{visibility:"on"},{saturation:50},{gamma:0},{hue:"#50a5d1"}]},{featureType:"administrative.neighborhood",elementType:"labels.text.fill",stylers:[{color:"#333333"}]},{featureType:"road.local",elementType:"labels.text",stylers:[{weight:0.5},{color:"#333333"}]},{featureType:"transit.station",elementType:"labels.icon",stylers:[{gamma:1},{saturation:50}]}]
    }

    mapLocal = new google.maps.Map(elem[0], mapOptions);
    // console.log(mapLocal)

    latLng = new google.maps.LatLng(latitude,longitude);

    // Creating a marker and putting it on the map
    let marker = new google.maps.Marker({
        icon: curr_marker_image,
        position: latLng,
        map: mapLocal
    });
    let infowindow = new google.maps.InfoWindow();
    // console.log("adding listener")
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent("Current Location");
        infowindow.open(mapLocal, this);
        setTimeout(function () { infowindow.close(); }, 5000);
    });
    return mapLocal
}


function addMarkersToMap(coords,mapLocal,cType) {

    let rest_marker_image = "../images/map-pin-rest.png";
    let vac_marker_image = '../images/map-pin-vac.png';
    let crime_marker_image = './images/crime-map-pin.png';
    let currImage="";
    if(cType === "rest")
        currImage = rest_marker_image;
    else if(cType === "vac")
        currImage = vac_marker_image;
    else if(cType === "crime")
        currImage = crime_marker_image;

    for (let i = 0; i < coords.length; i++) {
        if(i===10)
            break;
       latLng = new google.maps.LatLng(coords[i].coords.latitude, coords[i].coords.longitude);

        // Creating a marker and putting it on the map
        let marker = new google.maps.Marker({
            icon: currImage,
            position: latLng,
            map: mapLocal
        });

        let infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(coords[i].name + '<br>' + coords[i].address);
            infowindow.open(mapLocal, this);
        });

        google.maps.event.addListener(marker, 'click', function () {
            let message = coords[i].name;


            if(cType !== "vac")
            {
                message = message + '<br>' + coords[i].address;
            }
            infowindow.setContent(`<a target='_blank' href= '${coords[i].url}'> ${message}</a>`);
            infowindow.open(mapLocal, this);
            setTimeout(function () { infowindow.close(); }, 5000);
        });
    }
    return mapLocal;
}






function initMap(elem,longitude,latitude) {
    console.log(longitude)
    console.log(latitude)
    let lat = parseFloat(latitude || 40.8445867);
    let long = parseFloat(longitude ||  -73.9452655);
    let zoom = 15;

    let marker_image = 'images/map-pin.png';

	//Map start init
    let mapOptions = {
        center: new google.maps.LatLng(lat, long),
        zoom: 15,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT,
        },
        disableDoubleClickZoom: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        },
        scaleControl: true,
        scrollwheel: true,
        streetViewControl: true,
        draggable : true,
        overviewMapControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{stylers:[{saturation:-100},{gamma:1}]},{elementType:"labels.text.stroke",stylers:[{visibility:"off"}]},{featureType:"poi.business",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi.business",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"poi.place_of_worship",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi.place_of_worship",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry",stylers:[{visibility:"simplified"}]},{featureType:"water",stylers:[{visibility:"on"},{saturation:50},{gamma:0},{hue:"#50a5d1"}]},{featureType:"administrative.neighborhood",elementType:"labels.text.fill",stylers:[{color:"#333333"}]},{featureType:"road.local",elementType:"labels.text",stylers:[{weight:0.5},{color:"#333333"}]},{featureType:"transit.station",elementType:"labels.icon",stylers:[{gamma:1},{saturation:50}]}]
    }
                    
    map = new google.maps.Map(elem[0], mapOptions);

    infowindow = new google.maps.InfoWindow();

    let service = new google.maps.places.PlacesService(map);

    service.nearbySearch({
        location: new google.maps.LatLng(lat, long),
        radius: '5000',
        type:'point_of_interest'
    }, showMarkers);

    let marker = new google.maps.Marker({
    	icon: marker_image,
        map: map,
        position: map.getCenter()
    });
}

function showMarkers(results, status){

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            let place = results[i];
            let serviceInner = new google.maps.places.PlacesService(map);
            serviceInner.getDetails({
                    placeId: place.place_id
                },createMarker);
        }
    }
}

function createMarker(place, status) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {

        let marker = new google.maps.Marker({
            map: map,
            icon: 'images/map-pin.png',
            position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name + '<br>' + place.formatted_address);
            infowindow.open(map, this);
        });
    }
}

function initAutocomplete() {

    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')),{types: ['geocode']});
    autocomplete.addListener('place_changed', fillInAddress);
}
function fillInAddress() {

    let place = autocomplete.getPlace();

    // for (let component in componentForm) {
    //     document.getElementById(component).value = '';
    //     document.getElementById(component).disabled = false;
    // }


    //console.log(place.formatted_address)
    //console.log(place.geometry.location.lat())
    //console.log(place.geometry.location.lng())

    localStorage.setItem("curr_map_addr",place.formatted_address)
    localStorage.setItem("curr_map_lat",place.geometry.location.lat())
    localStorage.setItem("curr_map_lon",place.geometry.location.lng())

    console.log(place.geometry.location.lat())
    console.log(place.geometry.location.lng())

    if(document.getElementById("latitude")!==null)
        document.getElementById("latitude").value = place.geometry.location.lat();
    if(document.getElementById("longitude")!==null)
        document.getElementById("longitude").value = place.geometry.location.lng();


     for (let i = 0; i < place.address_components.length; i++) {
         let addressType = place.address_components[i].types[0];
         if (componentForm[addressType]) {
             let val = place.address_components[i][componentForm[addressType]];
             //console.log(val)
             if(document.getElementById(addressType)!==null)
                document.getElementById(addressType).value = val;
         }
     }

}


// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
/*function geolocate() {
 if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(function(position) {
 let geolocation = {
 lat: position.coords.latitude,
 lng: position.coords.longitude
 };
 document.getElementById("latitude").value = position.coords.latitude;
 document.getElementById("longitude").value = position.coords.longitude;

 let circle = new google.maps.Circle({
 center: geolocation,
 radius: position.coords.accuracy
 });
 autocomplete.setBounds(circle.getBounds());
 });
 }
 }*/
//end Google Map
