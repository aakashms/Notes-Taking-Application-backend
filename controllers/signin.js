const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const user = require('../models/user');
dotenv.config();

const insertUser = async(name,email,password)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const token = generateToken(email);

        const newUser = new user({
            name:name,
            email:email,
            password: hashedPass,
            token: token,
        })

        await newUser.save();


    }catch(err){
        console.log(err);
    }
}

const generateToken = (email)=>{
    const token = jwt.sign(email,process.env.SIGNUP_SECRET_KEY);
    return token;
}

module.exports = {insertUser};