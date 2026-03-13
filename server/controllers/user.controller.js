const User = require("../models/user.model")

const register = async(req,res) =>{
    try {
        const{name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message: "User already registered"})
        }

        const newUser = await User.create({name, email, password})

        res.status(201).json({
            status: 1,
            message: `User registered successfully`,
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: `server error ${error}`
        })
        
    }

}

const login = async(req,res) =>{
    try {
        const{email, password} = req.body
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const existUser = await User.findOne({email})

        if(!existUser){
            return res.status(400).json({message: "User not registered"})
        }
        if(existUser.password !== password){
            return res.send("email or password is incorrect")
        }
         res.status(200).json({
            status: 1,
            message: `User loggedIn successfully`
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: `server error ${error}`
        })
        
    }
    
}

const logout = async(req,res) =>{
    try {
        
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: `server error ${error}`
        })
        
    }
    
}

const updateName = async(req,res) =>{
    try {
        const {id} = req.params
        const{name} = req.body

        const user = await User.findById(id)
        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }
        if(user.name === name){
            return res.send("New name should be different from old")
        }

        user.name = name
        await user.save()
            
        res.status(200).json({
            status: 1,
            message: "Name updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: `server error ${error}`
        })
        
    }
    
}

const updatePassword = async(req,res) =>{
    try {
        const {id} = req.params
        const {oldPassword, newPassword} = req.body //comes from frontend

        const user = await User.findById(id)
        if(!oldPassword || !newPassword){
            return res.send("All fields are required")
        }
        if(oldPassword !== user.password){
            return res.send("current password is wrong")
        }
        user.password = newPassword
        await user.save()

        res.status(200).json({
            status: 1,
            message: "Password updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: `server error ${error}`
        })
        
    }
    
}

const updatePic = async(req,res) =>{
    try {
        
        res.status(200).json({
            status: 1,
            message: "pic updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: `server error ${error}`
        })
        
    }
    
}

const getUser = async(req,res) =>{
    try {
        
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: `server error ${error}`
        })
        
    }
    
}

module.exports = {
    register,
    login,
    logout,
    updateName,
    updatePassword,
    updatePic,
    getUser
}