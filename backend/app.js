const express = require('express');
const postsRoutes = require('./routes/posts.routes')
const userRoutes = require('./routes/user.routes');



const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://edmar-admin:${ process.env.MONGO_ATLAS_KEY }@cluster0.n2nfn6d.mongodb.net/angularDB`)
      .then((res) => {console.log("Succesfully connected to angularDB")});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static('backend/images'));

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

module.exports = app;