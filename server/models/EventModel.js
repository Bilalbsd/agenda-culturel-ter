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
        enum: ["Théâtre", "Sport", "Concert", "Festival", "Danse", "Spectacle", "Exposition"],
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
    price: {
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
    rating: {
        type: [Number],
        min: 0,
        max: 5
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
