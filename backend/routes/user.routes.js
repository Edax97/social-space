const express = require('express');

const router = express.Router();

const authCheck = require('./auth.middleware');

const {loginUser, signupUser, updateUser} = require('./user.controllers')

router.post('/signup', signupUser);

router.post('/login', loginUser);

//update my profile
router.post('/update', authCheck, updateUser);

module.exports =  router;