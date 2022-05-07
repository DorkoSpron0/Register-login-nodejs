const { Router } = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const router = Router()

const passport = require('passport')

router.get('/', (req,res,next) => {
    res.render('index')
});


router.get('/signup', (req,res,next) => {
    res.render('signup')
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true // PASARLE EL REQ DE TODOS LOS DATOS QUE RECIBO DEESDE EL CLIENTE
})) // FUNCION CREADA EN EL LOCAL-AUTH.JS

// LOGIN

router.get('/signin', (req,res,next) => {
    res.render('signin')
});

router.post('/signin', passport.authenticate('local-signin' , {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}))

router.get('/logout', (req,res,next) => {
    req.logout()
    res.redirect('/')
})

// RUTAS AUNTENTICADAS/PROTEJIDAS
// TODAS LAS DE ABAJO ESTÁN PROTEJIDAS
// EL USE SIEMPRE SE HACE SIEMPRE QUE EL GET O EL POST 
router.use((req,res,next) => {
    checkAuthentication(req,res,next)
})

router.get('/profile', (req,res,next) => {
    res.render('profile')
})

router.get('/dashboard', (req,res,next) => {
    res.send('Lidno')
})


// METODO PARA AUNTENTICAR
function checkAuthentication(req,res,next){
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

module.exports = router;