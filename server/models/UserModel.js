const mongoose = require('mongoose')
const { isEmail, isMobilePhone } = require('validator')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
        validate: [isEmail],
        lowercase: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        validate: [isMobilePhone],
        required: false
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: String,
        required: true,
        enum: ['creator', 'anonymous', 'registered', 'manager', 'admin']
    },
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    companyName: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    nbMaxEvent: {
        type: Number,
        default: 3,
        min: 0
    }
},
    {
        timestamps: true
    });


/*
Explication fonctionnement Bcrypt :
    -> On salt le mot de passe en indiquant un work factor
    -> On hash le mot de passe en passant en paramètre le mdp et le salt
    Ceci est exécuté avant de sauvegarder dans la BDD (UserSchema.pre('save', ...))
*/
UserSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;