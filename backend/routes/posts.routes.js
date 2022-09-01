const express = require('express');
const multer = require('multer');
const fs = require('fs');
const Post = require('../models/post.model');


const router = express.Router();

const exts = {
    'image/jpeg': '.jpeg',
    'image/jpg': '.jpg',
    'image/png': '.png'
}

const upload = multer({dest: 'images/'})

router.post('', upload.single('image'), async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    let path = '';
    if (req.file){
        path = (url + '/' + req.file.path)
    }
    
    const post = new Post({
        title: req.body.title, 
        content: req.body.content,
        imagePath: path
    })
    post.save()
        .then(savedPost => {
            console.log('Post added successfully')
            res.status(200).json({
                message: 'Post added successfully',
                postId: savedPost._id,
                imagePath: post.imagePath
            })
        })
        .catch(e => console.log(e))
    
});

router.get("", async (req, res, next)=>{
    let posts = []
    await Post.find()
        .then(docs => {
            posts = docs ;
        });

    res.status(201).json({
        message: 'Posts fetched with success!',
        posts: posts
    })
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id).then((postReturned) => {
        if (postReturned) {
            res.status(200).json(postReturned);
        } else {
            res.status(404).json({message: 'Post not found!'});
        }
    })
});

router.put('/:id', upload.single('image'),(req, res) => {
    console.log(req.file, req.body);
    const url = req.protocol + '://' + req.get('host');
    let path = req.body.image ?? '';
    if (req.file){
        path = (url + '/' + req.file.path)
    }
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: path
    });
    Post.updateOne({_id: req.params.id}, post)
        .then(mongoRes => {
            console.log(mongoRes);
            res.status(201).json({
                message: 'Post updated'
            })
        })
});

router.delete('/:id', (req, res) => {
    Post.deleteOne({_id: req.params.id})
        .then(mongoRes => {
            console.log(mongoRes);
            res.status(200).json({
                message: 'Post successfully deleted'
            })
        })
        .catch(e => {
            console.log(e);
            res.status(400).json({
                message: 'Deletion failed'
            })
        })
});

module.exports = router;