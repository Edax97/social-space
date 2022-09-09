const express = require('express');

const router = express.Router();

const {loginUser, signupUser} = require('./user.controllers')

router.post('/signup', loginUser);

router.post('/login', signupUser);


module.exports =  router;