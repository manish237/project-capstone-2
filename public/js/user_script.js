let host = window.location.hostname;

let rest_sort_by;
let rest_open_now;
let rest_open_at;
let rest_open_at_datetime;
let vac_sort_by;
let vac_price_start;
let vac_price_end;
let vac_date_start;
let vac_date_end;
let crm_dist;



/*
    Data load function
    1. read the lon/lat from localstorage
    2. read the cbs from localstorage -- default is true if undefined
    3. read other data from localstorage especially curr_addr
 */
function refresh() {
    console.log("refresh")

    let lon = localStorage.getItem("longitude")!==undefined?localStorage.getItem("longitude"):-122.392;
    let lat = localStorage.getItem("latitude")!==undefined?localStorage.getItem("latitude"):37.6148;

    /*
   * Reading Filter info from localstorage and setting the UI elements
   * */

    //hide everything for load
    $('#user-rest-sec').hide()
    $('#user-rest-sec').empty()
    $('#user-vac-sec').hide()
    $('#user-vac-sec').empty()
    $('#user-crime-sec').hide();
    $('#user-crime-sec').empty();
    $('#user-map-section').hide();

    //Filters for Restaurants

    let data_rest;
    if(localStorage.getItem("rest_open_now")==="true") {
        data_rest = {
            longitude: lon,
            latitude: lat,
            sort_by: localStorage.getItem("rest_sort_by"),
            open_now: localStorage.getItem("rest_open_now")==="true"?true:false,
            radius: 3220 //meters
        }
    }
    else if(localStorage.getItem("rest_open_at")==="true")
    {
        data_rest = {
            longitude: lon,
            latitude: lat,
            sort_by: localStorage.getItem("rest_sort_by"),
            open_at: parseInt(localStorage.getItem("rest_open_at_datetime")),
            radius: 3220 //meters - default
        }
    }

    //Filters for vacation rental


    let data_vac = {
        centerPointLongitude: lon,
        centerPointLatitude: lat,
        distanceInKm:16.1,//default
        sort: localStorage.getItem("vac_sort_by"),
        availabilityStart:localStorage.getItem("vac_date_start")!==""?localStorage.getItem("vac_date_start"):undefined,
        availabilityEnd:localStorage.getItem("vac_date_end")!==""?localStorage.getItem("vac_date_end"):undefined,
        minNightlyPrice:localStorage.getItem("vac_price_start"),
        maxNightlyPrice:localStorage.getItem("vac_price_end"),
    };

    //read distant

    let data_crm = {
        lon:lon,
        lat:lat,
        radius:localStorage.getItem("crm_dist")
    };

    console.log(data_rest)
    console.log(data_vac)
    console.log(data_crm)

    //load data
    initUserMap(lon,lat,data_rest,data_vac,data_crm,
        localStorage.getItem("cb-rest")!==null?localStorage.getItem("cb-rest"):true,
        localStorage.getItem("cb-vac")!==null?localStorage.getItem("cb-vac"):true,
        localStorage.getItem("cb-crime")!==null?localStorage.getItem("cb-crime"):true)
}


