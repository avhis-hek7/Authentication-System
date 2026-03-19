const mongoose = require('mongoose');

async function connectDb(){
    try {
        if(!process.env.MONGO_URI){
            throw new Error("Mongo URI is not defined in environmnent variables.");
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Db is connect to server");
    } catch (error) {
        console.log("Database Connecting Error",error);
        process.exit(1);
    }
}

module.exports = connectDb;