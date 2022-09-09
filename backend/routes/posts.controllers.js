const fs = require('fs');
const Post = require('../models/post.model');


const exts = {
    'image/jpeg': '.jpeg',
    'image/jpg': '.jpg',
    'image/png': '.png'
}
//Retrieve posts
exports.getPosts = (req, res, next)=>{
    Post.find().paginate(req.query)
        .then(({data, pagination})=>{
            //console.log(data)
            res.status(201).json({
                message: 'Posts fetched with success!',
                posts: data.reverse(),
                numberPosts: pagination.count
            })
        })
        .catch(() => {
            res.status(500).json({message: 'Error getting posts'})
        })
}

//Retrieve post by Id
exports.getPost = (req, res) => {
    Post.findById(req.params.id).then((postReturned) => {
        if (postReturned) {
            res.status(200).json(postReturned);
        } else {
            res.status(404).json({message: 'Post not found!'});
        }
        })
        .catch(()=>{ res.status(500).json({ message: 'Error getting post information'})  })
};

//New post
exports.createPost = async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    let path = '';
    if (req.file){
        path = (url + '/' + req.file.path)
    }
    
    const post = new Post({
        title: req.body.title, 
        content: req.body.content,
        imagePath: path,
        userId: req.userData.id
    })
    post.save()
        .then(savedPost => {
            console.log('Post added successfully')
            res.status(200).json({
                message: 'Post added successfully',
                post: savedPost
            })
        })
        .catch(() => {res.status(500).json({message: 'Error creating post'})})
    
};

//Update post
exports.updatePost = (req, res) => {
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
        imagePath: path,
        userId: req.userData.id
    });
    Post.updateOne({_id: req.params.id, userId: req.userData.id}, post)
        .then(mongoRes => {
            console.log(mongoRes);
            if (mongoRes.modifiedCount > 0){
                res.status(201).json({message: 'Post updated'});
            } else {
                res.status(401).json({message: 'Not authorized'});
            }
            
        })
        .catch(() => {res.status(500).json({message: 'Error updating post'})})

};

//Delete post
exports.deletePost = (req, res) => {
    Post.deleteOne({_id: req.params.id, userId: req.userData.id})
        .then(mongoRes => {
            console.log(mongoRes);
            if (mongoRes.deletedCount > 0){
                res.status(200).json({message: 'Post successfully deleted'});
            } else {
                res.status(401).json({message: 'Not authorized'});
            }
            
        })
        .catch(() => {res.status(500).json({message: 'Error deleting post'})})

};