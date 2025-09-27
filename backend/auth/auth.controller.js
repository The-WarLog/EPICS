import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import Bcrypt from "bcryptjs";

//register function
export const Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "name, email and password are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await Bcrypt.hash(password, 12);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(201).json({ userId: newUser._id, token });
    } catch (err) {
        return next(err);
    }
};

//login function
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body || req.params || req.query;
        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordCorrect = await Bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ userId: user._id, token });
    } catch (error) {
        return next(error);
    }
};