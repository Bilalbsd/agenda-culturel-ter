const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        enum: ["Théâtre", "Sport", "Concert", "Festival", "Danse", "Spectacle", "Exposition", "Autre"],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String
    },
    file: {
        type: String,
    },
    advert: {
        type: {
            active: Boolean,
            file: String,
            duration: Date
        }
    },
    speaker: {
        type: String
    },
    speakerPresentation: {
        type: String
    },
    typeEvent: {
        type: String
    },
    nbEvent: {
        type: Number
    },
    prices: {
        type: [{
            title: String,
            condition: String,
            price: Number,
            discountedPrice: Number
        }]
    },
    inPromotion: {
        type: Boolean
    },
    promotionHasExpiration: {
        type: Boolean
    },
    promotionExpirationDate: {
        type: Date
    },
    promotionValue: {
        type: Number
    },
    ticketLink: {
        type: String
    },
    isValidated: {
        type: Boolean
    },
    description: {
        type: String
    },
    capacity: {
        type: Number
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
    comments: {
        type: [{
            rating: Number,
            commenterId: String,
            commenterUsername: String,
            text: String,
            timestamp: Number
        }]
    }
},
    {
        timestamps: true
    });

const EventModel = mongoose.model('Event', EventSchema);

module.exports = EventModel;