function initLocalStorage() {
    //Checkboxes
    if(localStorage.getItem("cb-rest")===null || localStorage.getItem("cb-rest")===undefined)
        localStorage.setItem("cb-rest","true")
    if(localStorage.getItem("cb-vac")===null || localStorage.getItem("cb-vac")===undefined)
        localStorage.setItem("cb-vac","true")
    if(localStorage.getItem("cb-crime")===null || localStorage.getItem("cb-crime")===undefined)
        localStorage.setItem("cb-crime","true")

    if(localStorage.getItem("rest_sort_by")===null || localStorage.getItem("rest_sort_by")===undefined)
        localStorage.setItem("rest_sort_by","best_match")
    if(localStorage.getItem("rest_open_now")===null || localStorage.getItem("rest_open_now")===undefined)
        localStorage.setItem("rest_open_now","true")
    if(localStorage.getItem("rest_open_at")===null || localStorage.getItem("rest_open_at")===undefined)
        localStorage.setItem("rest_open_at","false")
    if(localStorage.getItem("rest_open_at_datetime")===null || localStorage.getItem("rest_open_at_datetime")===undefined)
        localStorage.setItem("rest_open_at_datetime",moment().unix())
    if(localStorage.getItem("vac_sort_by")===null || localStorage.getItem("vac_sort_by")===undefined)
        localStorage.setItem("vac_sort_by","averageRating:desc")
    if(localStorage.getItem("vac_date_start")===null || localStorage.getItem("vac_date_start")===undefined)
        localStorage.setItem("vac_date_start","")
    if(localStorage.getItem("vac_date_end")===null || localStorage.getItem("vac_date_end")===undefined)
        localStorage.setItem("vac_date_end","")
    if(localStorage.getItem("vac_price_start")===null || localStorage.getItem("vac_price_start")===undefined)
        localStorage.setItem("vac_price_start",0)
    if(localStorage.getItem("vac_price_end")===null || localStorage.getItem("vac_price_end")===undefined)
        localStorage.setItem("vac_price_end",1000)
    if(localStorage.getItem("crm_dist")===null || localStorage.getItem("crm_dist")===undefined)
        localStorage.setItem("crm_dist",100)
}


function initUI() {

    //Search Check boxes
    // console.log(localStorage.getItem("cb-rest"))
    if(localStorage.getItem("cb-rest") === "true")
        document.getElementById("cb-rest").checked = true;
    else  if(localStorage.getItem("cb-rest") === "false")
        document.getElementById("cb-rest").checked = false;

    // console.log(localStorage.getItem("cb-vac"))
    if(localStorage.getItem("cb-vac") === "true")
        document.getElementById("cb-vac").checked = true;
    else  if(localStorage.getItem("cb-vac") === "false")
        document.getElementById("cb-vac").checked = false;

    // console.log(localStorage.getItem("cb-crime"))
    if(localStorage.getItem("cb-crime") === "true")
        document.getElementById("cb-crime").checked = true;
    else  if(localStorage.getItem("cb-crime") === "false")
        document.getElementById("cb-crime").checked = false;



    //Restaurant Sort By
    // console.log(localStorage.getItem("rest_sort_by"))
    if(localStorage.getItem("rest_sort_by")==="")
    {
        $("#filter-rest-sort-by").val("best_match");
    }
    else
    {
        $("#filter-rest-sort-by").val(localStorage.getItem("rest_sort_by"));
    }

    //Restaurant Open Now
    // console.log(localStorage.getItem("rest_open_now"))
    if(localStorage.getItem("rest_open_now")==="")
    {
        $("#filter-rest-open-now").attr('checked',true)
        $("#filter-rest-open-at").attr('checked',false)
        $('#filter-rest-open-at-date-time').hide()
    }
    else
    {
        if(localStorage.getItem("rest_open_now")==="true" || localStorage.getItem("rest_open_now")===true)
        {
            $("#filter-rest-open-now").attr('checked',true)
            $("#filter-rest-open-at").attr('checked',false)
            $('#filter-rest-open-at-date-time').hide()
        }
    }

    //Restaurant Open At
    // console.log(localStorage.getItem("rest_open_at"))
    if(localStorage.getItem("rest_open_at")==="")
    {
        $("#filter-rest-open-now").attr('checked',true)
        $("#filter-rest-open-at").attr('checked',false)
        $('#filter-rest-open-at-date-time').hide()
    }
    else
    {
        if(localStorage.getItem("rest_open_at")==="true")
        {
            $("#filter-rest-open-now").attr('checked',false)
            $("#filter-rest-open-at").attr('checked',true)
            $('#filter-rest-open-at-date-time').show()
        }
    }


    //Restaurant Open At Date Time
    // console.log(localStorage.getItem("rest_open_at_datetime"))

    // console.log(moment.unix(parseInt(localStorage.getItem("rest_open_at_datetime"))).format("MM/DD/YYYY h:mm A"))
    if(localStorage.getItem("rest_open_at_datetime")==="")
    {
        $('#filter-rest-open-at-date-time').datetimepicker({
            defaultDate: moment.unix().format("MM/DD/YYYY h:mm a")
        });
    }
    else
    {
        let str = moment.unix(parseInt(localStorage.getItem("rest_open_at_datetime"))).format("MM/DD/YYYY h:mm A")
        // console.log(typeof str)
        $('#filter-rest-open-at-date-time').datetimepicker({
            defaultDate: str
        })
    }


    //Vacation Rental Sort By
    // console.log(localStorage.getItem("vac_sort_by"))
    if(localStorage.getItem("vac_sort_by")==="")
    {
        $('#filter-vac-sort-by').val("averageRating:desc");
    }
    else
    {
        $('#filter-vac-sort-by').val(localStorage.getItem("vac_sort_by"));
    }

    // Vacation Rental - Date Picker
    let start_date="", end_date=""
    // console.log(localStorage.getItem("vac_date_start"))
    if(localStorage.getItem("vac_date_start")==="") {
        start_date = moment().format('MM-DD-YYYY');
    }
    else {
        start_date = localStorage.getItem("vac_date_start");
    }

    // console.log(localStorage.getItem("vac_date_end"))
    if(localStorage.getItem("vac_date_end")==="") {
        end_date = moment().format('MM-DD-YYYY');
    }
    else {
        end_date = localStorage.getItem("vac_date_end");
    }

    if(start_date.length !==0 && end_date.length!=0) {
        $('#filter-vac-date-range').daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            }
        });
        $('#filter-vac-date-range').val(start_date + ' - ' + end_date);
    }
    else {
        $('#filter-vac-date-range').daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            }
        });
    }

    //Vacation Rental - Display Price Range picker

    let val = [];
    // console.log(localStorage.getItem("vac_price_start"))
    // console.log(localStorage.getItem("vac_price_end"))
    val.push(parseInt(localStorage.getItem("vac_price_start")))
    val.push(parseInt(localStorage.getItem("vac_price_end")))
    $("#filter-vac-price-range").slider({
        value : val
    });

    /**
     * Crime Report - Distance Range Picker
     */

    // console.log(localStorage.getItem("crm_dist"))
    $('#filter-crm-dist-range').slider({
        value: parseInt(localStorage.getItem("crm_dist")),
        formatter: function(value) {
            return 'Current value: ' + value;
        }
    });



}



