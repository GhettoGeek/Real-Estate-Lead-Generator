const mongoose = require('mongoose');
const Schema = mongoose.schema;
const Homes = require('./homes.js');

const userSchema = new mongoose.Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	fullname: {type: String, required: true},
	requestedProperties: [Homes.schema]
})

module.exports = mongoose.model('User', userSchema);