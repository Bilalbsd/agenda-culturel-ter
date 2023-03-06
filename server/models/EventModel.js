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
        enum : ["Théâtre", "Sport", "Concert", "Festival", "Danse", "Spectacle", "Exposition"],
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
    coords1: {
        type: Number
    },
    coords2: {
        type: Number
    }
},
    {
        timestamps: true
    });

const EventModel = mongoose.model('Event', EventSchema);

module.exports = EventModel;
