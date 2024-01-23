const express = require('express')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const router = express.Router()
const Note = require('../models/noteModel')
const Register = require('../models/registerModel')
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

//Getting all registeredUsers
router.get('/getRegisters', async (req, res) => {
    try {
        const registers = await Register.find({})
        res.status(200).json(registers)    
    } catch (error) {
        res.status(500).json({message: error.message})
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

//Getting a specific Note using id
// router.get('/:id', async (req,res) => { //request from user, respond to user
//     try {
//         const note = await Note.findById(req.params.id)
//         if(note == null){
//             return res.status(404).json({message: "Note not found"})
//         }
//         res.status(200).json(note)
//     } catch (error) {
//         res.json({message: error.message})
//     }
// })

//Updating an item in Note object
// router.patch('/updateTitle/:id/:title', async (req,res) => {
//     try {
//         const title = req.params.title
//         const noteQuery = Note.findById(req.params.id)
//         const note = await Note.findOneAndUpdate(noteQuery, {
//             "title": title
//         },
//         {
//             new: true //returns modified instead of original, so updated json is given instead of original
//         }
//         )
//         res.status(200).json(note)        
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

// router.patch('/updateText/:id/:text', async (req,res) => {
    
//     try {
//         const text = req.params.text
//         const noteQuery = Note.findById(req.params.id)
//         const note = await Note.findOneAndUpdate(noteQuery, {
//             "text": text
//         },
//         {
//             new: true //returns modified instead of original, so updated json object is given instead of original
//         }
//         )
//         res.status(200).json(note)        
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

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

router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const register = new Register({
            username: req.body.username,
            password: hashedPassword
        })

        const result = await register.save()
        const {password, ...data} = await result.toJSON() //separates password data from the rest of data so you can just send the data part w/o password

        res.send(data)

    } catch (error) {
        console.log(error.message)
    }
})

router.post('/login', async (req, res) => {
    const register = await Register.findOne({username: req.body.username})

    if(!register){
        return res.status(404).send({
            message: "User not found"
        })
    }

    if(!await bcrypt.compare(req.body.password, register.password)){ //register.password = hashedPassword
        return res.status(400).send({
            message: "Invalid password"
        })
    }


    //otherwise password is correct:
    const token = jwt.sign({id: register._id}, process.env.SECRET_KEY)

    res.cookie('jwt', token, {
        httpOnly: true, //makes it more secure
        maxAge: 24 * 60 * 60 * 1000 // maxAge of cookie will last 1 day
    })

    res.send({
        message: 'success' //don't want to sent the cookie
    })
})

//authenticate user route:
router.get('/register', async (req, res) => {
    try {
    const cookie = req.cookies['jwt']

    const claims = jwt.verify(cookie, process.env.SECRET_KEY)

    if(!claims) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }

    // const register =  await Register.findOne({_id: claims._id})
    // const {password, ...data} = await register.toJSON()

    //else: authenticated:
    res.send({message: "Authenticated"})        
    } catch (error) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }

})

router.post('/logout', (req, res) => {
    res.cookie('jwt','', {
        maxAge: 0 //causes the cookie to expire immediately by setting maxAge to 0 or past
    })
    res.send({
        message: "Success"
    })
})

// //Creating a Registered User.
// router.post('/createRegister', async (req, res) => {
//     const register = new Register({
//         username: req.body.username,
//         password: req.body.password
//     })
//     try {
//         const newRegister = await register.save(); //insertMany[register]
//         res.status(201).json(newRegister)
//     } catch (error) {
//         res.status(400).json({message: error.message})
//     }
// })

// router.post('/login', async (req, res) => {
//     try {
//         const check = await Register.findOne({username: req.body.username})
//         if(check.password == req.body.password){
//             res.send({message: "success"})
//         }
//         else{
//             res.send(false)
//         }
//     } catch (error) {
//         res.send(false)
//     }
// })

