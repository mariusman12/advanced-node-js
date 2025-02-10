const mongoose = require("mongoose");
const config = require("../config/config");

async function connectToDatabase() {
    if (mongoose.connection.readyState === 1) {
        console.log("✅ MongoDB este deja conectat!");
        return;
    }

    try {
        await mongoose.connect(config.dbConnection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Conectat la MongoDB cu Mongoose!");
    } catch (error) {
        console.error("❌ Eroare la conectarea cu MongoDB:", error);
        process.exit(1);
    }
}

module.exports = { connectToDatabase };
