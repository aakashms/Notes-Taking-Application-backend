const express = require('express');
const { insertNote } = require('../controllers/notes');

const user = require('../models/user');
const notes = require('../models/notes');
const router = express.Router();

let notesAll = [];
router.get("/get", async(req,res)=>{
    await console.log("I'm Working nicelyyy")
    try{
        const response = await notes.find();
        res.send(response);
        
    }catch(err){
        console.log(err);
        return "Server busy"
    }
});

router.post("/post", async(req,res)=>{
    try{
        const {title,content,isThere}= await req.body;
        console.log(title,content,isThere);
            await insertNote(title,content);
            res.status(200).send(true);
    }catch(err){
        console.log(err);
    }
    })

module.exports=router;