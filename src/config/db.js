const mongoose = require('mongoose');

async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Db is connect to server");
    } catch (error) {
        console.log("Database Connecting Error",error);
        process.exit(1);
    }
}

module.exports = connectDb;