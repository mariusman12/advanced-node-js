const express = require('express');
const app = express();
const config = require('./config/config');
const { connectToDatabase } = require('./connection/database');
const blogRouter = require('./routes/blog.route');
const authRouter = require('./routes/auth.route');
const { errorHandler, errorConverter } = require('./middlewares/error');
const bodyParser = require('body-parser');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status').default || require('http-status');
const logger = require('./config/logger');
const morgan = require('./config/morgan');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const { xss } = require('express-xss-sanitizer');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const { env } = require('./config/config');
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
app.use(xss());
app.use(helmet.contentSecurityPolicy(config.cspOptions));
app.use(mongoSanitize());
app.use(cors());
app.options('*', cors());

if (env === 'production') {
	app.use(cors({ origin: 'url' }));
	app.options('*', cors({ origin: 'url' }));
}

let server;
async function startServer() {
	try {
		await connectToDatabase();
		logger.info('✅ MongoDB conectat. Pornesc serverul...');

		app.use(blogRouter);
		app.use(authRouter);
		app.use((req, res, next) => {
			next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
		});
		app.use(errorConverter);
		app.use(errorHandler);

		app.listen(config.port, () => {
			logger.info(`✅ Serverul rulează la http://localhost:${config.port}`);
		});
	} catch (error) {
		logger.error('❌ Eroare la conectarea cu MongoDB:', error);
		process.exit(1);
	}
}

const unExpectedErrorHandler = error => {
	logger.info(error);
	exitHandler();
};

const exitHandler = () => {
	if (server) {
		server.close(() => {
			logger.info('Server closed');
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};
process.on('uncaughtException', unExpectedErrorHandler);
process.on('unhandleRejection', unExpectedErrorHandler);

startServer();
