const User = require('../models/UserModel');

// Récupération de tous les utilisateurs
module.exports.getAllUsers = ((req, res) => {
    User.find((err, users) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(users);
    });
});

// Récupération d'un utilisateur spécifique
module.exports.getUser = ((req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send("User not found");
        return res.status(200).send(user);
    });
});

// Mise à jour d'un utilisateur
module.exports.updateUser = ((req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(user);
    });
});

// Suppression d'un utilisateur
module.exports.deleteUser = ((req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(user);
    });
});