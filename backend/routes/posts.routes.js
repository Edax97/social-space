const express = require('express');
const multer = require('multer');
const authCheck = require('./auth.middleware');
const router = express.Router();
const upload = multer({dest: 'images/'});

const {getPost, getPosts, createPost, updatePost, deletePost} = require('./posts.controllers')

//Retrieve posts
router.get("", getPosts)

//Retrieve post by Id
router.get('/:id', getPost);

//New post
router.post('', authCheck, upload.single('image'), createPost);

//Update post
router.put('/:id', authCheck, upload.single('image'), updatePost);

//Delete post
router.delete('/:id', authCheck, deletePost);

module.exports = router;