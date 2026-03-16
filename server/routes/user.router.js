const express = require ("express")
const { register, login, updateName, updatePassword, updatePic } = require("../controllers/user.controller")
const userAuthentication = require("../middleware/auth.user")
const upload = require("../middleware/uploads")
const userRouter = express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)

userRouter.put("/updateName",userAuthentication,updateName)
userRouter.put("/updatePassword",userAuthentication,updatePassword)
userRouter.put("/updatePic",userAuthentication,upload.single("profile"),updatePic)

userRouter.get("/me",userAuthentication,(req,res)=>{
    res.json(req.user)
})

module.exports = userRouter