let host = window.location.hostname;
// let mapUser
// let restSearchRequestURL = "http://" + host + ':8080/extdata/yelp';
// let vacSearchRequestURL = "http://" + host + ':8080/extdata/vr';
// let crimeSearchRequestURL = "http://" + host + ':8080/extdata/crime';
// let rest_open_at_unix=0;
// let vac_start_date;
// let vac_end_date;
// let vac_min_price;
// let vac_max_price;
// let crime_dist;

// console.log($('#filter-rest-sort-by-option'));
// console.log($('#filter-rest-sort-by-open-now'));
// console.log($('#filter-rest-sort-by-open-at'));
// console.log($('#filter-rest-sort-by-open-at-date-time'));
// console.log($('#filter-vac-sort-by-option'));
// console.log($('#filter-vac-date-range'));
// console.log($('#filter-vac-price-range'));
// console.log($('#filter-vac-dist-range'));

/*function renderRestData(dataUI) {

    //console.log(dataUI.length)
    let elem = "<h3 id='rest-head-text'>Restaurants</h3>" +
               "<strong><span class='at_address'> (Near:" + localStorage.getItem("curr_addr") + ")</span></strong>"
    $('#user-rest-sec').append(elem);
    for(let i =0;i<dataUI.length;i++)
    {
        if(i>2)
            break;
        else{
                elem =
                "<div class='row rest-row-item'>" +
                "<div class='col-md-2 rest-row-item-img-sec'>" +
                "<img src='" +  dataUI[i].image_url + "' width='100' height='100' class='rest-row-item-img'/>" +
                "</div>" +
                "<div class='col-md-4 rest-row-item-name-sec'>" +
                "<h5 class='rest-row-item-name-lb'>Restaurant Name</h5>" +
                "<small class='rest-row-item-name-text'>" + dataUI[i].name + "</small>" +
                "<h5 class='rest-row-item-address-lb'>Address</h5>" +
                "<small class='rest-row-item-address-text'>" + dataUI[i].address +"</small>" +
                "<small class='rest-row-item-phone-lb'><b>Phone: </b></small>" +
                "<small class='rest-row-item-phone-text'>" + dataUI[i].phone + "</small>" +
                "</div>" +
                "<div class='col-md-4' class='rest-row-item-review-sec'>" +
                "<small><b>Type: </b></small>" +
                "<small class='rest-row-item-review-cat'>" + dataUI[i].categories + "</small>" +
                "<br>" +
                "<small><b>Ratings: </b></small>" +
                "<small class='rest-row-item-review-rate'>" + dataUI[i].rating + "</small>" +
                "(" +
                "<small class='rest-row-item-review-cnt'>" + dataUI[i].review_count + "</small>)" +
                "<br>" +
                "<a class='btn btn-default rest-row-item-detail-btn' target='_blank' href='" +  dataUI[i].url + "' role='button'>View details</a>" +
                "</div>" +
                "</div>"
            //console.log(elem)
            $('#user-rest-sec').append(elem)
            $('#user-rest-sec').append("<HR>")
        }
    }
    $('#user-rest-sec').show()
}*/

