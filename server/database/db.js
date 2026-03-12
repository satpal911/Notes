const mongoose = require("mongoose")

const connectDb = async() =>{
   try {
    await mongoose.connect("mongodb+srv://satpal61106_db_user:rustBnHt6u363zrO@cluster0.edy3wfx.mongodb.net/?appName=Cluster0")
    console.log("database connected successfully")
   } catch (error) {
    console.log(`database connecting error ${error}`)
   }
}

module.exports = connectDb