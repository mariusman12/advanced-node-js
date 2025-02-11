const joi = require("joi");


const envVarSchema = joi.object({
    DB_CONNECTION : joi.string().required(),
    PORT: joi.number().positive().default(3000),
    DB_NAME: joi.string().required()

}).unknown();



module.exports = envVarSchema;