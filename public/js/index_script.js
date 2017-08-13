let host = window.location.hostname;
let loginURL = "/auth/login";
//let mapHome;
let HOME_PAGE_DATA_LIMIT = 5;


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
    $('#home_rest_section').hide()
    $('#home_vac_section').hide()
    $('#home_crime_section').hide();
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
});

