require('dotenv').config()
const mongoose = require('mongoose')
const express = require("express")
const app = express()
app.use(express.json())

//setting up routes:
const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)//so default url: "http://localhost:8000/notes", then GET url = "/" means default url

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.listen(8000, () => console.log('Server has Started'))



