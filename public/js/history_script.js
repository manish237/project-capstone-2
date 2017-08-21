let host = window.location.hostname;


function renderHistData(data)
{
    console.log(data)
    // console.log(data.length)
    if(data.length!==0)
    {
        for(let i=0;i<data.length;i++)
        {
            // console.log(i)
            elem=`<div class="row hist-item">
                            <div class="col-sm-7 hist-item-val">
                                <label class="addr">${data[i].address}</label>
                            </div>
                            <div class="col-sm-1 hist-item-img-div">
                                <a href="#" data-id="${data[i].id}" class="ln-hist-item-del" onclick="deleteItem(this)"><img class="hist-item-img" src="images/warning-delete-cross-stop-close-exit-cancel-icon.png" width="30px" height="30px"/></a>
                            </div>
                        </div>`

            $("#hist-data-sec").append(elem)
        }
        elem = "</div>\n"
        $("#hist-data-sec").append(elem)
        $("#hist-sec").show();
        $("#hist-no-result").hide()


    }
    else
    {
        $("#hist-sec").hide();
        $("#hist-no-result").show()
    }
}

/*
    Call auth api to register the user
 */
function loadHistData(username) {
    console.log("inside loadHistData")
    console.log(username)
    $.ajax({
        type: "GET",
        url: "/user/addrHist/"+username,
        success: function(data, textStatus, xhr) {
            console.log("loadHistData success")
            //
            console.log(xhr)
            renderHistData(xhr.responseJSON.addressHistData)
        },
        error: function(xhr, textStatus) {
            console.log("loadHistData error")
            // console.log(xhr)
            // console.log(xhr.status);
            alert(xhr.responseJSON.message);
        }
    });
}

function refresh() {
    $("#hist-data-sec").empty();
    $("#hist-no-result").hide();
    $("#hist-sec").hide();
    loadHistData(localStorage.getItem("username"))
}

/*
* Handle delete all button event
 */

$('.btn-hist-delete-all').click(function (e) {

    console.log("delete all button clicked");
    e.preventDefault();

    $.ajax({
        type: "DELETE",
        url: "/user/addrHist/"+localStorage.getItem("username"),
        success: function(data, textStatus, xhr) {
            console.log("delete all success")
            //
            console.log(xhr)
            // console.log(xhr.status);
            refresh();

        },
        error: function(xhr, textStatus) {
            console.log("delete all error")
            // console.log(xhr)
            // console.log(xhr.status);
            alert(xhr.responseJSON.message);
        }
    });
});

/*
    Handle cancel button event
 */
$('.btn-hist-cancel').click(function (e) {
    e.preventDefault();
    console.log("cancel button clicked")
    window.location.href = '/user.html'
});

$('.btn-hist-back').click(function (e) {
    e.preventDefault();
    console.log("back button clicked")
    window.location.href = '/user.html'
});

/*$('.ln-hist-item-del').on("click",function (e) {
    e.preventDefault();
    console.log($('.ln-hist-item-del'))//.getAttribute("data-id"))
    console.log($('.ln-hist-item-del'))//.getAttribute("data-id"))
    // window.location.href = '/user.html'
});*/

function deleteItem(item) {
    console.log("del button clicked")

    console.log(item.getAttribute("data-id"))
    $.ajax({
        type: "DELETE",
        url: "/user/addrHist/"+localStorage.getItem("username")+"/"+item.getAttribute("data-id"),
        success: function(data, textStatus, xhr) {
            console.log("delete success")
            //
            console.log(xhr)
            // console.log(xhr.status);
            refresh();

        },
        error: function(xhr, textStatus) {
            console.log("delete all error")
            // console.log(xhr)
            // console.log(xhr.status);
            alert(xhr.responseJSON.message);
        }
    });

}

$(document).ready(function() {


    refresh();

});
