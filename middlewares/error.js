const mongoose = require('mongoose');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status').default || require('http-status');

const errorConverter = (err, req, res, next) => {
	let error = err;
	if (!(error instanceof ApiError)) {
		const statusCode =
			error.statusCode || error instanceof mongoose.Error
				? httpStatus.BAD_REQUEST
				: httpStatus.INTERNAL_SERVER_ERROR;
		const message = error.message || httpStatus[statusCode];
		error = new ApiError(statusCode, message, false, error.stack);
	}
	next(error);
};

const errorHandler = (err, req, res, next) => {
	let statusCode = err.statusCode || 500; // Fallback la 500 dacă statusCode e undefined
	let message = err.message || 'Internal Server Error';

	if (config.env === 'production' && !err.isOperational) {
		statusCode = 500;
		message = 'Internal Server Error';
	}

	const response = {
		error: true,
		code: statusCode,
		message,
		...(config.env === 'development' && { stack: err.stack }),
	};

	res.locals.errorMessage = message;
	console.error(err); // Log pentru debugging

	res.status(statusCode).json(response);
};

module.exports = {
	errorHandler,
	errorConverter,
};
