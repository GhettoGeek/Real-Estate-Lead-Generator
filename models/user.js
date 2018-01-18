const mongoose = require('mongoose');
const Schema = mongoose.schema;

const userSchema = new mongoose.Schema({
	username: String,
	password: String
})

module.exports = mongoose.model('User', userSchema);