/*
    Document Load

 */
$(document).ready(function() {

    //intialize localStorage
    initLocalStorage();

    //initialize UI elements
    initUI();

    refresh()
});

/*
    Handle filter apply button

 */
$('#form-filter').submit(function (e) {
    e.preventDefault()


    //add/update the filter data in localstorage
    console.log("Apply filter")

    localStorage.setItem("rest_sort_by",rest_sort_by!==undefined?rest_sort_by:"best_match")
    localStorage.setItem("rest_open_now",rest_open_now!==undefined?rest_open_now:"true")
    localStorage.setItem("rest_open_at",rest_open_at!==undefined?rest_open_at:"false")
    localStorage.setItem("rest_open_at_datetime",rest_open_at_datetime!==undefined?rest_open_at_datetime:moment().unix())
    localStorage.setItem("vac_sort_by",vac_sort_by!==undefined?vac_sort_by:"averageRating:desc")
    localStorage.setItem("vac_date_start",vac_date_start!==undefined?vac_date_start:"")
    localStorage.setItem("vac_date_end",vac_date_end!==undefined?vac_date_end:"")
    localStorage.setItem("vac_price_start",vac_price_start!==undefined?vac_price_start:0)
    localStorage.setItem("vac_price_end",vac_price_end!==undefined?vac_price_end:1000)
    localStorage.setItem("crm_dist",crm_dist!==undefined?crm_dist:100)

    refresh()
})





