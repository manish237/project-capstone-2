const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var addressSchema = mongoose.Schema({
    address1: {type: String, required: true},
    address2: {type: String},
    city:{type: String, required: true},
    state:{type: String, required: true},
    zip:{type: String, required: true},
    country:{type: String, required: true},
    longitude: {type: Number, required: true},
    latitude: {type: Number, required: true}
});

var vehicleSchema = mongoose.Schema({
    year: {type: Number},
    make: {type: String},
    model:{type: String},
    mpg:{type: Number}
});

const registerDataSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    address: {type: addressSchema, required: true},
    vehicle: {type: vehicleSchema},
    created: {type: Date, required: true}
});

var resturantPrefSchema = mongoose.Schema({
    restSearch: {type: Boolean},
    sortBy: {
        type: String,
        enum: ['RATINGS', 'REVIEWS', 'DISTANCE']
    }
});
var crimePrefSchema = mongoose.Schema({
    crimeSearch: {type: Boolean},
    crimeSearchRadius: {type: Number}
});

var vacPrefSchema = mongoose.Schema({
     vacSearch: {type: Boolean},
     sortBy: {
        type: String,
        enum: ['PRICE_H_TO_L', 'PRICE_L_TO_H', 'RATINGS']
     }
});


const preferenceDataSchema = mongoose.Schema({
    username: {type: String, required: true},
    restPref: {type: resturantPrefSchema},
    crimePref: {type: crimePrefSchema},
    vacRentPref: {type: vacPrefSchema},
    created: {type: Date, required: true} 
});

const addressHistorySchema = mongoose.Schema({
    username: {type: String, required: true},
    address: {type: addressSchema, required: true}
});

function StorageException(message) {
    this.message = message;
    this.name = "StorageException";
}

registerDataSchema.virtual('nameString').get(function() {
    return `${this.firstName} ${this.lastName}`.trim()});

registerDataSchema.virtual('registerAddressString').get(function() {
    let addr2 = this.address.address2 === undefined ? '' : this.address.address2;
    return `${this.address.address1} ${addr2} ${this.address.city} ${this.address.state} ${this.address.zip} ${this.address.country}`.trim()});

registerDataSchema.virtual('vehicleString').get(function() {
    return `${this.vehicle.year} ${this.vehicle.make} ${this.vehicle.model} ${this.vehicle.mpg}`.trim()});


registerDataSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

registerDataSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

registerDataSchema.methods.apiRepr = function() {
    console.log("apiRepr")
    return {
        id: this._id,
        username: this.username,
        name_string: this.nameString,
        firstName: this.firstName,
        lastName: this.lastName,
        address_string: this.registerAddressString,
        address:{
            address1: this.address.address1,
            address2: this.address.address2,
            city:this.address.city,
            state:this.address.state,
            zip:this.address.zip,
            country:this.address.country,
            longitude: this.address.longitude,
            latitude: this.address.latitude
        },
        vehicle: this.vehicleString

    };
}

// preferenceDataSchema.virtual('hotelPrefString').get(function() {
//     return `From ${this.hotelPref.startDate} To ${this.hotelPref.endDate}`.trim()});


preferenceDataSchema.methods.apiRepr = function() {
    return {
        id: this._id,
        username: this.username,
        restPref: {
            restSearch : this.restPref.restSearch,
            sortBy: this.restPref.sortBy
        },
        crimePref: {
            crimeSearch: this.crimePref.crimeSearch,
            crimeSearchRadius : this.crimePref.crimeSearchRadius
        },
        vacRentPref: {
            vacSearch: this.vacRentPref.vacSearch,
            sortBy: this.vacRentPref.sortBy
        },
        created:this.created
    };
}



addressHistorySchema.virtual('historyAddressString').get(function() {
    return `${this.address.address1} ${this.address.address2} ${this.address.city} ${this.address.state} ${this.address.zip}`.trim()});

addressHistorySchema.methods.apiRepr = function () {
    console.log("adhist apirpr")
     return {
        id: this._id,
        username: this.username,
        address: this.historyAddressString,
        longitude: this.longitude,
        latitude:this.latitude
    };
}

const RegisterData = mongoose.model('RegisterData',registerDataSchema)
const PreferenceData = mongoose.model('PreferenceData',preferenceDataSchema)
const AddressHistData = mongoose.model('AddressHistData',addressHistorySchema)

module.exports = {RegisterData,PreferenceData,AddressHistData};
