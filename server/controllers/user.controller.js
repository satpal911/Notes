const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinary");
const fs = require ("fs")


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const emailLower = email.trim().toLowerCase();
    const userExist = await User.findOne({ email: emailLower });
    if (userExist) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email: emailLower,
      password: hashedPassword,
    });

    const userObj = newUser.toObject();
    delete userObj.password;

    res.status(201).json({
      status: 1,
      message: `User registered successfully`,
      data: userObj,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailLower = email.trim().toLowerCase();
    const existUser = await User.findOne({ email: emailLower });

    if (!existUser) {
      return res.status(400).json({ message: "User not registered" });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Email or password is wrong",
      });
    }

    const token = jwt.sign(
      { id: existUser._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction, // true ONLY in production
      sameSite: isProduction ? "None" : "Lax", // None only on HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userObj = existUser.toObject();
    delete userObj.password;
    res.status(200).json({
      status: 1,
      message: `User loggedIn successfully`,
      data: userObj,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      status: 1,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`,
    });
  }
};

const updateName = async (req, res) => {
  try {
    const id = req.user._id;
    const { name } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    if (user.name === name) {
      return res.status(403).json({
        status: 0,
        message: "New name should be different from old",
      });
    }

    user.name = name;
    await user.save();

    res.status(200).json({
      status: 1,
      message: "Name updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const id = req.user._id;
    const { oldPassword, newPassword } = req.body; //comes from frontend

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        status: 0,
        message: "All fields are required",
      });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      status: 1,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`,
    });
  }
};

const updatePic = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!req.file) {
      return res.status(400).json({ status: 0, message: "No image provided" });
    }

    const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "user_profiles",
    });

     const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profile: uploadResponse.secure_url },
      { returnDocument: 'after'}
    ).select("-password");

    fs.unlinkSync(req.file.path)

    res.status(200).json({
      status: 1,
      message: "pic updated successfully",
    });
  } catch (error) {

    if (req.file) fs.unlinkSync(req.file.path);

    res.status(500).json({
      status: 0,
      message: `server error ${error}`,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ status: 0, message: "User not found" });
    }
    res.json({ status: 1, data: user });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  updateName,
  updatePassword,
  updatePic,
  getUser,
};
