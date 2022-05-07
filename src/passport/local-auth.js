const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User') 

passport.serializeUser((user,done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user)
})

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,email,password, done) =>{

    const usuario = await User.findOne({email: email}) // VERIFICA SI COINCIDE UN CORREO CON EL DATO QUE RECIBIMOS

    if(usuario){
        return done(null, false)
    }else {
    const user = new User()
    user.email = email
    user.password = user.encryptPassword(password)
    await user.save()
    done(null, user)
    }
}));


passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,email,password, done) => {
    
    const user = await User.findOne({email: email})

    if(!user){
        return done(null, false)
    }
    if(!user.comparePassword(password)) {
        done(null, false)
    }

    done(null, user)
}))