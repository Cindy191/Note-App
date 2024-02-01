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
        res.status(500).json({ message: err.message })
    } 
})

router.post('/newNote', async (req,res) => {
    const note = new Note({
        title: req.body.title,
        text: req.body.text
    })
    try {
        const newNote = await note.save()
        res.status(201).json({newNote, message: "you are authenticated!"})
    } catch (error) {
        res.status(400).json({message: err.message})
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
            new: true
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
    try {
        const checking = await Register.findOne({username: req.body.username}) 
        if(checking){
            return res.json({message: "username already exists, please choose another."})
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const register = new Register({
            username: req.body.username,
            password: hashedPassword
        })

        await register.save()
        
    } catch (error) {
        console.log(error.message)
    }
})

//correct version of login post without JWT:
router.post('/login', async (req, res) => {
    //authentication section://
    try {
        const register = await Register.findOne({username: req.body.username})

        if(!register){
            return res.json({
                auth: false,
                message: "User not found"
            })
        }
        if(!await bcrypt.compare(req.body.password, register.password)){
            return res.json({
                auth:false,
                message: "Invalid password"
            })
        }
        else{
            //attach a token to that id of user that successfully logged in:
            const id = register._id;
            const token = jwt.sign({id}, process.env.SECRET_KEY, {
                expiresIn: 3000
            })

            return res.json(
                {auth: true,
                token: token,
                result: register,
                message: "Successfully logged in"}
            )
        }        
    } catch (error) {
        console.log(error)
    }

})

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"] //requesting the token from the client
    if(!token){ //if we didn't get a token from the client -> we send back to them a message saying we didn't receive a token
        return res.json({message: "there is no token"})
    }
    else{
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if(err) {
                res.json({auth: false, message: "You failed to authenticate"});
            }
            else{
                req.userId = decoded.id;
                next();
            }
        })
    }
}