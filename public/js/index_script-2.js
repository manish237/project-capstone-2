let host = window.location.hostname;
let loginURL = "/auth/login";
//let mapHome;
let HOME_PAGE_DATA_LIMIT = 5;


/*
Handle Register Button press
 */
$('#btn-splash').click(function (e) {
    e.preventDefault();
    console.log("sign up button clicked")
    window.location.href = '/index-1.html'
})


