const express = require('express')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cookies = require('js-cookie')
const router = express.Router()
const Note = require('../models/noteModel')
const Register = require('../models/registerModel')
module.exports = router

//Getting all Notes
router.get('/allNotes', async (req,res) => {
    try{
        const notes = await Note.find({})
        res.status(200).json(notes)
    } catch (err) {
        res.status(500).json({ message: err.message }) //error 500 : something wrong with server
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


///////// LOGIN AUTHENTICATION ROUTES //////
router.post('/register', async (req, res) => {
    // try {
    //     const salt = await bcrypt.genSalt(10)
    //     const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //     const checking = await Register.findOne({username: req.body.username})
    //     if(checking){
    //         return res.json({message: "username already exists, please choose another."})
    //     }

    //     const register = new Register({
    //         username: req.body.username,
    //         password: hashedPassword
    //     })

    //     const result = await register.save() //inserts it        

    // } catch (error) {
    //     console.log(error.message)
    // }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const checking = await Register.findOne({username: req.body.username}) 
        if(checking){
            return res.json({message: "username already exists, please choose another."})
        }

        const register = new Register({
            username: req.body.username,
            password: hashedPassword
        })

        await register.save() //inserts it        

    } catch (error) {
        console.log(error.message)
    }
})

router.post('/login', async (req, res) => {
    //authentication section://
    try {
        const register = await Register.findOne({username: req.body.username})

        if(!register){
            return res.json({
                Login: false,
                message: "User not found" //for postman responses
            })
        }
        // const result = await bcrypt.compare(req.body.password, hashedPassword)
        if(!await bcrypt.compare(req.body.password, register.password)){ //register.password is the hashedPassword
            return res.json({
                Login:false,
                message: "Invalid password" //for postman responses
            })
        }
        else{
            res.json(
                {Login: true, 
                message: "Successfully logged in"}
            )
        }        
    } catch (error) {
        console.log(error)
    }

})

// router.post('/logout', (req, res) => {
//     res.cookie('jwt','', {
//         maxAge: 0 //causes the cookie to expire immediately by setting maxAge to 0 or past
//     })
//     res.send({
//         message: "Success"
//     })
// })
