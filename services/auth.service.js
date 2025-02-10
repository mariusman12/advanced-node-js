const { tokenService } = require('../services');
const userService = require('../services/user.service');
const httpStatus = require('http-status').default || require('http-status');
const { tokenTypes } = require('../config/tokens');
const ApiError = require('../utils/ApiError');
const login = async (email, password) => {
	const user = await userService.getUserByEmail(email);
	if (!user || !(await user.isPasswordMatch(password))) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
	}
	return user;
};

const refreshAuthToken = async refreshToken => {
	try {
		const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
		const user = await userService.getUserById(refreshTokenDoc.user);
		if (!user) {
			throw new Error();
		}
		await refreshTokenDoc.remove();
		return tokenService.generateAuthTokens(user.id);
	} catch (error) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
	}
};

module.exports = {
	login,
	refreshAuthToken,
};
