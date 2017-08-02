const {BasicStrategy} = require('passport-http');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const queryParser = bodyParser.urlencoded({ extended: true });


const mongoose = require('mongoose');
const {RegisterData} = require('../models/models');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const localStrategy = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false
},(username, password, callback) => {
    let user;
    RegisterData
        .findOne({username: username})
        .exec()
        .then(_user => {
            user = _user;
            if (!user) {
                return callback(null, false, {message: 'Incorrect username'});
            }
            return user.validatePassword(password);
        })
        .then(isValid => {
            if (!isValid) {
                return callback(null, false, {message: 'Incorrect password'});
            }
            else {
                return callback(null, user.apiRepr())
            }
        });
});


passport.use(localStrategy);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});



router.use(passport.initialize());
router.use(passport.session());
router.use(queryParser);





router.post('/register', jsonParser, (req, res) => {
    const requiredFields = ['username', 'password', 'firstName', 'lastName', 'address'];

    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            //console.error(message);
            return res.status(400).send(message);
        }
    }

    let {username, password, firstName, lastName} = req.body;
    if (typeof username !== 'string') {
        return res.status(422).json({message: 'Incorrect field type: username'});
    }

    username = username.trim();

    if (username === '') {
        return res.status(422).json({message: 'Incorrect field length: username'});
    }

    if (!(password)) {
        return res.status(422).json({message: 'Missing field: password'});
    }

    if (typeof password !== 'string') {
        return res.status(422).json({message: 'Incorrect field type: password'});
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({message: 'Incorrect field length: password'});
    }

    //console.log(req.body)
    //set longitude/latitude using google API
    return RegisterData
        .find({username})
        .count()
        .exec()
        .then(count => {
            if (count > 0) {
                return Promise.reject({
                    name: 'AuthenticationError',
                    message: 'username already taken'
                });
            }
            // if no existing user, hash password
            return RegisterData.hashPassword(password)
        })
        .then(hash => {
            return RegisterData
                .create({
                    username: req.body.username,
                    password: hash,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    created: req.body.created || Date.now(),
                    address: {
                        address1: req.body.address.address1!==undefined?req.body.address.address1:"",
                        address2: req.body.address.address2!==undefined?req.body.address.address2:"",
                        city: req.body.address.city!==undefined?req.body.address.city:"",
                        state: req.body.address.state!==undefined?req.body.address.state:"",
                        zip: req.body.address.zip!==undefined?req.body.address.zip:"",
                        country: req.body.address.country!==undefined?req.body.address.country:"",
                        longitude: req.body.address.longitude!==undefined?req.body.address.longitude:"",
                        latitude: req.body.address.latitude!==undefined?req.body.address.latitude:""
                    },
                    vehicle: {
                        year: req.body.vehicle.year!==undefined?req.body.vehicle.year:"",
                        make: req.body.vehicle.make!==undefined?req.body.vehicle.make:"",
                        model: req.body.vehicle.model!==undefined?req.body.vehicle.model:"",
                        mpg: req.body.vehicle.mpg!==undefined?req.body.vehicle.mpg:""
                    }
                })
        })
        .then(
            registerData => {
                return res.status(200).json(registerData.apiRepr())
            })
        .catch(err => {
            //console.error(err);
            //console.log("in register 08")

            if (err.name === 'AuthenticationError') {
                return res.status(422).json({message: err.message});
            }
            res.status(500).json({message: 'Internal server error'});
        });
});

router.post('/login',jsonParser,(req, res) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            //console.log(err)
            return res.status(500).json({message: 'Unknown Error'})
        }
        if(!user) //false or auth error
        {
            return res.status(422).json({message: info.message});
        }
        else
        {
            return res.status(200).json({user: user});
        }
    })(req, res);
});


router.put('/reset/:uname', jsonParser, (req, res) => {
    if (!(req.params.uname && req.body.username && req.params.uname === req.body.username)) {
        //console.log("reset login 01")
        const message = (
            `Request path id (${req.params.uname}) and request body id ` +
            `(${req.body.uname}) must match`);
        //console.error(message);
        res.status(400).json({message: message});
    }
    let {username, password} = req.body;
    if (!(password)) {
        //console.log("reset login 02")
        return res.status(422).json({message: 'Missing field: password'});
    }

    if (typeof password !== 'string') {
        //console.log("reset login 03")
        return res.status(422).json({message: 'Incorrect field type: password'});
    }

    password = password.trim();

    if (password === '') {
        //console.log("reset login 04")
        return res.status(422).json({message: 'Incorrect field length: password'});
    }

    return RegisterData
        .find({username})
        .count()
        .exec()
        .then(count => {
            if (count == 0) {
                return Promise.reject({
                    name: 'InvalidUserError',
                    message: 'username not found'
                });
            }
            return RegisterData.hashPassword(password)
        })
        .then(hash => {
            console.log("reset login 07")
            return RegisterData
                .findOneAndUpdate({username: username}, {$set: {password: hash}})
                .exec()
        })
        .then(prefData => {
            //console.log("reset login 08")
            //console.log(prefData)
            return res.status(200).json(prefData.apiRepr())
        })
        .catch(err => {
            //console.log("err")
            //console.error(err);
            //console.log("in reset 08")

            if (err.name === 'InvalidUserError') {
                 return res.status(422).json({message: err.message});
            }
            res.status(500).json({message: 'Internal server error'});
        });
})

module.exports = router;