/*
    Handle search button click
*/
$('#form-user-addr-search').submit(function (e) {

    console.log("search button clicked")
    e.preventDefault();

    //update local storage for location details
    localStorage.setItem("curr_addr",localStorage.getItem("curr_map_addr"))
    localStorage.setItem("latitude",localStorage.getItem("curr_map_lat"))
    localStorage.setItem("longitude",localStorage.getItem("curr_map_lon"))

    let lon = localStorage.getItem("longitude")!==undefined?localStorage.getItem("longitude"):-122.392;
    let lat = localStorage.getItem("latitude")!==undefined?localStorage.getItem("latitude"):37.6148;

    //update local storage for check boxes
    localStorage.setItem("cb-rest", $("#cb-rest").is(':checked'))
    localStorage.setItem("cb-vac", $("#cb-vac").is(':checked'))
    localStorage.setItem("cb-crime", $("#cb-crime").is(':checked'))

    refresh()
})















/*
    Handle Edit Profile link

 */
$("#ln-edit-details").click(function (e) {
    e.preventDefault()
    console.log("editing details")
    window.location.href = '/edit.html'

})

/*
    Handle logout link

 */
$("#ln-log-out").click(function (e) {
    e.preventDefault()
    localStorage.clear();
    window.location.href = '/index.html'
    console.log("logging out")

})



/********************************************************************
    Below functions handle the filter changes
 ********************************************************************/

/**
 * Handle Restaurant Sort By Filter dropdown change
 */
$("#filter-rest-sort-by").change(function (e) {
    e.preventDefault()
//    console.log($('#filter-rest-sort-by-option').val())
    rest_sort_by = $('#filter-rest-sort-by').val();
})

/**
 * Handle Restaurant Open Now radio button click
 * disable the date-time element
 */

$("#filter-rest-open-now").click(function (e) {
    //e.preventDefault()
    console.log("open now clicked")
    rest_open_now = true;
    rest_open_at = false;
    $("#filter-rest-open-at-date-time").hide()
})

/**
 * Handle Restaurant Open At radio button click
 * Enable the date-time element
 */

$("#filter-rest-open-at").click(function (e) {
    //e.preventDefault()
//    console.log($('#filter-rest-sort-by-open-at').val())
    rest_open_at = true;
    rest_open_now = false;
    $("#filter-rest-open-at-date-time").show()
})

/**
 * Handle Restaurant Open At date-time field change
 */
$("#filter-rest-open-at-date-time").on("dp.change",function (e) {
//    e.preventDefault()
    let str = e.date._d;
    //Sun Jun 18 2017 17:38:00 GMT-0500
    rest_open_at_datetime = moment(str,"ddd MMM DD YYYY HH:MM zZ").unix()
})

/**
 * Handle Vacation Rental Sort By Dropdown change
 */
$("#filter-vac-sort-by").change(function (e) {
    e.preventDefault()
//    console.log($('#filter-vac-sort-by-option').val())
    vac_sort_by = $('#filter-vac-sort-by').val();
})

/**
 * Handle Vacation Rental Date range picker change
 */
$("#filter-vac-date-range").on("apply.daterangepicker",function (e, picker) {
//    e.preventDefault()
    //yyyy-MM-dd
    vac_date_start = picker.startDate.format('YYYY-MM-DD');
    vac_date_end = picker.endDate.format('YYYY-MM-DD');
    $(this).val(picker.startDate.format('MM-DD-YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
})

$("#filter-vac-date-range").on('cancel.daterangepicker', function(ev, picker) {
    vac_date_start = undefined

    vac_date_end = undefined
    $(this).val('');
});


/**
 * Handle Vacation Rental Price Range  change
 */

$("#filter-vac-price-range").on("change",function (e) {
//    e.preventDefault()
    //yyyy-MM-dd
    // console.log("slider")
    // console.log(e)
    // console.log(e.value.newValue[0])
    vac_price_start = e.value.newValue[0];
    // console.log(e.value.newValue[1])
    vac_price_end = e.value.newValue[1];
})

/**
 * Handle Crime Report Distance range change
 * call refresh
 */

$("#filter-crm-dist-range").on("change",function (e) {
//    e.preventDefault()
    //yyyy-MM-dd
    // console.log("slider")
    // console.log(e)
    // console.log(e.value.newValue)
    crm_dist = e.value.newValue;
    refresh()

})