/*function renderVacData(dataUI) {

    //console.log(dataUI.length)
    let elem = "<h3 id='rest-head-text'>Vacation Rentals</h3>" +
        "<strong><span class='at_address'> (Near:" + localStorage.getItem("curr_addr") + ")</span></strong>"
    $('#user-vac-sec').append(elem);
    for(let i =0;i<dataUI.length;i++)
    {
        if(i>2)
            break;
        else{
            elem =
                "<div class='row vac-row-item'>" +
                "<div class='col-md-2 vac-row-item-img-sec'>" +
                    "<img src='" + dataUI[i].image_url + "' width='100' height='100' class='vac-row-item-img' />" +
                "</div>" +
                "<div class='col-md-4 vac-row-item-head-sec'>" +
                    "<h5 class='vac-row-item-head-lb'>" + dataUI[i].headline + "</h5>" +
                "</div>" +
                "<div class='col-md-4 vac-row-item-detail-sec'>" +
                    "<small><b>Avg Nightly Price: </b></small>" +
                    "<small class='vac-row-item-detail-price'>" + dataUI[i].price + "</small>" +
                    "(" +
                    "<small class='vac-row-item-detail-curr'>" + dataUI[i].priceCurr + "</small>)" +
                    "<br>" +
                    "<small><b>Ratings: </b></small>" +
                    "<small class='vac-row-item-detail-rate'>" + dataUI[i].reviewAverage + "</small>" +
                    "(" +
                    "<small class='vac-row-item-detail-cnt'>" + dataUI[i].reviewCount + "</small>)" +
                    "<br>" +
                    "<a class='btn btn-default' target='_blank' class='vac-row-item-detail-btn' href='" + dataUI[i].url + "' role='button'>View details</a>" +
                "</div>" +
            "</div>"
            //console.log(elem)
            $('#user-vac-sec').append(elem)
            $('#user-vac-sec').append("<HR>")

        }
    }
//    $('.at_address')[1].innerHTML =`(Near: ${localStorage.getItem("curr_addr")})`;
    $('#user-vac-sec').show()
}*/

/*function renderCrimeData(dataUI) {
    let elem = "<h3 id='rest-head-text'>Crime Report at Area</h3>" +
        "<strong><span class='at_address'> (Near:" + localStorage.getItem("curr_addr") + ")</span></strong>";
    $('#user-crime-sec').append(elem);
    elem =
        "<div class='row crime-rows'>" +
            "<div class='col-md-10'>" +
                "<div class='row'>" +
                    "<div class='col-md-12'>" +
                        "<div class='row'>" +
                            "<div class='col-md-12 crime-cnt-sec'>" +
                                "<big class='crime-cnt-lb'>Total reports:</big>" +
                                "<big class='crime-cnt'>" + dataUI.totCount + "</big>" +
                            "</div>" +
                        "</div>" +
                        "<div class='row'>" +
                            "<div class='col-md-12'>" +
                                "<table class='table crime-tab'>" +
                                    "<thead>" +
                                        "<th>Type</th>" +
                                        "<th>#</th>" +
                                        "<th>Type</th>" +
                                        "<th>#</th>" +
                                    "</thead>" +
                                    "<tbody>" +
                                        "<tr>" +
                                            "<th class='crime-tab-arr'>Arrest</th>" +
                                            "<td class='crime-tab-arr-cnt'>" + dataUI.arrCount + "</td>" +
                                            "<th class='crime-tab-ars'>Arson</th>" +
                                            "<td class='crime-tab-ars-cnt'>" + dataUI.arsCount + "</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<th class='crime-tab-ast'>Assault</th>" +
                                            "<td class='crime-tab-ast-cnt'>" + dataUI.assCount + "</td>" +
                                            "<th class='crime-tab-bur'>Burglary</th>" +
                                            "<td class='crime-tab-bur-cnt'>" + dataUI.burCount + "</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<th class='crime-tab-rob'>Robbery</th>" +
                                            "<td class='crime-tab-rob-cnt'>" + dataUI.robCount + "</td>" +
                                            "<th class='crime-tab-shot'>Shooting</th>" +
                                            "<td class='crime-tab-shot-cnt'>" + dataUI.shoCount + "</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<th class='crime-tab-thft'>Theft</th>" +
                                            "<td class='crime-tab-thft-cnt'>" + dataUI.theCount + "</td>" +
                                            "<th class='crime-tab-van'>Vandalism</th>" +
                                            "<td class='crime-tab-van-cnt'>" + dataUI.vanCount + "</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<th class='crime-tab-thft'>Other</th>" +
                                            "<td class='crime-tab-thft-cnt'>" + dataUI.othCount + "</td>" +
                                            "<th class='crime-tab-van'></th>" +
                                            "<td class='crime-tab-van-cnt'></td>" +
                                        "</tr>" +
                                    "</tbody>" +
                                "</table>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>"

    $('#user-crime-sec').append(elem);
    $('#user-crime-sec').append("<HR>")
    $('#user-crime-sec').show();
}*/

