import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import Bcrypt from "bcryptjs";

//register function
export const Register= async (req, res,next) => {
    // const { name, email, password } = req.body;
    try{
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email:email });
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword =await Bcrypt.hashedPassword(password,12);
        const newUser = User.create({
            name,
            email,
            password: hashedPassword,

        });
        try {
            await newUser.save();
        } catch {
            const error =
                new Error("Error! Something went wrong.");
            return next(error);
        }
        let token;
        try {
            token= jwt.sign({newUserId:newUser._id},process.env.JWT_SECRET,{expiresIn:"1h"}
            );
            res.status(201).json({newUserId:newUser._id, token:token});
        } catch (err) {
            const error = new Error("Error! Something went wrong.");
            next(error);
        }


    }catch(err){
        const error = new Error("Error! Something went wrong.");
        next(error);
    }
    
}

//login function
export const login =async (req, res ,next)=>{
    try {
       const {email ,password}=req.body;
       const findUser=await User.findOne({email:email});
       if(!findUser){
        res.send(404).json({message:"User not found"});
       } 
       const isPasswordCorrect=await Bcrypt.compare(password,findUser.password);
       if(!isPasswordCorrect){
        res.status(400).json({message:"Invalid credentials"});
       }
       const token=jwt.sign({newUserId:findUser._id},
        process.env.JWT_SECRET,
        {expiresIN:"1h"}
    );
     return res.status(200).json({newUserId:findUser._id,token:token});

    } catch (error) {
         next(error);
        
    }
}