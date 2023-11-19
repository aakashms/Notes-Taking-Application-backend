const express = require('express');
const { checkUser, AuthenticateUser } = require('../controllers/login');
const { insertUser } = require('../controllers/signin');
const router = express.Router();

router.get("/", async()=>{
    await console.log("I'm Working nicelyyy")
});

router.post("/signup", async(req,res)=>{
try{
    const {name , email, password}= await req.body;
    console.log(name,password,email);
    const registerCredentials = await checkUser(email);
    if(registerCredentials ===false){
        await insertUser(name,email,password);
        res.status(200).send(true);
    }else if(registerCredentials === true){
        res.status(200).send(false);
    }else if(registerCredentials === "Server busy"){
        res.status(500).send("Server busy");
    }
}catch(err){
    console.log(err);
}

})

router.post('/login', async (req,res)=>{
    try{
    const {email, password} = await req.body;
    const loginCredentials = await AuthenticateUser(email,password);
    console.log(loginCredentials);
    if(loginCredentials === "Invalid username or password"){
        res.status(200).send("Invalid username or password")
    }else if(loginCredentials === "Server busy"){
        res.status(200).send("server busy");
    }else{
        res.status(200).json({token: loginCredentials.token})
    }

    }catch(err){
        console.log(err);
        res.status(500).send("Server Busy");
    }
    
});
module.exports = router;