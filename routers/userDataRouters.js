const {BasicStrategy} = require('passport-http');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const queryParser = bodyParser.urlencoded({ extended: true });


const mongoose = require('mongoose');
const {RegisterData,PreferenceData,AddressHistData} = require('../models/models');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.put('/data/:uname', jsonParser, (req, res) => {
    if (!(req.params.uname && req.body.username && req.params.uname === req.body.username)) {
        const message = (
        `Request path id (${req.params.uname}) and request body id ` +
        `(${req.body.uname}) must match`);
        //console.error(message);
        res.status(400).json({message: message});
    }

    const toUpdate = {};
    const updateableFields = ['firstName', 'lastName', 'address', 'vehicle'];

    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });

    return RegisterData
    // all key/value pairs in toUpdate will be updated -- that's what `$set` does
    .findOneAndUpdate({username: req.params.uname}, {$set: toUpdate}, {new: true})
    .exec()
    .then(prefData => {
        res.status(200).json({
            registerData: prefData.apiRepr()
        })
    })
    .catch(err => {
        //console.log(err)
        res.status(500).json({message: 'Internal server error'})
    });

});


//by username
router.get('/data/:uname', (req, res) => {
    //console.log("get data 01")
    RegisterData
    .find({username: req.params.uname})
    .exec()
    .then(registerData => {
        //console.log("get data 02==" + registerData.length)
        if(registerData.length===0){
        	   return Promise.reject({
                    name: 'InvalidUserError',
                    message: 'username not found'
                });
        }

        res.status(200).json({
            registerData: registerData.map(
                (regData) => regData.apiRepr())
        });
    })
    .catch(
        err => {
            //console.log("get data 03")
            //console.error(err);
            if (err.name === 'InvalidUserError') {
                 return res.status(422).json({message: err.message});
            }
            res.status(500).json({message: 'Internal server error'});
        });
});


router.post('/prefData', jsonParser, (req, res) => {
    //console.log("pref data post 01")
    const requiredFields = ['username'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            //console.error(message);
            return res.status(400).send(message);
        }
    }
    username = req.body.username;
    //console.log(req.body.vacRentPref)
    //set longitude/latitude using google API
     return RegisterData
        .find({username})
        .count()
        .exec()
        .then(count => {
            if (count === 0) {
                //console.log("pref data post 02")
                return Promise.reject({
                    name: 'InvalidUserError',
                    message: 'username not found'
                });
                //return res.status(422).json({message: 'username not found'});
            }
        })
        .then(()=>{
                //console.log("pref data post 03")
            return PreferenceData
                .find({username})
                .count()
                .exec()
        })
        .then((count)=>{
                //console.log("pref data post 04")
            if(count===0)
            {
               // console.log("pref data post 05")
                return PreferenceData
                    .create({
                        username: req.body.username,
                        restPref: {
                            restSearch: req.body.restPref.restSearch!==undefined?req.body.restPref.restSearch:true,
                            sortBy: req.body.restPref.sortBy!==undefined?req.body.restPref.sortBy:'RATINGS'
                        },
                        crimePref: {
                            crimeSearch: req.body.crimePref.crimeSearch!==undefined?req.body.crimePref.crimeSearch:true,
                            crimeSearchRadius: req.body.crimePref.crimeSearchRadius!==undefined?req.body.crimePref.crimeSearchRadius:10,
                        },
                        vacRentPref:{
                            vacSearch: req.body.vacRentPref.vacSearch!==undefined?req.body.vacRentPref.vacSearch:true,
                            sortBy: req.body.vacRentPref.sortBy!==undefined?req.body.vacRentPref.sortBy:'PRICE_L_TO_H'
                        },
                        created: req.body.created || Date.now()
                    })
            }
            else
            {
                   // console.log("pref data post 06")
                let toUpdate = {};
                const updateableFields = ['restPref', 'crimePref', 'hotelSearch', 'vacRentSearch'];

                updateableFields.forEach(field => {
                    if (field in req.body) {
                        toUpdate[field] = req.body[field];
                    }
                });
                return PreferenceData
                // all key/value pairs in toUpdate will be updated -- that's what `$set` does
                    .findOneAndUpdate({username: req.body.username}, {$set: toUpdate}, {new: true})
//                    .exec()
            }
        })
        .then((preferenceData) => {
                //console.log("pref data post 07")
            res.status(201).json(preferenceData.apiRepr());
        })
        .catch(err => {
                //console.log("pref data post 08")
            //console.error(err);
            if (err.name === 'InvalidUserError') {
                return res.status(422).json({message: err.message});
            }
            res.status(500).json({message: 'Internal server error'});
        });
});

