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

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"] //requesting the token from the client
    if(!token){ //if we didn't get a token from the client -> we send back to them a message saying we didn't receive a token
        res.json({message: "there is no token"})
    }
    else{
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if(err) {
                res.json({auth: false, message: "You failed to authenticate"});
            }
            else{
                req.userId = decoded.id;  //saves the id from the id associated with the token so that we can keep using the token for other api requests since we already verified it
                next();
            }
        })
    }
}

//Getting all Notes
router.get('/allNotes', async (req,res) => {
    try{
        const notes = await Note.find({})
        res.status(200).json(notes)
    } catch (err) {
        res.status(500).json({ message: err.message }) //error 500 : something wrong with server
    } 
})

//Creating a Note - correct version without middleware
// router.post('/newNote', async (req,res) => {
//     const note = new Note({
//         title: req.body.title,
//         text: req.body.text
//     })
//     try {
//         const newNote = await note.save()
//         res.status(201).json(newNote) //201 -> created something successfully
//     } catch (error) {
//         res.status(400).json({message: err.message}) //error 400: something wrong on user end such as bad data or unfilled data
//     }
// })



router.post('/newNote', async (req,res) => {
    const note = new Note({
        title: req.body.title,
        text: req.body.text
    })
    try {
        const newNote = await note.save()
        res.status(201).json({newNote, message: "you are authenticated!"}) //201 -> created something successfully
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

//correct version of login post without JWT:
router.post('/login', async (req, res) => {
    //authentication section://
    try {
        const register = await Register.findOne({username: req.body.username})

        if(!register){
            return res.json({
                auth: false,
                message: "User not found" //for postman responses
            })
        }
        // const result = await bcrypt.compare(req.body.password, hashedPassword)
        if(!await bcrypt.compare(req.body.password, register.password)){ //register.password is the hashedPassword
            return res.json({
                auth:false,
                message: "Invalid password" //for postman responses
            })
        }
        else{
            //attach a token to that id of user that successfully logged in:
            const id = register._id;
            const token = jwt.sign({id}, "jwtSecret", {
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

// router.post('/logout', (req, res) => {
//     res.cookie('jwt','', {
//         maxAge: 0 //causes the cookie to expire immediately by setting maxAge to 0 or past
//     })
//     res.send({
//         message: "Success"
//     })
// })
