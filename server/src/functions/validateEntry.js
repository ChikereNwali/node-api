const Joi = require('joi');

//Validation function
const validateEntries = function (entry){
	const schema = {

		title:Joi.string().min(3).required(),
		note:Joi.string().min(3).required()
	};
	return Joi.validate(entry, schema);
};

module.exports = validateEntries;
