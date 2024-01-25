const express = require('express')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
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

//Creating a Note
router.post('/newNote', async (req,res) => {

    // if(token){
    //     jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    //         if(err){
    //             res.sendStatus(403);
    //             return res.json({message: "unauthorized user"})
    //         }
    //         else{
    //             res.json({
    //                 message: "new note posted!",
    //                 authData: authData
    //             })
    //         }
    //     })        
    // }
    // else{
    //     res.redirect('/newNote')
    // }


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

// router.post('/login', async (req, res) => {
//     const register = await Register.findOne({username: req.body.username})

//     if(!register){
//         return res.status(404).send({
//             message: "User not found"
//         })
//     }

//     if(!await bcrypt.compare(req.body.password, register.password)){ //register.password = hashedPassword
//         return res.status(400).send({
//             message: "Invalid password"
//         })
//     }

//     //otherwise password is correct:
//     const token = jwt.sign({id: register._id}, process.env.SECRET_KEY)

//     res.cookie('jwt', token, {
//         httpOnly: true, //makes it more secure
//         maxAge: 24 * 60 * 60 * 1000 // maxAge of cookie will last 1 day
//     })

//     // res.send(register)

//     res.send({
//         message: 'success' //don't want to sent the cookie
//     })
// })

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
    else{
        const payload = {
            "_id": register._id
        }
//once logged in, then we create a token for them to use for other activites on site
        jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:'10h'}, (err, token) => {
            res.status(200).json({
                token: token
            })
        })
    }
})


//authenticate user route:
router.get('/register', verifyToken, async (req, res) => {
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

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}