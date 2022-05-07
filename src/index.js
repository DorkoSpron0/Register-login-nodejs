const express = require("express");
const app = express()
const path = require('path')
const morgan = require('morgan');
const passport = require("passport");
const session = require('express-session')


// DATABASE
require('./database')
require('./passport/local-auth')

// SETTINGS
app.set('port', process.env.PORT || 7000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// MIDDLEWARES
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next) => {
    app.locals.user = req.user
    next()
})

// ROUTES
app.use(require('./routes/index.routes'))

// STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log('Server started on port: ', app.get('port'))
})