const mongoose = require('mongoose')
const { isEmail, isMobilePhone } = require('validator')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
        // validate: [isEmail],
        // lowercase: true,
        // unique: true,
        // trim: true
    },
    phone: {
        type: String,
        // validate: [isMobilePhone],
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
    subscriptionExpiration: {
        type: Date
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    picture: {
        type: String,
    },
    title: {
        type: String,
    },
    companyName: {
        type: String,
    },
    address: {
        type: String,
    },
    subscription: {
        type: String,
        required: true,
        enum: ['free', 'mensual', 'punctual', 'supmensual', 'suppunctual'],
        default: 'free'
    },
    nbMaxEvent: {
        type: Number,
        default: 3,
        min: 0
    },
    favoriteEvents: {
        type: [String]
    },
    agendaEvents: {
        type: [String]
    },
    notifications: {
        type: [String]
    },
    eventNotifications: {
        type: Boolean,
    },
    promotionNotifications: {
        type: Boolean
    },
    isValidated: {
        type: Boolean,
        default: false
    },
    firstConnection: {
        type: Boolean,
        default: true
    },
    groups: {
        type: [{
            groupName: String,
            members: [String],
        }]
    },
    // promoNotification: {
    //     type: Boolean
    // },
    // proximityNotification: {
    //     type: Boolean
    // },
    // notifications: {
    //     type: [{
    //         eventId: String,
    //         message: String,
    //         timestamp: Date.now()
    //     }]
    // }
},
    {
        timestamps: true
    });

UserSchema.pre('save', function (next) {
    if (this.isModified('role') && this.role === 'creator') {
        this.isValidated = false;
    }
    next();
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