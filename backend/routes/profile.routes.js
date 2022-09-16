const express = require('express');

const router = express.Router();

const authCheck = require('./auth.middleware');

const { getProfile, followAccount } = require('./profile.controllers')

//get any profile
router.get('/profile', getProfile);

//follow someone
router.get('/follow', authCheck, followAccount);

module.exports =  router;