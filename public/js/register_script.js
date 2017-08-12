let host = window.location.hostname;


/*
    Call auth api to register the user
 */
function registerUser(data) {
    console.log("inside registerUser")
    console.log(data)
    $.ajax({
        type: "POST",
        url: "http://" + host + ':8080/auth/register',
        data: data,
        success: function(data, textStatus, xhr) {
            console.log("registration success")
            //
            console.log(xhr)
            // console.log(xhr.status);

            //set local storage
            localStorage.setItem("username",xhr.responseJSON.username)
            localStorage.setItem("userdata",JSON.stringify(xhr.responseJSON))
            localStorage.setItem("longitude", xhr.responseJSON.address.longitude)
            localStorage.setItem("latitude", xhr.responseJSON.address.latitude)
            localStorage.setItem("curr_addr",xhr.responseJSON.address_string)

            //------Future -- Pref Data create and set in localstorage
            //defaults
            localStorage.setItem("cb-rest","true")
            localStorage.setItem("cb-vac","true")
            localStorage.setItem("cb-crime","true")


            window.location.href = '/user.html'
        },
        error: function(xhr, textStatus) {
            console.log("registration error")
            // console.log(xhr)
            // console.log(xhr.status);
            alert(xhr.responseJSON.message);
        }
    });
}


/*
* Handle register button event
 */

$('#form-register').submit(function (e) {

    console.log("register button clicked");
    e.preventDefault();

    //validate passwords
    pass1 = $("#pwd").val();
    pass2 = $("#cpwd").val();

    if(pass1!==pass2)
        alert("Passwords do not match.");
    else{
        let data = {
                "username": $("#email").val(),
                "password": $("#pwd").val(),
                "firstName": $("#fname").val(),
                "lastName": $("#lname").val(),

                "address" : {
                    "address1": $("#street_number").val(),
                    "address2": $("#route").val(),
                    "city": $("#locality").val(),
                    "state": $("#administrative_area_level_1").val(),
                    "zip": $("#postal_code").val(),
                    "country": $("#country").val(),
                    "longitude": $("#longitude").val(),
                    "latitude": $("#latitude").val()
                },
                "vehicle": {
                    year: "",
                    make: "",
                    model: "",
                    mpg: ""
                }
        }
        registerUser(data)
    }
});

/*
    Handle cancel button event
 */
$('#btn-cancel').click(function (e) {
    e.preventDefault();
    console.log("cancel button clicked")
    window.location.href = '/index.html'
});

$("#reg-addr-sec-hidden").hide()