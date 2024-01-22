const express = require('express')
const router = express.Router()
const Note = require('../models/noteModel')
module.exports = router

//using restful endpoints for this REST api
//Getting all Notes

router.all('/*', (req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type"); //needed to include the "Content-Type since that's what you used in the fetch POST function - these parameters trigger a preflight request from cors, so that's why you include them."
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
    next();
})


router.get('/allNotes', async (req,res) => {
    try{
        const notes = await Note.find({})
        res.status(200).json(notes)
    } catch (err) {
        res.status(500).json({ message: err.message }) //error 500 : something wrong with server
    } 
})
//Getting a specific Note using id
router.get('/:id', async (req,res) => { //request from user, respond to user
    try {
        const note = await Note.findById(req.params.id)
        if(note == null){
            return res.status(404).json({message: "Note not found"})
        }
        res.status(200).json(note)
    } catch (error) {
        res.json({message: error.message})
    }
})

//Creating a Note
router.post('/newNote', async (req,res) => {
    const note = new Note({
        title: req.body.title,
        text: req.body.text
    })
    try {
        const newNote = await note.save()
        res.status(201).json(newNote) //201 -> created something successfully
    } catch (error) {
        res.status(400).json({message: err.message}) //error 400: something wrong on user end such as bad data or unfilled data
    }
})

//Updating an item in Note object
router.patch('/updateTitle/:id/:title', async (req,res) => {
    try {
        const title = req.params.title
        const noteQuery = Note.findById(req.params.id)
        const note = await Note.findOneAndUpdate(noteQuery, {
            "title": title
        },
        {
            new: true //returns modified instead of original, so updated json is given instead of original
        }
        )
        res.status(200).json(note)        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.patch('/updateText/:id/:text', async (req,res) => {
    
    try {
        const text = req.params.text
        const noteQuery = Note.findById(req.params.id)
        const note = await Note.findOneAndUpdate(noteQuery, {
            "text": text
        },
        {
            new: true //returns modified instead of original, so updated json object is given instead of original
        }
        )
        res.status(200).json(note)        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.put('/update/:id/:title/:text', async (req,res) => {
    try {
        const noteQuery = Note.findById(req.params.id)
        const note = await Note.findOneAndUpdate(noteQuery, {
            "title": req.body.title,
            "text": req.body.text
        },
        {
            new: true //returns modified instead of original, so updated json object is given instead of original
        }
        )
        res.status(200).json(note)     
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Deleting one
router.delete('/delete/:id', async (req, res) => {
    try {
        const noteQuery = Note.findById(req.params.id)
        const note = await Note.findOneAndDelete(noteQuery,{
            new: true
        })
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})