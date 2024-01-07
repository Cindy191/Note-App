require('dotenv').config()

const express = require("express")
const app = express()
app.use(express.json())

//setting up routes:
const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)

app.listen(8000, () => console.log('Server has Started'))

