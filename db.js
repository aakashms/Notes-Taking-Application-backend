const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDb")
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDb;