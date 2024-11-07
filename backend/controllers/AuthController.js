const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signUp = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const user = await userModel.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists."});
        }
        const newUser = new userModel({name, email, password});
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(201).json({message: "Sign Up successfully.",
            success: true
        })
    }catch(err){
        res.status(500).json({
            message: "Internal server error.",
            success: false
        })
    }
}

const logIn = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message: "User does not exist."});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid password."});
        }
        const jwtToken = jwt.sign({email:email, id:user._id}, 
            process.env.JWT_SECRET, 
            {expiresIn: "24h"}
        );
        res.status(200).json({
            message: "Log In successfully.",
            token: jwtToken,
            success: true,
            email: email,
            name: user.name,
        })
    }catch(err){
        res.status(500).json({
            message: "Internal server error.",
            success: false
        })
    }
}


module.exports = {
    signUp,
    logIn
}