router.put('/prefData/:uname', jsonParser, (req, res) => {
        //console.log("pref data put 01")
    if (!(req.params.uname && req.body.username && req.params.uname === req.body.username)) {
        const message = (
            `Request path id (${req.params.uname}) and request body id ` +
            `(${req.body.uname}) must match`);
        //console.error(message);
        res.status(400).json({message: message});
    }

    let username = req.body.username;
    return RegisterData
        .find({username})
        .count()
        .exec()
        .then(count => {
            //console.log("pref data put 02")
            if (count === 0) {
                        //console.log("pref data put 03")

                return Promise.reject({
                    name: 'InvalidUserError',
                    message: 'username not found'
                });
                //return res.status(422).json({message: 'username not found'});
            }
        })
        .then(()=>{
                    //console.log("pref data put 04")

            return PreferenceData
                .find({username})
                .count()
                .exec()
        })
        .then((count)=>{
                    //console.log("pref data put 05")

            if(count===0)
            {
                        //console.log("pref data put 06")

                return PreferenceData
                    .create({
                        username: req.body.username,
                        restPref: {
                            restSearch: req.body.restPref.restSearch!==undefined?req.body.restPref.restSearch:true,
                            sortBy: req.body.restPref.sortBy!==undefined?req.body.restPref.sortBy:'RATINGS'
                        },
                        crimePref: {
                            crimeSearch: req.body.crimePref.crimeSearch!==undefined?req.body.crimePref.crimeSearch:true,
                            crimeSearchRadius: req.body.crimePref.crimeSearchRadius!==undefined?req.body.crimePref.crimeSearchRadius:10,
                        },
                        vacRentPref:{
                            vacSearch: req.body.vacRentPref.vacSearch!==undefined?req.body.vacRentPref.vacSearch:true,
                            sortBy: req.body.vacRentPref.sortBy!==undefined?req.body.vacRentPref.sortBy:'PRICE_L_TO_H'
                        },
                        created: req.body.created || Date.now()
                    })
            }
            else
            {
                        //console.log("pref data put 07")

                let toUpdate = {};
                const updateableFields = ['restPref', 'crimePref', 'hotelSearch', 'vacRentSearch'];

                updateableFields.forEach(field => {
                    if (field in req.body) {
                        toUpdate[field] = req.body[field];
                    }
                });
                return PreferenceData
                // all key/value pairs in toUpdate will be updated -- that's what `$set` does
                    .findOneAndUpdate({username: req.body.username}, {$set: toUpdate}, {new: true})
//                    .exec()
            }
        })
        .then((preferenceData) => {
                    //console.log("pref data put 08")

            res.status(201).json(preferenceData.apiRepr());
        })
        .catch(err => {
                    //console.log("pref data put 09")

           // console.error("err");
            if (err.name === 'InvalidUserError') {
                return res.status(422).json({message: err.message});
            }
            res.status(500).json({message: 'Internal server error'});
        });
});


router.get('/prefData/:uname', (req, res) => {

	//console.log("get pref data 01")

    return RegisterData
        .find({username: req.params.uname})
        .count()
        .exec()
        .then(count => {
            //console.log("get pref data 02")
            if (count === 0) {
                return Promise.reject({
                    name: 'InvalidUserError',
                    message: 'username not found'
                });
            }
        })
        .then(()=>{
            //console.log("get pref data 03")
            return PreferenceData
                .find({username: req.params.uname})
                .exec()
        })
        .then((preferenceData) => {
            //console.log("get pref data 04")
            //console.log(preferenceData)
            res.status(201).json(preferenceData[0].apiRepr());
        })
        .catch(err => {
            //console.log("get pref data 05")
            //console.error(err);
            if (err.name === 'InvalidUserError') {
                return res.status(422).json({message: err.message});
            }
            res.status(500).json({message: 'Internal server error'});
        });
});


