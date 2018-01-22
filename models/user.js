const mongoose = require('mongoose');
const Schema = mongoose.schema;

const userSchema = new mongoose.Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	fullname: {type: String, required: true},
	requestedProperties: [],
})

module.exports = mongoose.model('User', userSchema);