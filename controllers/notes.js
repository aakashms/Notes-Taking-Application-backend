
const mongoose = require('mongoose');
const notes = require('../models/notes');


const insertNote = async(title,content)=>{
    try{
        

        const newNote = new notes({
            title: title,
            content: content,
        })

        await newNote.save();


    }catch(err){
        console.log(err);
    }
}


module.exports = {insertNote};