router.post('/addrHist', jsonParser, (req, res) => {
    console.log("add hist data 01")
    console.log(req.body)
    // console.log(req)

    const requiredFields = ['username'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            //console.error(message);
            return res.status(400).send(message);
        }
    }

    let username = req.body.username;

    return RegisterData
        .find({username})
        .count()
        .exec()
        .then(count => {
            console.log("add hist data 02")
            if (count === 0) {
                //console.log("add hist data 03")
                return Promise.reject({
                    name: 'InvalidUserError',
                    message: 'username not found'
                });
                //return res.status(422).json({message: 'username not found'});
            }
        })
        .then(()=> {
            //console.log("add hist data 04")
            return AddressHistData
                .create({
                    username: req.body.username,
                    address_min: {
                        address_string: req.body.address_min.address_string,
                        longitude: req.body.address_min.longitude,
                        latitude: req.body.address_min.latitude
                    }
                })
        })
        .then((addressHistData) => {
            //console.log("add hist data 05")
            res.status(201).json(addressHistData.apiRepr())
        })
        .catch(err => {
            //console.error("err");
            //console.log("add hist data 06")
            if (err.name === 'InvalidUserError') {
                return res.status(422).json({message: err.message});
            }
            res.status(500).json({message: 'Internal server error'});
        });
});


router.get('/addrHist/:uname',  (req, res) => {
    //console.log("get hist data 01")

    return RegisterData
        .find({username: req.params.uname})
        .count()
        .exec()
        .then(count => {
           //console.log("add hist data 02")
            if (count === 0) {
                return Promise.reject({
                    name: 'InvalidUserError',
                    message: 'username not found'
                });
            }
        })
        .then(()=> {
            //console.log("add hist data 03")
            return AddressHistData
                .find({username: req.params.uname})
                .exec()
        })
        .then(addressHistData => {
            //console.log("add hist data 04")
            //console.log(addressHistData)
            res.json({
                addressHistData: addressHistData.map(
                    (ahData) => ahData.apiRepr())
        });
    })
    .catch(
        err => {
           // console.log("add hist data 05")
            //console.error(err);
            if (err.name === 'InvalidUserError') {
                return res.status(422).json({message: err.message});
            }
            res.status(500).json({message: 'Internal server error'});
        });

});


router.delete('/addrHist/:uname/:id', (req, res) => {
    //console.log("delete with id 01")
    return RegisterData
        .find({username: req.params.uname})
        .count()
        .exec()
        .then(count => {
            //console.log("add hist data 02")
            //console.log("delete with id 02")

            if (count === 0) {
                //console.log("delete with id 03")

                return Promise.reject({
                    name: 'InvalidUserError',
                    message: 'username not found'
                });
            }
        })
        .then(()=> {
            //console.log("add hist data 03")
            //console.log("delete with id 04")

            return AddressHistData
                .findByIdAndRemove(req.params.id)
                .exec()
        })
        .then(() => {
            //console.log("add hist data 04")
            //console.log(addressHistData)
            //console.log("delete with id 05")

            res.status(204).end();
        })
        .catch(err => {
                // console.log("add hist data 05")
                //console.error(err);
            //console.log("delete with id 06")

            if (err.name === 'InvalidUserError') {
                    return res.status(422).json({message: err.message});
                }
                res.status(500).json({message: 'Internal server error'});
        });
});

router.delete('/addrHist/:uname', (req, res) => {
    //console.log("delete without id 01")

    return RegisterData
        .find({username: req.params.uname})
        .count()
        .exec()
        .then(count => {
            //console.log("add hist data 02")
            //console.log("delete without id 02")

            if (count === 0) {
                //console.log("delete without id 03")

                return Promise.reject({
                    name: 'InvalidUserError',
                    message: 'username not found'
                });
            }
        })
        .then(()=> {
            //console.log("add hist data 03")
            //console.log("delete without id 04")

            return AddressHistData
                .deleteMany({username:req.params.uname})
                .exec()
        })
        .then(() => {
            //console.log("add hist data 04")
            //console.log(addressHistData)
            //console.log("delete without id 05")

            res.status(204).end();
        })
        .catch(err => {
            // console.log("add hist data 05")
            //console.error(err);
            //console.log("delete without id 06")

            if (err.name === 'InvalidUserError') {
                return res.status(422).json({message: err.message});
            }
            res.status(500).json({message: 'Internal server error'});
        });
});

module.exports = router;