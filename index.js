const express = require('express');
const app = express();
const config = require('./config/config');
const { connectToDatabase } = require("./connection/database");
const blogRouter = require('./routes/blog.route');
const { errorHandler , errorConverter} = require('./middlewares/error');
const bodyParser = require("body-parser");
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');
const logger = require('./config/logger');

// Middleware global pentru parsing JSON
app.use(express.json());
app.use(bodyParser.json()); 

// Middleware de eroare (îl adăugăm chiar dacă baza de date nu este conectată)


async function startServer() {
    try {
        await connectToDatabase();
        logger.info("✅ MongoDB conectat. Pornesc serverul...");

        // Adaugă rutele doar dacă baza de date este conectată
        app.use(blogRouter);
        app.use((req, res, next) => {
            next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
          });
          app.use(errorConverter);
          app.use(errorHandler);

   
        // Pornește serverul doar după ce conexiunea este stabilită
        app.listen(config.port, () => {
            logger.info(`✅ Serverul rulează la http://localhost:${config.port}`);
        });

    } catch (error) {
        logger.error("❌ Eroare la conectarea cu MongoDB:", error);
        process.exit(1); // Ieșim din proces dacă nu se poate conecta la DB
    }
}


const unExpectedErrorHandler = (error)=>{
    logger.info(error);
    exitHandler()
    }

const exitHandler = ()=>{
    if(server){
        server.close(()=>{
            logger.info("Server closed");
            process.exit(1);
        })
    }else{
        process.exit(1);
    }
}
process.on("uncaughtException",unExpectedErrorHandler)
process.on("unhandleRejection",unExpectedErrorHandler)
// Pornim serverul
startServer();
