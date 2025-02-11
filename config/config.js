require('dotenv').config();

const envVarSchema = require('../validations/env.validation');

const { value: envVars, error } = envVarSchema.validate(process.env);

if (error) {
	console.log(error);
}

module.exports = {
	port: envVars.PORT,
	dbConnection: envVars.DB_CONNECTION,
	dbName: envVars.DB_NAME,
	env: envVars.NODE_ENV,
	jwt: envVars.JWT_SECRET,
	accessExpirationMinutes: envVars.JWT_ACCES_EXPIRATION_MINUTES,
	refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
	rateLimiter: {
		maxAttemptsPerDay: envVars.MAX_ATTEMPTS_PER_DAY,
		maxAttemptsByIpUsername: envVars.MAX_ATTEMPTS_BY_IP_USERNAME,
		maxAttemptsPerEmail: envVars.MAX_ATTEMPTS_PER_EMAIL,
	},
};
