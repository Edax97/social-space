const express = require('express');

const router = express.Router();

const {loginUser, signupUser, getProfile, updateUser} = require('./user.controllers')

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.post('/update', updateUser);

router.get('/profile', getProfile);


module.exports =  router;