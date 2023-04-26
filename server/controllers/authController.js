const User = require('../models/UserModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { signUpErrors, signInErrors } = require('../utils/errors.utils');
require('dotenv').config({ path: '../config/.env' })


module.exports.signUp = async (req, res) => {
  const { email, password, firstname, lastname, picture, role, phone, title, companyName, address } = req.body;

  console.log(req.body, "req.body");

  try {
    let user;
    user = await User.create({ email, password, firstname, lastname, picture, role, phone, title, companyName, address });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(500).send({ errors });
  }
}


module.exports.signIn = async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    let user;

    if (email) {
      user = await User.findOne({ email });
    } else if (phone) {
      user = await User.findOne({ phone });
    } else {
      return res.status(400).json({ errors: { identifier: "Email ou téléphone requis" } });
    }

    if (!user) {
      const identifierName = email ? "email" : "téléphone";
      return res.status(404).json({ errors: { identifier: `Utilisateur avec cet ${identifierName} introuvable` } });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ errors: { password: "Mot de passe incorrect" } });
    }

    const payload = {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      phone: user.phone,
      title: user.title,
      picture: user.picture,
      companyName: user.companyName,
      address: user.address,
      nbMaxEvent: user.nbMaxEvent
    };

    const token = jwt.sign(payload, process.env.PRIVATE_TOKEN, { expiresIn: '72h' })
    res.status(200).json({ token });

  } catch (err) {
    const errors = signInErrors(err);
    res.status(500).json({ errors });
  }
};


