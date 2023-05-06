const mongoose = require('mongoose');
const colors = require("colors");
const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to Mongo Database'.bgMagenta.white);
    } catch (error) {
        console.log('Mongo Connect Error'.bgRed.white);
    }
}
module.exports = connectDB;