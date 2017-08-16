host = window.location.hostname;
let restSearchRequestURL = "/extdata/yelp";
let vacSearchRequestURL = "/extdata/vr";
let crimeSearchRequestURL = "/extdata/crime";
let mapData;

let coords = {
    restCoords : [],
    vacCoords : [],
    crimeCoords : []
};
/*
Render Restaurant Data
 */
function renderRestData(dataUI,forPage="") {
    if(forPage==="home-curr") {
        let elem = "<h2 class='rest-curr-head-text'>Trending Restaurants Near You</h2>"
        $('#home_rest_sec_curr').append(elem);
        for(let i =0;i<dataUI.length;i++)
        {
            if(i>2)
                break;
            else{
                let elem =
                    "<div class='col-md-4 '>" +
                    "<div class='rest-curr-item-img-sec'>" +
                    "<h4 class='rest-curr-item-name'>" + dataUI[i].name + "</h4>" +
                    "<img class='rest-curr-item-img' src='" + dataUI[i].image_url + "' width='200' height='150'/>" +
                    "</div>" +
                    "<div class='rest-curr-item-type-sec'>" +
                    "<small class='rest-curr-item-type-head'><b>Type: </b></small>" +
                    "<small class='rest-curr-item-type'>" + dataUI[i].categories + "</small>" +
                    "</div>" +
                    /*"<div>" +
                    "<small class='rest-curr-item-addr-head'><b>Address: </b></small>" +
                    "<small class='rest-curr-item-addr'>" + dataUI[i].address + "</small>" +
                    "</div>" +
                    "<div>" +
                    "<small class='rest-curr-item-ph-head'><b>Phone: </b></small>" +
                    "<small class='rest-curr-item-ph'>" + dataUI[i].phone + "</small>" +
                    "</div>" +*/
                    "<div class='rest-curr-item-prc-sec'>" +
                    "<small class='rest-curr-item-rate-head'><b>Ratings: </b></small>" +
                    "<small class='rest-curr-item-rate' >" + dataUI[i].rating + "</small>" +
                    "(" +
                    "<small class='rest-curr-item-rev'>" + dataUI[i].review_count + "Reviews</small>)" +
                    "</div>" +
                    "<p><a class='btn btn-default rest-curr-item-detail-btn' target='_blank' href='" + dataUI[i].url + "' role='button'>View details</a></p>" +
                    "</div>"
                //console.log(elem)
                $('#home_rest_sec_curr').append(elem)
            }
        }
        $('#home_rest_sec_curr').show();
        $('#home_sec_curr').show();
    }
    else if(forPage==="home-la") {
        let elem = "<h2 class='rest-curr-head-text'>Trending Restaurants in Los Angeles, CA</h2>"
        $('#home_rest_sec_la').append(elem);
        for(let i =0;i<dataUI.length;i++)
        {
            if(i>2)
                break;
            else{
                let elem =
                    "<div class='col-md-4 '>" +
                    "<div class='rest-curr-item-img-sec'>" +
                    "<h4 class='rest-curr-item-name'>" + dataUI[i].name + "</h4>" +
                    "<img class='rest-curr-item-img' src='" + dataUI[i].image_url + "' width='200' height='150'/>" +
                    "</div>" +
                    "<div class='rest-curr-item-type-sec'>" +
                    "<small class='rest-curr-item-type-head'><b>Type: </b></small>" +
                    "<small class='rest-curr-item-type'>" + dataUI[i].categories + "</small>" +
                    "</div>" +
/*                    "<div>" +
                    "<small class='rest-curr-item-addr-head'><b>Address: </b></small>" +
                    "<small class='rest-curr-item-addr'>" + dataUI[i].address + "</small>" +
                    "</div>" +
                    "<div>" +
                    "<small class='rest-curr-item-ph-head'><b>Phone: </b></small>" +
                    "<small class='rest-curr-item-ph'>" + dataUI[i].phone + "</small>" +
                    "</div>" +*/
                    "<div class='rest-curr-item-prc-sec'>" +
                    "<small class='rest-curr-item-rate-head'><b>Ratings: </b></small>" +
                    "<small class='rest-curr-item-rate' >" + dataUI[i].rating + "</small>" +
                    "(" +
                    "<small class='rest-curr-item-rev'>" + dataUI[i].review_count + "Reviews</small>)" +
                    "</div>" +
                    "<p><a class='btn btn-default rest-curr-item-detail-btn' target='_blank' href='" + dataUI[i].url + "' role='button'>View details</a></p>" +
                    "</div>"
                //console.log(elem)
                $('#home_rest_sec_la').append(elem)
            }
        }
        $('#home_rest_sec_la').show()
        $('#home_sec_la').show();

    }
    else if(forPage==="home-ny") {
        let elem = "<h2 class='rest-curr-head-text'>Trending Restaurants in New York City, NY</h2>"
        $('#home_rest_sec_ny').append(elem);
        for(let i =0;i<dataUI.length;i++)
        {
            if(i>2)
                break;
            else{
                let elem =
                    "<div class='col-md-4 '>" +
                    "<div class='rest-curr-item-img-sec'>" +
                    "<h4 class='rest-curr-item-name'>" + dataUI[i].name + "</h4>" +
                    "<img class='rest-curr-item-img' src='" + dataUI[i].image_url + "' width='200' height='150'/>" +
                    "</div>" +
                    "<div class='rest-curr-item-type-sec'>" +
                    "<small class='rest-curr-item-type-head'><b>Type: </b></small>" +
                    "<small class='rest-curr-item-type'>" + dataUI[i].categories + "</small>" +
                    "</div>" +
                    /*"<div>" +
                    "<small class='rest-curr-item-addr-head'><b>Address: </b></small>" +
                    "<small class='rest-curr-item-addr'>" + dataUI[i].address + "</small>" +
                    "</div>" +
                    "<div>" +
                    "<small class='rest-curr-item-ph-head'><b>Phone: </b></small>" +
                    "<small class='rest-curr-item-ph'>" + dataUI[i].phone + "</small>" +
                    "</div>" +*/
                    "<div class='rest-curr-item-prc-sec'>" +
                    "<small class='rest-curr-item-rate-head'><b>Ratings: </b></small>" +
                    "<small class='rest-curr-item-rate' >" + dataUI[i].rating + "</small>" +
                    "(" +
                    "<small class='rest-curr-item-rev'>" + dataUI[i].review_count + "Reviews</small>)" +
                    "</div>" +
                    "<p><a class='btn btn-default rest-curr-item-detail-btn' target='_blank' href='" + dataUI[i].url + "' role='button'>View details</a></p>" +
                    "</div>"
                //console.log(elem)
                $('#home_rest_sec_ny').append(elem)
            }
        }
        $('#home_rest_sec_ny').show()
        $('#home_sec_ny').show();

    }
    else if(forPage=="user"){
        //console.log("----"+ localStorage.getItem("curr_addr"))
        //console.log("----"+ localStorage.getItem("curr_addr"))
        let elem = "<h3 id='rest-head-text'>Restaurants</h3>" +
            "<strong><span class='at_address'> (Near:" + localStorage.getItem("curr_addr") + ")</span></strong>"
        $('#user-rest-sec').append(elem);
        for(let i =0;i<dataUI.length;i++){
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

    }
}
/*
Render Vacation Rental Data
 */
function renderVacData(dataUI,forPage="") {


    if(forPage === "home-curr") {
        let elem = "<h2 class='vac-curr-head-text'>Trending Vacation Rentals Near You</h2>"
        $('#home_vac_sec_curr').append(elem);
        for(let i =0;i<dataUI.length;i++) {
            if (i > 2)
                break;
            else {
                let elem =
                    "<div class='col-md-4'>" +
                    "<div class='vac-curr-item-img-sec'>" +
                    "<h4 class='vac-curr-item-head'>" + dataUI[i].headline + "</h4>" +
                    "<img class='vac-curr-item-img' src='" + dataUI[i].image_url + "' width='200' height='150'/>" +
                    "</div>" +
                    "<div class='vac-curr-item-prc-sec'>" +
                    "<small class='vac-curr-item-price-head'><b>Avg Nightly Price: </b></small>" +
                    "<small class='vac-curr-item-price'>" + dataUI[i].price + "</small>" +
                    "(<small class='vac-curr-item-price-curr'>" + dataUI[i].priceCurr + "</small>)" +
                    "</div>" +
                    "<div class='vac-curr-item-rev-sec'>" +
                    "<small class='vac-curr-item-rate-head'><b>Ratings: </b></small>" +
                    "<small class='vac-curr-item-rate''>" + dataUI[i].reviewAverage + "</small>" +
                    "(<small class='vac-curr-item-cnt'>" + dataUI[i].reviewCount + "</small>)" +
                    "</div>" +
                    "<p><a class='btn btn-default vac-curr-item-detail-btn' target='_blank' href='" + dataUI[i].url + "' role='button'>View details</a></p>" +
                    "</div>"
                //console.log(elem)
                $('#home_vac_sec_curr').append(elem)

            }
        }
        $('#home_vac_sec_curr').show()
        $('#home_sec_curr').show();

    }
    else if(forPage === "home-la") {
        let elem = "<h2 class='vac-curr-head-text'>Trending Vacation Rentals in Los Angeles, CA</h2>"
        $('#home_vac_sec_la').append(elem);
        for(let i =0;i<dataUI.length;i++) {
            if (i > 2)
                break;
            else {
                let elem =
                    "<div class='col-md-4'>" +
                    "<div class='vac-curr-item-img-sec'>" +
                    "<h4 class='vac-curr-item-head'>" + dataUI[i].headline + "</h4>" +
                    "<img class='vac-curr-item-img' src='" + dataUI[i].image_url + "' width='200' height='150'/>" +
                    "</div>" +
                    "<div class='vac-curr-item-prc-sec'>" +
                    "<small class='vac-curr-item-price-head'><b>Avg Nightly Price: </b></small>" +
                    "<small class='vac-curr-item-price'>" + dataUI[i].price + "</small>" +
                    "(<small class='vac-curr-item-price-curr'>" + dataUI[i].priceCurr + "</small>)" +
                    "</div>" +
                    "<div class='vac-curr-item-rev-sec'>" +
                    "<small class='vac-curr-item-rate-head'><b>Ratings: </b></small>" +
                    "<small class='vac-curr-item-rate''>" + dataUI[i].reviewAverage + "</small>" +
                    "(<small class='vac-curr-item-cnt'>" + dataUI[i].reviewCount + "</small>)" +
                    "</div>" +
                    "<p><a class='btn btn-default vac-curr-item-detail-btn' target='_blank' href='" + dataUI[i].url + "' role='button'>View details</a></p>" +
                    "</div>"
                //console.log(elem)
                $('#home_vac_sec_la').append(elem)

            }
        }
        $('#home_vac_sec_la').show()
        $('#home_sec_la').show();

    }
    else if(forPage === "home-ny") {
        let elem = "<h2 class='vac-curr-head-text'>Trending Vacation Rentals in New York City, NY</h2>"
        $('#home_vac_sec_ny').append(elem);
        for(let i =0;i<dataUI.length;i++) {
            if (i > 2)
                break;
            else {
                let elem =
                    "<div class='col-md-4'>" +
                    "<div class='vac-curr-item-img-sec'>" +
                    "<h4 class='vac-curr-item-head'>" + dataUI[i].headline + "</h4>" +
                    "<img class='vac-curr-item-img' src='" + dataUI[i].image_url + "' width='200' height='150'/>" +
                    "</div>" +
                    "<div class='vac-curr-item-prc-sec'>" +
                    "<small class='vac-curr-item-price-head'><b>Avg Nightly Price: </b></small>" +
                    "<small class='vac-curr-item-price'>" + dataUI[i].price + "</small>" +
                    "(<small class='vac-curr-item-price-curr'>" + dataUI[i].priceCurr + "</small>)" +
                    "</div>" +
                    "<div class='vac-curr-item-rev-sec'>" +
                    "<small class='vac-curr-item-rate-head'><b>Ratings: </b></small>" +
                    "<small class='vac-curr-item-rate''>" + dataUI[i].reviewAverage + "</small>" +
                    "(<small class='vac-curr-item-cnt'>" + dataUI[i].reviewCount + "</small>)" +
                    "</div>" +
                    "<p><a class='btn btn-default vac-curr-item-detail-btn' target='_blank' href='" + dataUI[i].url + "' role='button'>View details</a></p>" +
                    "</div>"
                //console.log(elem)
                $('#home_vac_sec_ny').append(elem)

            }
        }
        $('#home_vac_sec_ny').show()
        $('#home_sec_ny').show();

    }
    else if(forPage==="user")
    {
        //console.log("----"+ localStorage.getItem("curr_addr"))
        let elem = "<h3 id='rest-head-text'>Vacation Rentals</h3>" +
            "<strong><span class='at_address'> (Near:" + localStorage.getItem("curr_addr") + ")</span></strong>"
        $('#user-vac-sec').append(elem);

        for(let i =0;i<dataUI.length;i++) {
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
        $('#user-vac-sec').show()
    }
}

function renderCrimeData(dataUI,forPage="") {

    if(forPage==="home-curr") {
        let elem = "<h2 id='crime-curr-head-text'>Trending Vacation Rentals Near You</h2>"
        $('#home_crime_sec_curr').append(elem);
        elem = "<strong>(<span id='home_tot_count_val'>" + dataUI.totCount + "</span> in total reported)</strong>"
        $('#home_crime_sec_curr').append(elem);

        elem =
            "<div class='row'>" +
            "<div class='col-md-12'>" +
            "<table class='table'>" +
            "<thead>" +
            "<th>Type</th>" +
            "<th>#</th>" +
            "<th>Type</th>" +
            "<th>#</th>" +
            "</thead>" +
            "<tbody>" +
            "<tr>" +
            "<th>Arrest</th>" +
            "<td>" + dataUI.arrCount + "</td>" +
            "<th>Arson</th>" +
            "<td>" + dataUI.arsCount + "</td>" +
            "</tr>" +
            "<tr>" +
            "<th>Assault</th>" +
            "<td>" + dataUI.assCount + "</td>" +
            "<th>Burglary</th>" +
            "<td>" + dataUI.burCount + "</td>" +
            "</tr>" +
            "<tr>" +
            "<th>Other</th>" +
            "<td>" + dataUI.othCount + "</td>" +
            "<th>Robbery</th>" +
            "<td>" + dataUI.robCount + "</td>" +
            "</tr>" +
            "<tr>" +
            "<th>Shooting</th>" +
            "<td>" + dataUI.shoCount + "</td>" +
            "<th>Theft</th>" +
            "<td>" + dataUI.theCount + "</td>" +
            "</tr>" +
            "<tr>" +
            "<th>Vandalism</th>" +
            "<td>" + dataUI.vanCount + "</td>" +
            "<th></th>" +
            "<td></td>" +
            "</tr>" +
            "</tbody>" +
            "</table>" +
            "</div>" +
            "</div>"
        // $('#home_tot_count_val')[0].innerHTML = (dataUI.totCount);
        $('#home_crime_sec_curr').append(elem);
        $('#home_crime_sec_curr').show();
    }
    else if(forPage==="home-la") {
        let elem = "<h2 id='crime-curr-head-text'>Trending Vacation Rentals Near You</h2>"
        $('#home_crime_sec_la').append(elem);
        elem = "<strong>(<span id='home_tot_count_val'>" + dataUI.totCount + "</span> in total reported)</strong>"
        $('#home_crime_sec_la').append(elem);

        elem =
            "<div class='row'>" +
            "<div class='col-md-12'>" +
            "<table class='table'>" +
            "<thead>" +
            "<th>Type</th>" +
            "<th>#</th>" +
            "<th>Type</th>" +
            "<th>#</th>" +
            "</thead>" +
            "<tbody>" +
            "<tr>" +
            "<th>Arrest</th>" +
            "<td>" + dataUI.arrCount + "</td>" +
            "<th>Arson</th>" +
            "<td>" + dataUI.arsCount + "</td>" +
            "</tr>" +
            "<tr>" +
            "<th>Assault</th>" +
            "<td>" + dataUI.assCount + "</td>" +
            "<th>Burglary</th>" +
            "<td>" + dataUI.burCount + "</td>" +
            "</tr>" +
            "<tr>" +
            "<th>Other</th>" +
            "<td>" + dataUI.othCount + "</td>" +
            "<th>Robbery</th>" +
            "<td>" + dataUI.robCount + "</td>" +
            "</tr>" +
            "<tr>" +
            "<th>Shooting</th>" +
            "<td>" + dataUI.shoCount + "</td>" +
            "<th>Theft</th>" +
            "<td>" + dataUI.theCount + "</td>" +
            "</tr>" +
            "<tr>" +
            "<th>Vandalism</th>" +
            "<td>" + dataUI.vanCount + "</td>" +
            "<th></th>" +
            "<td></td>" +
            "</tr>" +
            "</tbody>" +
            "</table>" +
            "</div>" +
            "</div>"
        // $('#home_tot_count_val')[0].innerHTML = (dataUI.totCount);
        $('#home_crime_sec_la').append(elem);
        $('#home_crime_sec_la').show();
    }
    else if(forPage==="user") {
        console.log("----"+ localStorage.getItem("curr_addr"))
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
    }
}


/*
Process Restaurant Data
 */
function processRestData(data,mapData, forPage="") {
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

    renderRestData(dataArr,forPage)
    mapData = addMarkersToMap(coordArr,mapData,"rest")
}

/*
Process Vacation Rental Data
 */
function processVacData(data,mapData, forPage="") {
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

    renderVacData(dataArr,forPage)
    mapData = addMarkersToMap(coordArr,mapData,"vac")
}

/*
Process Crime Data
 */
function processCrimeData(data,mapData,forPage="") {
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

    renderCrimeData(crimeStat,forPage)
    mapData = addMarkersToMap(coordArr,mapData,"crime")

}

/*
* Load restaurant data
* */
function loadRestaurants(data,mapData,forPage="") {
    console.log("loading restaurants for "+ forPage)
    // console.log(data)
    $.ajax({
        type: "GET",
        url: restSearchRequestURL,
        data: data,
        success: function(data, textStatus, xhr) {
            console.log("load restaurants success for "+forPage)
            // console.log(xhr)
            processRestData(xhr.responseJSON,mapData,forPage)
        },
        error: function(xhr, textStatus) {
            console.log("load restaurants failure for "+forPage)
            //console.log(xhr)
        }
    });
}
/*
Load vacation rental data
 */
function loadRentals(data,mapData,forPage="") {
    console.log("loading rentals for "+forPage)
    // console.log(data)
    $.ajax({
        type: "GET",
        url: vacSearchRequestURL,
        data: data,
        success: function(data, textStatus, xhr) {
            console.log("load rentals success for "+forPage)
            // console.log(xhr)
            processVacData(xhr.responseJSON,mapData,forPage)
        },
        error: function(xhr, textStatus) {
            console.log("load rentals failure for "+forPage)
            //console.log(xhr)
        }
    });
}

/*
Load crime data
 */
function loadCrimes(data,mapData,forPage="") {
    console.log("loading crimes for " + forPage)
    // console.log(data)

    $.ajax({
        type: "GET",
        url: crimeSearchRequestURL,
        data: data,
        success: function(data, textStatus, xhr) {
            console.log("load crimes success for "+forPage)
            // console.log(xhr)
            processCrimeData(xhr.responseJSON,mapData,forPage)
        },
        error: function(xhr, textStatus) {
            console.log("load crimes failure for "+forPage)
            //console.log(xhr)
        }
    });
}


/*
    loading user specific data
 */
function initCustomMap(elem,lon,lat,data_rest,data_vac,data_crm,loadRest=true,loadVac=true,loadCrime=true,forPage=""){

    console.log("initUserMap")

    //reset mapUser for reloads
    mapData = undefined;

    if(forPage==="user") {
        mapData = initFirstMap(elem, lon, lat, mapData)
    }
    else if(forPage==="home"){
        mapData = initFirstMap(elem, lon, lat, mapData)

    }

    console.log(loadRest)
    console.log(loadVac)
    console.log(loadCrime)
    console.log(forPage)
    console.log(elem)

    let data;
    if(loadRest==="true") {
        console.log("loading rest ...")
        restCoord = loadRestaurants(data_rest,mapData,forPage);
    }
    if(loadVac==="true") {
        console.log("loading vac ...")
        vacCoord = loadRentals(data_vac,mapData,forPage);
    }
    if(loadCrime==="true") {
        console.log("loading crime ...")
        crimeCoord = loadCrimes(data,mapData,forPage);
    }

    elem.show();
}

