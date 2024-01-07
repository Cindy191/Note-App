const express = require('express')
const router = express.Router()
const Note = require('../models/noteModel')

module.exports = router

//using restful endpoints for this REST api
//Getting All
router.get('/', (req,res) => {
    res.send('Hello World')
})
//Getting one
router.get('/:id', (req,res) => {
    res.send(req.params.id) //passing an id
})

//Creating one
router.post('/', (req,res) => {
    
})

//Updating one
//patch = update a specific item in data object, put = update entire data object
router.patch('/:id', (req,res) => {
    
})

//Deleting one
router.patch('/:id', (req,res) => {
    
})