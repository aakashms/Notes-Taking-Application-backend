const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
const client = require('../redis');
dotenv.config();
client.connect();

const checkUser = async(email)=>{
    try{
        const user = await User.findOne({email:email})
        console.log(user);

        if(user){
            return true;
        }
        return false;
    }catch(err){
        return "Server busy"
    }
}

const AuthenticateUser = async(email,password)=>{
    try{
        const userCheck = await User.findOne({email:email});
        const validPass = await bcrypt.compare(password,userCheck.password);
        if(validPass){
            const token = jwt.sign({email},process.env.SIGNUP_SECRET_KEY);
            const response = {
                id: userCheck._id,
                name: userCheck.name,
                email: userCheck.email,
                token: token,
                status:true
            };
           await client.set(`key-${email}`,JSON.stringify(response))
            await User.findOneAndUpdate({email:userCheck.email},{$set:{token:token}},{new:true})
            return response
        }
        return "Invalid username or password"
    }catch(err){
        console.log(err);
        return "Server busy"
    }
}

const AuthorizeUser = async(token)=>{
    try{
        const decodedToken = await jwt.verify(token, process.env.SIGNUP_SECRET_KEY);
        if(decodedToken){
            const email = decodedToken.email;
            const auth = await client.get(`key-${email}`)
        
            if(auth){
                const data = JSON.parse(auth)
                
                return data
            }else{
                const data = await User.findOne({email:email})
                return data;

            }
        }
        return false;
    } catch(err){
        console.log(err);
    }
}

module.exports = {checkUser , AuthenticateUser, AuthorizeUser};