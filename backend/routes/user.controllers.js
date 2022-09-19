const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signupUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            console.log('Signup body', req.body);
            //req.body has mail, password, username, name, lastname
            const user = new User({
                ...req.body,
                password: hash
            })
            user.save()
                .then( userRes => {
                    res.status(200).json({
                        message: 'User created',
                        response: userRes
                    })
                })
                .catch((e) => {
                    if (e.errors.mail.kind == 'unique'){
                        res.status(401).json({message: 'Email address already in use.'});
                    }
                    else{
                        res.status(401).json({message: 'Invalid credentials'})
                    }})
        })
}

exports.loginUser = (req, res) => {
    let userFetched;
    User.findOne({mail: req.body.mail})
        .then(user => {
            if (!user){ throw('Account does not exist') }
            userFetched = user;
            console.log(user)
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(pss_res => {
            if (!pss_res){ throw('Incorrect password.') }
            const token = jwt.sign({mail: userFetched.mail, id: userFetched._id},
                process.env.JWT_KEY,
                {expiresIn: '1h'}
                );
            res.status(200).json({expiresIn: 3600, token: token, 
                userData: (userFetched),
            });
        })
        .catch((e) => {res.status(401).json({message: e})})
}

exports.updateUser = (req, res, next) => {
    let retUser, hashedPss;
    User.findOne({mail: req.userData.mail})
        .then(user => {
            if (!user){
                throw('Account does not exist.');
            } else {
                retUser = user;
                return bcrypt.compare(req.body.password, retUser.password)
            }
        })
        .then(samePss => {
            if (!samePss) {
                throw('Incorrect password.');
            }
            if (req.body.newpassword){
                return bcrypt.hash(req.body.newpassword, 10);
            }
            return new Promise((resolve)=>{
                resolve(null);
            });
        })
        .then(hash => {
            const updatedPost = {
                password: hash ?? retUser.password,
                username: req.body.username ?? retUser.username,
                name: req.body.name ?? retUser.name,
                lastname: req.body.lastname ?? retUser.lastname,
                bio: req.body.bio ?? retUser.bio
            }
            console.log('Updated', updatedPost)
            return User.updateOne({mail: req.userData.mail}, updatedPost);
        })
        .then(dbRes => {
            console.log('update response',dbRes);
            res.status(201).json({message: 'Profile updated', mail: retUser.mail})
        })
        .catch(e => {
            console.log(e);
            res.status(400).json({message: e})
        })
}



