const Event = require('../models/EventModel');

// Récupération de tous les événements
module.exports.getAllEvents = ((req, res) => {
    Event.find((err, events) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(events);
    });
});

// Récupération d'un événement spécifique
module.exports.getEvent = ((req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if (err) return res.status(500).send(err);
        if (!event) return res.status(404).send("Event not found");
        return res.status(200).send(event);
    });
});

// Ajout d'un événement
module.exports.createEvent = ((req, res) => {
    // On vérifie que l'utilisateur est un créateur d'événements
    // if (req.user.role != "creator") return res.status(403).send("Forbidden");
    const newEvent = new Event(req.body);
    newEvent.image = req.file.path.replace(/\\/g, "/").replace("../client/public", "")

    console.log(req.file, "req.file")
    console.log(newEvent, "newEvent")

    newEvent.save((err, event) => {
        if (err) return res.status(500).send(err);
        return res.status(201).send(event);
    });
});


// Mise à jour d'un événement
module.exports.updateEvent = ((req, res) => {
    Event.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, event) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(event);
    });
});

// Suppression d'un événement
module.exports.deleteEvent = ((req, res) => {
    Event.findByIdAndRemove(req.params.id, (err, event) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(event);
    });
});


