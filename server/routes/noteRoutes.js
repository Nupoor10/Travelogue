const express = require('express')
const router = express.Router()
const { createNote, getAllNotes, getSingleNote, updateNote, deleteNote} = require('../controllers/noteControllers')

router.post("/create", createNote)

router.get("/:id", getAllNotes)

router.get("/single/:id", getSingleNote)

router.put("/update/:id", updateNote)

router.delete("/delete/:id", deleteNote)

module.exports = router