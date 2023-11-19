const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    content:{
        type:String,
    },
    isThere:{
        type:Boolean
    }
},
    {
    collection:"Note"
});

module.exports = mongoose.model("Note",noteSchema);