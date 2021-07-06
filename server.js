const express = require('express')
//const expressEjsLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const navITems = require('./_navItems')
const passport = require("passport");
const session = require('express-session');
const flash = require("express-flash");
const initializePassport = require("./config/passport");

const app = express()

dotenv.config();

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

initializePassport(passport);
//app config
app.set('view engine', 'ejs')
//app.set('layout', 'layouts/layout')
//app.use(expressEjsLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// session set up
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', require('./routes/index'))

app.listen(process.env.PORT || 3000, console.log(`Server started on port ${process.env.PORT}`))
