const mongoose = require("mongoose")
MONGO_URI = process.env.MONGO_URI
const connectDb = async() =>{
   try {
    await mongoose.connect(`${MONGO_URI}`)
    console.log("database connected successfully")
   } catch (error) {
    console.log(`database connecting error ${error}`)
   }
}

module.exports = connectDb