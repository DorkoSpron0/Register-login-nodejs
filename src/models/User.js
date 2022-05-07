const { Schema,model } = require("mongoose");
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
    email: String,
    password: String
})

UserSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// FUNCION NORMAL PARA ACCEDER A LA PASSWORD DEL USERSCHEMA
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password) // PASSWORD USERCHEMA, PASSWORD DB
}

module.exports = model('User', UserSchema)