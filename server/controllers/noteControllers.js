const mongoose = require('mongoose')
const Note = require('../models/noteModel')

//Create Note
const createNote = async (req,res) => {
    try {
        const note = new Note({
            title : req.body.title,
            places : req.body.places,
            content : req.body.content,
            user : req.body.user
        })
    
        const savedNote = await note.save();
        res.status(200).send({
        message: "Note saved successfully",
        result: savedNote,
        });
    }
    catch(error) {
        res.status(500).send({
            message: "Error creating note",
            error: error.message,
          });
    }
}

//Get All Notes
const getAllNotes = async (req,res) => {
    try {
        const notes = await Note.find({user : req.params.id})
        res.status(200).send({
            message : "Notes found successfully",
            notes 
        })
    }
    catch(error) {
        res.status(500).send({
            message: "Error retrieving notes",
            error: error.message,
          });
    }
 }


//Get Single Note
const getSingleNote = async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      if (!note) {
        res.status(404).send({
          message: "Note not found",
        });
      } else {
        res.status(200).send({
          message: "Note found successfully",
          note,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Error retrieving note",
        error: error.message,
      });
    }
  };
  

//Update Note
const updateNote = async (req,res) => {
    try{
        const note = await Note.findById(req.params.id)
        if(!note) {
            res.status(404).send({
                message : "Note not found",
            })
        }
        else {
            note.title = req.body.title
            note.places = req.body.places
            note.content = req.body.content

            const updatedNote = await note.save()

            res.status(200).send({
                message : "Note Updated successfully",
                updatedNote
            })
        }
    }
    catch(error) {
        res.status(500).send({
            message : "Error Updating Notes",
            error : error.message
        })
    }
}

//Delete Note   
const deleteNote = async (req,res) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) {
            res.status(404).send({
                message : "Note not found",
            })
        }
    
        else {
            await Note.deleteOne({_id : req.params.id})
            res.status(200).send({
                message : "Note deleted successfully",
            })
        }
    }
    catch(error) {
        res.status(500).send({
            message : "Error Deleting Notes",
            error : error.message
        })
    }
}

module.exports = {
    createNote,
    getAllNotes, 
    getSingleNote,
    updateNote,
    deleteNote
}