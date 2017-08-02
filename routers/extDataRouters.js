const {BasicStrategy} = require('passport-http');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const queryParser = bodyParser.urlencoded({ extended: true });


const request = require('request-promise')
const sc = require('spotcrime')

router.get('/yelp', (req, res) => {
    // console.log(req.query.longitude)
    // console.log(req.query.latitude)
    // console.log(req.query.sort_by)
    // console.log(req.query.radius)
    let options;
    //console.log(req.query)
    if(req.query.open_at !== undefined)
    {
        options = {
            method: 'GET',
            uri: 'https://api.yelp.com/v3/businesses/search',
            headers: {
                'Authorization': 'Bearer 4QDa80N99tkaRacWfeR8zwuhiVOY3MdF3qlLb37YWSe6ZueWoeFIhoGZo7sdADMy-_0mZ6b0VxgZbkXLkJiO7L9waQhj_7Jo4trJUBCLkk6tv8xtRGRfL890GRwiWXYx'
            },
            qs: {
                latitude: req.query.latitude !== undefined ? req.query.latitude : 40.8445867,
                longitude: req.query.longitude !== undefined ? req.query.longitude : -73.9452655,
                sort_by: req.query.sort_by !== undefined ? req.query.sort_by : "best_match",
                radius: req.query.radius !== undefined ? req.query.radius : "3220‬",
                open_at: req.query.open_at,// !== undefined ? req.query.open_now : true,
                categories: "restaurants,food"
                //open_at: (req.query.open_now)&&(req.query.open_at!== undefined)===req.query.open_at ?
            },
            json: true
        }
    }
    else
    {
        options = {
            method: 'GET',
            uri: 'https://api.yelp.com/v3/businesses/search',
            headers: {
                'Authorization': 'Bearer 4QDa80N99tkaRacWfeR8zwuhiVOY3MdF3qlLb37YWSe6ZueWoeFIhoGZo7sdADMy-_0mZ6b0VxgZbkXLkJiO7L9waQhj_7Jo4trJUBCLkk6tv8xtRGRfL890GRwiWXYx'
            },
            qs: {
                latitude: req.query.latitude !== undefined ? req.query.latitude : 40.8445867,
                longitude: req.query.longitude !== undefined ? req.query.longitude : -73.9452655,
                sort_by: req.query.sort_by !== undefined ? req.query.sort_by : "best_match",
                radius: req.query.radius !== undefined ? req.query.radius : "3220‬",
                open_now: req.query.open_now !== undefined ? req.query.open_now : true,
                categories: "restaurants,food"
                //open_at: (req.query.open_now)&&(req.query.open_at!== undefined)===req.query.open_at ?
            },
            json: true
        }
    }

    request(options)
        .then(response => {
            res.json(response)
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error"})
        })
});

router.get('/vr', (req, res) => {
    // console.log(req.query.centerPointLatitude)
    // console.log(req.query.centerPointLongitude)
    // console.log(req.query.distanceInKm)
    // console.log(req.query.sort)
    const options = {
        method: 'GET',
        uri: 'https://ws.homeaway.com/public/search',
        headers: {
            'Authorization': 'Bearer YTE5MWFhMmUtMzc5Mi00ZTNkLTlkMTYtOWVjNmExMjgwOTcw'
        },
        qs: {
            centerPointLatitude: req.query.centerPointLatitude !== undefined ? req.query.centerPointLatitude : 40.8445867,
            centerPointLongitude: req.query.centerPointLongitude!== undefined ? req.query.centerPointLongitude : -73.9452655,
            distanceInKm:req.query.distanceInKm!== undefined ? req.query.distanceInKm :16.1,
            sort:req.query.sort!== undefined ? req.query.sort : "averageRating:desc",
            availabilityStart:req.query.startDate!== undefined ? req.query.startDate :undefined,
            availabilityEnd:req.query.endDate!== undefined ? req.query.endDate :undefined,
            minNightlyPrice:req.query.minPrice!==undefined?req.query.minPrice:0,
            maxNightlyPrice:req.query.maxPrice!==undefined?req.query.maxPrice:1000,
            imageSize:"LARGE"
        },
        json: true

    }
    request(options)
        .then(response => {
            res.json(response)
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error"})
        })
});

router.get('/crime', (req, res) => {
    // console.log(req.query.longitude)
    // console.log(req.query.latitude)
    // console.log(req.query.radius)
    const loc = {
        lat: req.query.lat !== undefined ? req.query.latitude : 40.8445867,
        lon: req.query.lon !== undefined ? req.query.longitude : -73.9452655
        // lat: req.query.latitude !== undefined ? req.query.latitude : 40.8445867,
        // lon: req.query.longitude !== undefined ? req.query.longitude : -73.9452655,
    };
    const radius = req.query.radius !== undefined ? req.query.radius : 1;

    sc.getCrimes(loc, radius, function(err, crimes){
        if(err)
            res.status(500).json({message: "Internal server error"})
        else {
            res.json(crimes)
        }
    });
});



module.exports = router;