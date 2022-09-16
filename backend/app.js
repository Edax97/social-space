const express = require('express');
const path = require('path');
const postsRoutes = require('./routes/posts.routes')
const userRoutes = require('./routes/user.routes');
const profileRoutes = require('./routes/profile.routes')


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_ATLAS_URL)
      .then((res) => {console.log("Succesfully connected to angularDB")});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/', express.static(path.join(__dirname,'angular')));

app.use((req, res, next) => {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
);
res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
);
next();
});

app.use("/api/posts", postsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);

app.use((req, res)=> {
    res.sendFile(path.join(__dirname, 'angular', 'index.html'))
})

module.exports = app;