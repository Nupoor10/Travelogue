const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    places : {
        type : String
    },
    content : {
        type : String
    },
    color : {
        type : String,
    },
    user : {
        type : String
    }
    
}, {timestamps: true})

const Note = mongoose.model("Note", noteSchema)
module.exports = Note