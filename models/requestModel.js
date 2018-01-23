const 	mongoose = require('mongoose'),
		Schema = mongoose.schema;


const requestSchema = new mongoose.Schema({
	propertyId: String,
	userId: String,
	agentId: String,
	created: Date,
	accepted: {type: Boolean, required: true},
	completed: {type: Boolean, required: true}
})

module.exports = mongoose.model('Request', requestSchema);