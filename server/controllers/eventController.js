const Event = require('../models/EventModel');
const User = require('../models/UserModel');

const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

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
    console.log(req.body, "req.body");
    console.log(req.body.prices, "req.body");

    const newEvent = new Event(req.body);
    newEvent.image = req.file.path.replace(/\\/g, "/").replace("../client/public", "");
    console.log(req.file.path, "req.file.path");
    newEvent.save((err, event) => {
        if (err) return res.status(500).send(err);

        return res.status(201).send(event);
    });
});

// module.exports.createEvent = ((req, res) => {
//     // On vérifie que l'utilisateur est un créateur d'événements
//     // if (req.user.role != "creator") return res.status(403).send("Forbidden");

//     const newEvent = new Event(req.body);
//     console.log(req.body.creator, "req.user");
//     newEvent.creator = req.user.id; // Définir l'utilisateur comme créateur de l'événement
//     newEvent.image = req.file.path.replace(/\\/g, "/").replace("../client/public", "");

//     User.findById(req.user._id, (err, user) => {
//         if (err) return res.status(500).send(err);

//         if (user.nbMaxEvent > 0) {
//             user.nbMaxEvent -= 1; // Réduire le nombre maximum d'événements de 1
//             user.save((err) => {
//                 if (err) return res.status(500).send(err);
//             });

//             newEvent.save((err, event) => {
//                 if (err) return res.status(500).send(err);

//                 // Envoyer une notification à tous les clients connectés via Socket.io
//                 io.emit('newEvent', event);

//                 return res.status(201).send(event);
//             });
//         } else {
//             return res.status(403).send("Maximum number of events reached");
//         }
//     });
// });



// // Mise à jour d'un événement
module.exports.updateEvent = ((req, res) => {
    console.log(req.body, "req.body");

    const event = req.body;
    if (req.file) {
        event.file = req.file.path.replace(/\\/g, "/").replace("../client/public", "");
    }

    Event.findByIdAndUpdate(req.params.id, event, { new: true }, (err, event) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(event);
    });
});

// module.exports.updateEvent = ((req, res) => {
//     Event.findById(req.params.id, (err, event) => {
//       if (err) return res.status(500).send(err);
//       if (!event) return res.status(404).send('Event not found');

//       if (req.file) {
//         console.log(req.file);
//         event.file = req.file.path.replace(/\\/g, "/").replace("../client/public", "");
//       }

//       event.save((err, updatedEvent) => {
//         if (err) return res.status(500).send(err);
//         return res.status(200).send(updatedEvent);
//       });
//     });
//   });

// module.exports.updateEvent = ((req, res) => {
//     const uploadMiddleware = upload.single('file'); // 'file' est le nom du champ de formulaire pour le fichier
//     uploadMiddleware(req, res, (err) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         Event.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, event) => {
//             if (err) {
//                 return res.status(500).send(err);
//             }
//             if (req.file) { // Vérifiez si un fichier a été uploadé
//                 event.file = req.file.path; // Ajoutez le chemin du fichier à l'événement mis à jour
//                 console.log(req.body, "req.file.path")
//                 event.save(); // Enregistrez l'événement
//             }
//             return res.status(200).send(event);
//         });
//         console.log(req.file.path, "req.file.path")
//     });
// });

// Suppression d'un événement
module.exports.deleteEvent = ((req, res) => {
    Event.findByIdAndRemove(req.params.id, (err, event) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(event);
    });
});


