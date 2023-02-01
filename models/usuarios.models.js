const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        maxlength: 100
    },
    lastName: {
        type: String,
        maxlength: 100
    },
    email: { 
        type: String,
        required: true,
        maxlength: 100,
        unique: true,
    },
    username: { 
        type: String,
        required: true,
        maxlength: 100,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: true,
        value: true
    },
    avatar: {
        type: String,
        default: "",
        required: false,
    },
    bornDate: {
        type: Date,
        default: 1/1/2005,
        required: true
    }
})

module.exports = model('Usuarios', userSchema)