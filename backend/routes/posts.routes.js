const express = require('express');
const Post = require('../models/post.model');


const router = express.Router();

router.post('', (req, res) => {
    const post = new Post({
        title: req.body.post.title, 
        content: req.body.post.content})
    post.save()
        .then(savedPost => {
            console.log('Post added successfully')
            res.status(200).json({
                message: 'Post added successfully',
                postId: savedPost._id
            })
        })
    
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

router.put('/:id', (req, res) => {
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content
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