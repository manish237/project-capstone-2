


let host = window.location.hostname;

/*
    Call data API to update user data
 */
function editUser(data) {

    $.ajax({
        type: "PUT",
        url: "/user/data/"+data.username,
        data: JSON.stringify(data),
        headers: {
            //'x-auth-token': localStorage.accessToken,
            "Content-Type": "application/json"
        },
        success: function(data, textStatus, xhr) {
            console.log("success")

            console.log(xhr)
            // console.log(xhr.status);

            //set local storage
            localStorage.setItem("username",xhr.responseJSON.registerData.username)
            localStorage.setItem("userdata",JSON.stringify(xhr.responseJSON.registerData))
            localStorage.setItem("longitude", xhr.responseJSON.registerData.address.longitude)
            localStorage.setItem("latitude", xhr.responseJSON.registerData.address.latitude)
            localStorage.setItem("curr_addr",xhr.responseJSON.registerData.address_string)

            //------Future -- Pref Data create and set in localstorage

            //restore to default
            localStorage.setItem("cb-rest","true")
            localStorage.setItem("cb-vac","true")
            localStorage.setItem("cb-crime","true")

            window.location.href = '/user.html'
        },
        error: function(xhr, textStatus) {
            console.log("error")
            console.log(xhr)
            console.log(xhr.status);
            alert(xhr.responseJSON.message);
        }
    });
}

/*
    Handle submit button event
*/
$('#form-edit').submit(function (e) {

    console.log("reset button clicked")
    e.preventDefault();

    let data = {
        "username": localStorage.getItem("username"),
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

    editUser(data)
})

/*
    Handle cancel button event
*/
$('#btn-cancel').click(function (e) {
    e.preventDefault();
    console.log("cancel button clicked")
    window.location.href = '/user.html'
})


$(document).ready(function() {
    let userData = JSON.parse(localStorage.getItem("userdata"));

    //initialize the fields
    document.getElementById("fname").value = userData.firstName;
    document.getElementById("lname").value = userData.lastName;
    document.getElementById("street_number").value = userData.address.address1;
    document.getElementById("route").value = userData.address.address2;
    document.getElementById("locality").value = userData.address.city;
    document.getElementById("administrative_area_level_1").value = userData.address.state;
    document.getElementById("postal_code").value = userData.address.zip;
    document.getElementById("country").value = userData.address.country;
    document.getElementById("latitude").value = userData.address.latitude;
    document.getElementById("longitude").value = userData.address.longitude;

    let prefData = JSON.parse(localStorage.getItem("preferences"));

    $("#edit-addr-sec-hidden").hide()
    //console.log(prefData)
});







