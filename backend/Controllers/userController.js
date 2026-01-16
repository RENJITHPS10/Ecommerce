import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const register = async (req, res) => {

  try {
    const { name, email, password, role, address ,phonenumber } = req.body;


    if (!name || !email || !password || !address || !phonenumber) {
      return res.status(400).json({ message: "All fields required" });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      address,
      phonenumber
    });


    const payload = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      address: newUser.address,
      phonenumber:newUser.phonenumber
    };


    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: payload,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role ,
      address: user.address,
      phonenumber:user.phonenumber
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: payload,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const adminDashboard = async (req, res) => {
  res.json({
    message: "Welcome Admin, this is your dashboard!",
  });
};

export const  updateAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.user.id;

    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { address },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Address updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

