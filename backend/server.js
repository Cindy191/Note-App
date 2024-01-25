require('dotenv').config()
const mongoose = require('mongoose')
const express = require("express")
const cors = require('cors')
const app = express()
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors({
    credentials: true, //allows us to exchange the cookies -> which allows to authenticate
    origin: ['http://localhost:3000']
})) // frontend usually has a different port than backend so browser will throw an error

//setting up routes:
const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)

mongoose.connect(process.env.DATABASE_URL_NOTES)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.listen(8000, () => console.log('Server has Started'))



