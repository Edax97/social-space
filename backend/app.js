const express = require('express');

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
    const post = req.body.post;
    console.log(post);
    res.status(200).json({
        message: 'Post added successfully'
    })
});

app.get("/api/posts",(req, res, next)=>{
    const posts = [
        {id: "1", title: "First server post", content: "Coming from server"},
        { id: '2', title: 'Second post', content: 'Coming from server too'},
        { id: '3', title: 'Third post', content: 'Coming from server as well'}

    ]
    res.status(200).json({
        message: 'Posts fetched with success!',
        posts: posts
    })
})



module.exports = app;