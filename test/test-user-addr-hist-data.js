const chai = require('chai');
const expect = require('chai').expect;
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
function seedAddrHistData() {
    //console.info('seeding addr hist data');
    const seedRegData = [];
    const seedAddrHistData = [];
    let rec = {};
    for (let i=1; i<=10; i++) {
        regData = generateRegisterData();
        //if(i===1)
            loginUser = regData.username;

        //console.log("Adding reg with user=" + regData.username);
        seedRegData.push(regData)

        addrData = generateAddrHistData();
        addrData.username = regData.username;
        //console.log("Adding pref with user=" + addrData.username);
        seedAddrHistData.push(addrData)
    }
    // this will return a promise
    RegisterData.insertMany(seedRegData)
    return AddressHistData.insertMany(seedAddrHistData);
}

function generateAddrHistData() {
    //console.log("inside register data generator")
    let currTime = new Date();
    let uName = faker.internet.email();

    return {
        username: uName,
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

describe('User Address Hist Data API resource', function() {

    before(function () {
        //console.log("before");
        return runServer(TEST_DATABASE_URL);
    });
    beforeEach(function() {
        //console.log("beforeeach");
        return seedAddrHistData();
    });
    afterEach(function() {
        //console.log("aftereach");
        return tearDownDb();
    });
    after(function () {
        //console.log("after");
        return closeServer();
    });

    describe('Address data POST endpoint', function() {

        it('Add data without defaults', function () {
            let addrData = generateAddrHistData()
            addrData.username=loginUser;
            return chai.request(app)
                .post(`/user/addrHist`)
                .send(addrData)
                .then(function (res) {
                    //console.log(res.body)
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    //res.body.should.include.keys('id', 'username', 'created',"restPref","crimePref","vacRentPref");
                })
        });
        it('Add data for invalid user', function () {
            let addrData = generateAddrHistData()
            addrData.username=faker.internet.email();
            // console.log("Posting for --- " + addrData.username)
            // console.log("Posting--")
            // console.log(addrData.username)
            return chai.request(app)
                .post(`/user/addrHist`)
                .send(addrData)
                .catch(err=>{
                    //console.log("err")
                    err.should.have.status(422)
                });
        });
    });
    describe('Address data GET endpoint', function() {
        it('get existing user', function () {
            //console.log("for " + loginUser)
            return chai.request(app)
                .get(`/user/addrHist/${loginUser}`)
                .then(function (res) {
                    //console.log(res.body)
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    //res.body.should.include.keys('id', 'username', 'created',"restPref","crimePref","vacRentPref");
                })
        });
        it('get invalid user', function () {

            loginUser=faker.internet.email();
            return chai.request(app)
                .get(`/user/addrHist/${loginUser}`)
                .catch(err=>{
                    //console.log("err")
                    err.should.have.status(422)
                });
        });
    });
});