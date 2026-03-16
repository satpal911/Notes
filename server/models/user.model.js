const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profile:{
        type: String,
        default: "https://res.cloudinary.com/prod/image/upload/ar_1:1,c_auto,g_auto,w_500/r_45/me/rc/animals-5.png"
    }
},{
    timestamps: true
})

module.exports = mongoose.model("User",userSchema)