let host = window.location.hostname;
let loginURL = "/auth/login";
//let mapHome;
let HOME_PAGE_DATA_LIMIT = 5;

/*
* Render map and markers
* */
function initCurrLocationMap(position){
    //console.log("initCurrLocationMap")

    //call map_script::initFirstMap
    mapData = initFirstMap($('#home_map_section'),position.coords.longitude,position.coords.latitude, mapData)

    //make the default data object for loading restaurants
    let data_rest = {
        longitude : position.coords.longitude,
        latitude : position.coords.latitude,
        sort_by:"best_match",
        open_at:undefined,
        open_now:true,
        radius:3220 //meters
    }

    //restCoord = loadRestaurants(data,mapData,"home");

    let data_vac = {
        centerPointLatitude: position.coords.latitude,
        centerPointLongitude: position.coords.longitude,
        distanceInKm:16.1,
        sort:"averageRating:desc",
        availabilityStart:undefined,
        availabilityEnd:undefined,
        minNightlyPrice:0,
        maxNightlyPrice:1000
    }

    //vacCoord = loadRentals(data,mapData,"home");

    let data_crm = {
        lat:position.coords.latitude,
        lon:position.coords.longitude,
        radius:100
    }
    //crimeCoord = loadCrimes(data,mapData,"home");


    initCustomMap($('#home_map_section'),position.coords.longitude,position.coords.latitude,data_rest,data_vac,data_crm,
        "true","true","true","home-curr");
    // $('#home_map_section').show();
}


/*
* Initialize default map
* */
function initDefaultMap()
{
    //calling map_script::initMap
    // initMap($('#home_map_section'),-122.392,37.6148)

    //console.log("initCurrLocationMap")

    //call map_script::initFirstMap
    mapData = initFirstMap($('#home_map_section'),-122.392,37.6148, mapData)

    //make the default data object for loading restaurants
    let data_rest = {
        longitude : -122.392,
        latitude : 37.6148,
        sort_by:"best_match",
        open_at:undefined,
        open_now:true,
        radius:3220 //meters
    }

    //restCoord = loadRestaurants(data,mapData,"home");

    let data_vac = {
        centerPointLatitude: 37.6148,
        centerPointLongitude: -122.392,
        distanceInKm:16.1,
        sort:"averageRating:desc",
        availabilityStart:undefined,
        availabilityEnd:undefined,
        minNightlyPrice:0,
        maxNightlyPrice:1000
    }

    //vacCoord = loadRentals(data,mapData,"home");

    let data_crm = {
        lat:37.6148,
        lon:-122.392,
        radius:100
    }
    //crimeCoord = loadCrimes(data,mapData,"home");


    initCustomMap($('#home_map_section'),position.coords.longitude,position.coords.latitude,data_rest,data_vac,data_crm,
        "true","true","false","home-curr");
    // $('#home_map_section').show();
}

function initData(lat,lon,forPage)
{
    let data_rest = {
        longitude : lon,
        latitude : lat,
        sort_by:"best_match",
        open_at:undefined,
        open_now:true,
        radius:3220 //meters
    }

    //restCoord = loadRestaurants(data,mapData,"home");

    let data_vac = {
        centerPointLatitude: lat,
        centerPointLongitude: lon,
        distanceInKm:16.1,
        sort:"averageRating:desc",
        availabilityStart:undefined,
        availabilityEnd:undefined,
        minNightlyPrice:0,
        maxNightlyPrice:1000
    }

    //vacCoord = loadRentals(data,mapData,"home");

    let data_crm = {
        lat:lat,
        lon:lon,
        radius:100
    }

    initCustomMap($('#home_map_section'),lon,lat,data_rest,data_vac,data_crm,
        "true","true","false",forPage);
}





/*
Handle login
 */
function checkLogin(username, password) {
    console.log("checking credentials")
    data = {
        username : username,
        password : password
    }

    $.ajax({
        type: "POST",
        url: loginURL,
        data: data,
        success: function(data, textStatus, xhr) {
            console.log("login success")

            // console.log(xhr)
            // console.log(xhr.status);

            localStorage.setItem("username",xhr.responseJSON.user.username)
            localStorage.setItem("userdata",JSON.stringify(xhr.responseJSON.user))
            localStorage.setItem("longitude", xhr.responseJSON.user.address.longitude)
            localStorage.setItem("latitude", xhr.responseJSON.user.address.latitude)
            localStorage.setItem("curr_addr",xhr.responseJSON.user.address_string)
            //defaults
            localStorage.setItem("cb-rest","true")
            localStorage.setItem("cb-vac","true")
            localStorage.setItem("cb-crime","true")

            //load pref data
            $.ajax({
                type: "GET",
                url: "/user/prefData/" + username,
                success: function (data, textStatus, xhr) {
                    // console.log(xhr)
                    // console.log(xhr.status);
                    localStorage.setItem("preferences",JSON.stringify(xhr.responseJSON))
                    //console.log(localStorage.getItem("preferences"))
                    window.location.href = '/user.html'
                },
                error: function (xhr, textStatus) {
                    console.log("error2")
                    // console.log(xhr)
                    // console.log(xhr.status);
                    window.location.href = '/user.html'
                }
            })
        },
        error: function(xhr, textStatus) {
            console.log("login error")
            // console.log(xhr)
            // console.log(xhr.status);
            $('#invalid-login').modal('show')
        }
    });
}

/*
Handle Login button event
 */
$('#form-sign-in').submit(function (e) {
    e.preventDefault();
    checkLogin($("#signin-username").val(),$("#signin-password").val())
})

/*
Handle Register Button press
 */
$('#btn-sign-up').click(function (e) {
    e.preventDefault();
    console.log("sign up button clicked")
    window.location.href = '/register.html'
})


/**
 * Document load method
 * Gets the current location of the user
 * and loads the data
 * */
$(document).ready(function() {

    //clear the localStorage everytime we visit home page
    localStorage.clear();

    //hide the sections to be displayed if the data is loaded successfully
    $('#home_sec_curr').hide()
    $('#home_rest_sec_curr').hide()
    $('#home_vac_sec_curr').hide()
    $('#home_crime_sec_curr').hide();

    $('#home_sec_la').hide()
    $('#home_rest_sec_la').hide()
    $('#home_vac_sec_la').hide()
    $('#home_crime_sec_la').hide();


    $('#home_sec_ny').hide()
    $('#home_rest_sec_ny').hide()
    $('#home_vac_sec_ny').hide()
    $('#home_crime_sec_ny').hide();


    $('#home_map_section').hide();

    //get the current location and initialize data based on current location or default location
    if( navigator.geolocation )
    {
        navigator.geolocation.getCurrentPosition( initCurrLocationMap, initDefaultMap );
    }
    else
    {
        alert("Sorry, your browser does not support geolocation services.");
        initDefaultMap();
    }

    initData(34.0432071,-118.2849729,"home-la");
    initData(40.7215106,-74.0042446,"home-ny");
    // initData(27.9482934,-82.4612052,"home-tm");
    // initData(36.1700301,-115.137898,"home-vg");
    // initData(21.3040369,-157.8695565,"home-ho");
});

