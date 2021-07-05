const express = require('express')
//const expressEjsLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const navITems = require('./_navItems')

const app = express()

dotenv.config();

//app config
app.set('view engine', 'ejs')
//app.set('layout', 'layouts/layout')
//app.use(expressEjsLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const index = require('./routes/index')

//databse connection
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose'))

// set global variables
app.locals.menus = navITems

app.use('/', index)

app.listen(process.env.PORT || 3000, console.log(`Server started on port ${process.env.PORT}`))
