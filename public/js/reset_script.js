let host = window.location.hostname;

function resetPass(data) {
    console.log("inside resetPass")
    data = {
        username : data.username,
        password : data.password
    }

    $.ajax({
        type: "PUT",
        url: "/auth/reset/"+data.username,
        data: data,
        success: function(data, textStatus, xhr) {
            console.log("reset success")

            console.log(xhr)
            // console.log(xhr.status);

            //set local storage
            localStorage.setItem("username",xhr.responseJSON.username)
            localStorage.setItem("userdata",JSON.stringify(xhr.responseJSON))
            localStorage.setItem("longitude", xhr.responseJSON.address.longitude)
            localStorage.setItem("latitude", xhr.responseJSON.address.latitude)
            localStorage.setItem("curr_addr",xhr.responseJSON.address_string)

            //------Future -- Pref Data load and set in localstorage

            //defaults
            localStorage.setItem("cb-rest","true")
            localStorage.setItem("cb-vac","true")
            localStorage.setItem("cb-crime","true")

            window.location.href = '/user.html'
        },
        error: function(xhr, textStatus) {
            console.log("reset error")
            // console.log(xhr)
            // console.log(xhr.status);
            alert(xhr.responseJSON.message);
        }
    });
}

/*
* Handle reset button event
 */
$('#form-reset').submit(function (e) {

    console.log("reset button clicked")
    e.preventDefault();

    //validate passwords
    pass1 = $("#pwd").val();
    pass2 = $("#cpwd").val()

    // console.log($("#email").val())
    // console.log(pass1)
    // console.log(pass2)

    if(pass1!=pass2)
        alert("Passwords do not match.");
    else{
        let data = {
            "username": $("#email").val(),
            "password": $("#pwd").val()
        }
        resetPass(data)
    }

})

/*
    Handle cancel button event
 */
$('#btn-cancel').click(function (e) {
    e.preventDefault();
    console.log("cancel button clicked")
    window.location.href = '/home.html'
})