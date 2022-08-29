const express = require('express');
const Post = require('./post.model');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://edmar-admin:Js6P9a1C07lNaZVO@cluster0.n2nfn6d.mongodb.net/angularDB')
      .then((res) => {console.log("Succesfully connected to todolistDB")});


const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json())

//allow cors
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

    next();
});


app.post('/api/posts', (req, res) => {
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

app.get("/api/posts", async (req, res, next)=>{
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

app.delete('/api/posts/:id', (req, res) => {
    Post.deleteOne({_id: req.params.id})
        .then(result => {
            console.log(`Post ${ req.params.id} deleted`);
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



module.exports = app;