/*function processRestData(data,mapHome) {
    let coordArr = data.businesses.map(function (item) {
        return {
            coords : item.coordinates,
            name:item.name,
            address:item.location.display_address.join(", "),
            url:item.url
        };
    })

    let dataArr = data.businesses.map(function (item) {
        return {
            categories:item.categories.map(function (elem) {
                return elem.title;
            }).join(","),
            address:item.location.display_address.join(", "),
            name:item.name,
            image_url:item.image_url,
            url:item.url,
            phone:item.phone,
            rating:item.rating,
            review_count:item.review_count
        };
    })

    renderRestData(dataArr)
    mapHome = addMarkersToMap(coordArr,mapHome,"rest")
}*/

/*function processVacData(data,mapHome) {
    //console.log(data.entries)
    let coordArr = data.entries.map(function (item) {
        return {
            coords: {
                latitude: item.location.lat,
                longitude: item.location.lng
            },
            name: item.headline,
            url:item.listingUrl
        };
    })
    //console.log(coordArr)

    let dataArr = data.entries.map(function (item) {
        return {
            headline: item.headline,
            reviewAverage: item.reviewAverage,
            reviewCount:item.reviewCount,
            price: item.priceQuote !== undefined ? item.priceQuote.averageNightly : "",
            priceCurr: item.priceQuote !== undefined ? item.priceQuote.currencyUnits : "Not Available",
            image_url:item.thumbnail.secureUri,
            url:item.listingUrl
        };
    })

    renderVacData(dataArr)
    mapHome = addMarkersToMap(coordArr,mapHome,"vac")
}*/

/*function processCrimeData(data,mapHome) {
    //console.log(data)
    let coordArr = data.map(function (item) {
        return {
            coords: {
                latitude: item.lat,
                longitude: item.lon
            },
            name:item.type,
            address:item.address
        };
    })

    let arrCount=0,arsCount=0,assCount=0,burCount=0,othCount=0,robCount=0,shoCount=0,theCount=0,vanCount=0;
    let crimeStat = {};
    for(let i=0;i<data.length;i++)
    {
        if(data[i].type==="Arrest")
            arrCount++;
        else if(data[i].type==="Arson")
            arsCount++;
        else if(data[i].type==="Assault")
            assCount++;
        else if(data[i].type==="Burglary")
            burCount++;
        else if(data[i].type==="Other")
            othCount++;
        else if(data[i].type==="Robbery")
            robCount++;
        else if(data[i].type==="Shooting")
            shoCount++;
        else if(data[i].type==="Theft")
            theCount++;
        else if(data[i].type==="Vandalism")
            vanCount++;
    }
    crimeStat.totCount=arrCount+arsCount+assCount+burCount+othCount+robCount+shoCount+theCount+vanCount;
    crimeStat.arrCount=arrCount;
    crimeStat.arsCount=arsCount;
    crimeStat.assCount=assCount;
    crimeStat.burCount=burCount;
    crimeStat.othCount=othCount;
    crimeStat.robCount=robCount;
    crimeStat.shoCount=shoCount;
    crimeStat.theCount=theCount;
    crimeStat.vanCount=vanCount;

    renderCrimeData(crimeStat)
    mapHome = addMarkersToMap(coordArr,mapHome,"crime")

}*/

