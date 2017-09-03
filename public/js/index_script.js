let host = window.location.hostname;
let loginURL = "/auth/login";
//let mapHome;
let HOME_PAGE_DATA_LIMIT = 5;


/*
Handle Register Button press
 */
$('#btn-sign-in').click(function (e) {
    e.preventDefault();
    console.log("sign up button clicked")
    window.location.href = '/home.html'
})


$('#btn-sign-up').click(function (e) {
    e.preventDefault();
    console.log("sign up button clicked")
    window.location.href = '/register.html'
})

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 80; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 80; // For IE and Firefox
}