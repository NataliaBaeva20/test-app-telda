const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => {
      if (err.name === 'CastError') { 
        res.status(500).send({ message: 'Произошла ошибка' }); 
      } 
    });
}

exports.createUser = (req, res) => {
  const {
    email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => User.create({
      email, password: hash,
    }))
    .then(user => res.send(user))
    .catch((err) => res.status(400).send(err));
}

exports.login = (req, res) => {
  const {
    email, password
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key');
      res.send({ token })
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
}