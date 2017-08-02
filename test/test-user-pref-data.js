const chai = require('chai');

const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const should = chai.should();

const {RegisterData,PreferenceData,AddressHistData} = require('../models/models');
const {TEST_DATABASE_URL} = require('../config');
const {app, runServer, closeServer} = require('../server');

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);
let existingUser;
let loginUser;
let loginPwd;
function seedPreferenceData() {
    //console.info('seeding preference data');
    const seedRegData = [];
    const seedPrefData = [];
    let rec = {};
    for (let i=1; i<=10; i++) {
        regData = generateRegisterData();
        //if(i===1)
            loginUser = regData.username;

        //console.log("Adding reg with user=" + regData.username);
        seedRegData.push(regData)

        prefData = generatePreferenceData();
        prefData.username = regData.username;
        //console.log("Adding pref with user=" + prefData.username);
        seedPrefData.push(prefData)
    }
    // this will return a promise
    RegisterData.insertMany(seedRegData)
    return PreferenceData.insertMany(seedPrefData);
}

function generatePreferenceData(forDefaults=false) {
    //console.log("inside register data generator")
    let currTime = new Date();
    let uName = faker.internet.email();

    if(forDefaults===true)
    {
        return {
            username: uName,
            created: currTime//faker.date.recent()
        }
    }
    else {
        return {
            username: uName,
            restPref: {
                restSearch: true,
                sortBy: "RATINGS"
            },
            crimePref: {
                crimeSearch: true,
                crimeSearchRadius: faker.random.number()
            },
            vacRentPref: {
                vacSearch: true,
                sortBy: "PRICE_L_TO_H"
            },
            created: currTime//faker.date.recent()
        }
    }
}

function generateRegisterData(noHash=false) {
    //console.log("inside register data generator")
    let currTime = new Date()//.getTime();
    let uName = faker.internet.email();
    let pwd = faker.internet.password();
    let hashPwd = bcrypt.hashSync(pwd, 10);
    //console.log("Adding with user=" + uName + " password=" + pwd + " hashed password=" + hashPwd);
    return {
        username: uName,
        password: noHash===false?hashPwd:pwd,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address:{
            address1: faker.address.streetAddress(),
            address2: "",
            city: faker.address.city(),
            state: faker.address.state(),
            zip:faker.address.zipCode(),
            country: faker.address.country(),
            longitude: faker.address.longitude(),
            latitude: faker.address.latitude(),
        },
        vehicle:{},
        created: currTime//faker.date.recent()
    }
}

function tearDownDb() {
    //console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('User Pref Data API resource', function() {

    before(function () {
        //console.log("before");
        return runServer(TEST_DATABASE_URL);
    });
    beforeEach(function() {
        //console.log("beforeeach");
        return seedPreferenceData();
    });
    afterEach(function() {
        //console.log("aftereach");
        return tearDownDb();
    });
    after(function () {
        //console.log("after");
        return closeServer();
    });

    describe('Preference data POST endpoint', function() {
        it('Add data with defaults', function () {
            let prefData = generatePreferenceData(true)
            prefData.username=loginUser;
            return chai.request(app)
                .post(`/user/prefData`)
                .send(prefData)
                .then(function (res) {
                    //console.log(res.body)
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys('id', 'username', 'created',"restPref","crimePref","vacRentPref");
                })
        });
        it('Add data without defaults', function () {
            let prefData = generatePreferenceData()
            prefData.username=loginUser;
            return chai.request(app)
                .post(`/user/prefData`)
                .send(prefData)
                .then(function (res) {
                    //console.log(res.body)
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys('id', 'username', 'created',"restPref","crimePref","vacRentPref");
                })
        });
        it('Add data for invalid user', function () {
            let prefData = generatePreferenceData()
            prefData.username=faker.internet.email();
            // console.log("Posting for --- " + prefData.username)
            // console.log("Posting--")
            // console.log(prefData.username)
            return chai.request(app)
                .post(`/user/prefData`)
                .send(prefData)
                .catch(err=>{
                    //console.log("err")
                    err.should.have.status(422)
                });
        });
    });
    describe('Preference data GET endpoint', function() {
        it('get existing user', function () {
            //console.log("for " + loginUser)
            return chai.request(app)
                .get(`/user/prefData/${loginUser}`)
                .then(function (res) {
                    //console.log(res.body)
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys('id', 'username', 'created',"restPref","crimePref","vacRentPref");
                })
        });
        it('get invalid user', function () {

            loginUser=faker.internet.email();
            return chai.request(app)
                .get(`/user/prefData/${loginUser}`)
                .catch(err=>{
                    //console.log("err")
                    err.should.have.status(422)
                });
        });
    });
    describe('Preference data PUT endpoint', function() {
        it('Update data for invalid user', function () {
            let prefData = generatePreferenceData()
            prefData.username=faker.internet.email();
            // console.log("Posting for --- " + prefData.username)
            // console.log("Posting--")
            // console.log(prefData.username)
            return chai.request(app)
                .put(`/user/prefData/${prefData.username}`)
                .send(prefData)
                .catch(err=>{
                    //console.log("err")
                    err.should.have.status(422)
                });
        });
        it('Update data without defaults', function () {
            let prefData = generatePreferenceData()
            prefData.username=loginUser;
            // console.log("prefdata ----- ")
            // console.log(prefData)
            return chai.request(app)
                .put(`/user/prefData/${prefData.username}`)
                .send(prefData)
                .then(function (res) {
                    //console.log(res.body)
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys('id', 'username', 'created',"restPref","crimePref","vacRentPref");
                })
                .then(()=>{
                    // console.log("second then")
                    // console.log("user=" + loginUser)
                    return chai.request(app)
                        .get(`/user/prefData/${loginUser}`)
                }).then(function (res) {
                    // console.log("res2====")
                    // console.log(res.body)
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys('id', 'username', 'created',"restPref","crimePref","vacRentPref");
                    res.body.username.should.equal(prefData.username);
                    res.body.restPref.restSearch.should.equal(prefData.restPref.restSearch);
                    res.body.restPref.sortBy.should.equal(prefData.restPref.sortBy);
                })
        });
    });
});