/*function loadRestaurants(longitude, latitude,mapHome) {
    console.log("loading restaurants")

    //we already have lon and lat
    //read sort_by dropdown
    let sort_by = $("#filter-rest-sort-by-option").val()
    console.log(sort_by)
    //read open_now or open_at
    let open_at_time;
    let open_now;
    if($("#filter-rest-sort-by-open-at").is(':checked'))
    {
        //read value from open at date time
        open_at_time = rest_open_at_unix
        console.log(open_at_time)
    }
    else if(($("#filter-rest-sort-by-open-now").is(':checked')))
    {
        open_now = true;
        console.log(open_now)
    }

    $.getJSON(restSearchRequestURL,
    {
        latitude:latitude,
        longitude:longitude,
        sort_by:sort_by.length!==0?sort_by:"best_match",
        open_at:open_at_time!==undefined?open_at_time:undefined,
        open_now:open_now!==undefined?open_now:true,
        radius:3220 //meters
    },
    function(apiData){
        //console.log(apiData)
        restCoord = processRestData(apiData,mapHome)
        //console.log(restCoord)
    });
}*/
/*function loadRentals(longitude, latitude,mapHome) {
    console.log("loading rentals")

    //we already have lon lat

    //read sort_by dropdown
    let sort_by = $("#filter-vac-sort-by-option").val()
    console.log(sort_by)

    //read date range
    //TBD set default range;
    let startDate = vac_start_date;
    let endDate = vac_end_date;

    //price range
    //filter-vac-price-range



    $.getJSON(vacSearchRequestURL,
        {
            centerPointLatitude:latitude,
            centerPointLongitude:longitude,
            sort:sort_by.length!==0?sort_by:"averageRating:desc",
            startDate: vac_start_date!==undefined?vac_start_date:undefined,
            endDate: vac_end_date!==undefined?vac_end_date:undefined,
            minPrice: vac_min_price!==undefined?vac_min_price:0,
            maxPrice: vac_max_price!==undefined?vac_max_price:1000,
            distanceInKm:16.1 //kilometers
        },
        function(apiData){
            vacCoord = processVacData(apiData,mapHome)
            //console.log(vacCoord)
        });
}*/

/*function loadCrimes(longitude, latitude,mapHome) {
    console.log("loading crimes")

    //we already have lon lat
    //distance range


    $.getJSON(crimeSearchRequestURL,
        {
            latitude:latitude,
            longitude:longitude,
            radius:crime_dist!==undefined?crime_dist:100
        },
        function(apiData){
            crimeCoord = processCrimeData(apiData,mapHome)
            //console.log(crimeCoord)
        });
}*/


/*function initLocationMap(lon,lat,loadRest=true,loadVac=true,loadCrime=true){

    console.log("initLocationMap")
    console.log(loadRest)
    console.log(loadVac)
    console.log(loadCrime)
    console.log(lon)
    console.log(lat)

    //console.log("initCurrLocationMap")

    //load top 10 restaurants in 1 mile radius
    //we will use 3 of them to display on home page
//    mapHome = null;
    mapUser = undefined;
    mapUser = initFirstMap($('#user-map-section'),lon,lat,mapUser)
    console.log(mapUser)
    //
    if(loadRest==="true") {
        console.log("loading rest ...")
        restCoord = loadRestaurants(lon, lat, mapUser);
    }
    if(loadVac==="true") {
        console.log("loading vac ...")
        vacCoord = loadRentals(lon, lat, mapUser);
    }
    if(loadCrime==="true") {
        console.log("loading crime ...")
        crimeCoord = loadCrimes(lon, lat, mapUser);
    }

    $('#user-map-section').show();
}*/


/*
    Search button presed
    1. update the localstorage for location data we got when we loaded the address data
    2. get the cbs
    3. hide the sections to be loaded again
    4. load the data
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

    //re-hide everything to refresh the data
    $('#user-rest-sec').hide()
    $('#user-rest-sec').empty()
    $('#user-vac-sec').hide()
    $('#user-vac-sec').empty()
    $('#user-crime-sec').hide();
    $('#user-crime-sec').empty();
    $('#user-map-section').hide();

    initUserMap(lon,lat,
        localStorage.getItem("cb-rest")!==null?localStorage.getItem("cb-rest"):true,
        localStorage.getItem("cb-vac")!==null?localStorage.getItem("cb-vac"):true,
        localStorage.getItem("cb-crime")!==null?localStorage.getItem("cb-crime"):true);

})

/*
    Data load function
    1. read the lon/lat from localstorage
    2. read the cbs from localstorage -- default is true if undefined
    3. read other data from localstorage especially curr_addr
 */
