const express = require('express');
const Post = require('./models/post.model');
const postsRoutes = require('./routes/posts.routes')
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://edmar-admin:Js6P9a1C07lNaZVO@cluster0.n2nfn6d.mongodb.net/angularDB')
      .then((res) => {console.log("Succesfully connected to todolistDB")});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static('images'));

app.use((req, res, next) => {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
);
res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
);
next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;