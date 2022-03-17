const express = require('express');
const { getUsers } = require('../controllers/users')

const userRoutes = express.Router();

userRoutes.get('/', getUsers);

module.exports = userRoutes;