function refresh() {
    let lon = localStorage.getItem("longitude")!==undefined?localStorage.getItem("longitude"):-122.392;
    let lat = localStorage.getItem("latitude")!==undefined?localStorage.getItem("latitude"):37.6148;

    //read cbs
    if(localStorage.getItem("cb-rest")!==null)
    {
        if(localStorage.getItem("cb-rest") === "true")
            document.getElementById("cb-rest").checked = true;
        else  if(localStorage.getItem("cb-rest") === "false")
            document.getElementById("cb-rest").checked = false;
    }
    else
        document.getElementById("cb-rest").checked = true;

    if(localStorage.getItem("cb-vac")!==null)
    {
        if(localStorage.getItem("cb-vac") === "true")
            document.getElementById("cb-vac").checked = true;
        else  if(localStorage.getItem("cb-vac") === "false")
            document.getElementById("cb-vac").checked = false;
    }
    else
        document.getElementById("cb-vac").checked = true;

    if(localStorage.getItem("cb-crime")!==null)
    {
        if(localStorage.getItem("cb-crime") === "true")
            document.getElementById("cb-crime").checked = true;
        else  if(localStorage.getItem("cb-crime") === "false")
            document.getElementById("cb-crime").checked = false;
    }
    else
        document.getElementById("cb-crime").checked = true;

    //hide everything for load
    $('#user-rest-sec').hide()
    $('#user-vac-sec').hide()
    $('#user-crime-sec').hide();
    $('#user-map-section').hide();


    //load data
    initUserMap(lon,lat,
        localStorage.getItem("cb-rest")!==null?localStorage.getItem("cb-rest"):true,
        localStorage.getItem("cb-vac")!==null?localStorage.getItem("cb-vac"):true,
        localStorage.getItem("cb-crime")!==null?localStorage.getItem("cb-crime"):true)
}


$(document).ready(function() {

    //read location
    refresh()
});

$("#ln-edit-details").click(function (e) {
    e.preventDefault()
    console.log("editing details")
    window.location.href = '/edit.html'

})

$("#ln-log-out").click(function (e) {
    e.preventDefault()
    localStorage.clear();
    window.location.href = '/index.html'
    console.log("logging out")

})


$("#main-search-btn").click(function (e) {
    e.preventDefault()


})

$("#filter-rest-sort-by-option").click(function (e) {
    e.preventDefault()
    console.log($('#filter-rest-sort-by-option').val())
})

$("#rest_open_now").click(function (e) {
    //e.preventDefault()
    console.log($('#filter-rest-sort-by-open-now').val())
})
$("#filter-rest-sort-by-open-at").click(function (e) {
    //e.preventDefault()
    console.log($('#filter-rest-sort-by-open-at').val())
})
$("#filter-rest-sort-by-open-at-date-time").on("dp.change",function (e) {
//    e.preventDefault()
    let str = e.date._d;
    //Sun Jun 18 2017 17:38:00 GMT-0500
    rest_open_at_unix = moment(str,"ddd MMM DD YYYY HH:MM zZ").unix()
    // console.log(x)
})
$("#filter-vac-sort-by-option").click(function (e) {
    e.preventDefault()
    console.log($('#filter-vac-sort-by-option').val())
})

$("#filter-vac-date-range").on("apply.daterangepicker",function (e, picker) {
//    e.preventDefault()
    //yyyy-MM-dd

    console.log(picker.startDate.format('YYYY-MM-DD'));
    console.log(picker.endDate.format('YYYY-MM-DD'));
    vac_start_date = picker.startDate.format('YYYY-MM-DD');
    vac_end_date = picker.endDate.format('YYYY-MM-DD');

})

$("#filter-vac-dist-range").on("change",function (e) {
//    e.preventDefault()
    //yyyy-MM-dd
    console.log("slider")
    console.log(e)
    console.log(e.value.newValue)
    crime_dist = e.value.newValue;

})

$("#filter-vac-price-range").on("change",function (e) {
//    e.preventDefault()
    //yyyy-MM-dd
    console.log("slider")
    console.log(e)
    console.log(e.value.newValue[0])
    vac_min_price = e.value.newValue[0];
    console.log(e.value.newValue[1])
    vac_max_price = e.value.newValue[1];
})

$('#filter-rest-sort-by-open-at-date-time').datetimepicker({
        defaultDate: moment()
    }
);

var start = moment().subtract(7, 'days');

$('#filter-vac-date-range').daterangepicker({
    startDate: start
});
$('#filter-vac-dist-range').slider({
    formatter: function(value) {
        return 'Current value: ' + value;
    }
});
$("#filter-vac-price-range").slider({});