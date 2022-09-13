const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signupUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
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
            if (!user){ return send_error(res, 'Login1') }
            userFetched = user;
            console.log(user)
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(pss_res => {
            if (!pss_res){ return send_error(res, 'Login')}
            const token = jwt.sign({mail: userFetched.mail, id: userFetched._id},
                process.env.JWT_KEY,
                {expiresIn: '1h'}
                );
            res.status(200).json({expiresIn: 3600, token: token, 
                userData: (userFetched),
            });
        })
        .catch(() => {res.status(401).json({message: 'Invalid credentials!'})})
}

exports.updateUser = (req, res, next) => {
    let retUser, hashedPss;
    console.log('Update request', req.body)
    User.findOne({mail: req.body.mail})
        .then(user => {
            if (!user){
                res.status(401).json({message: 'User not registered.'})
            } else {
                retUser = user;
                return bcrypt.compare(req.body.password, retUser.password)
            }
        })
        .then(samePss => {
            console.log('Same password', samePss)
            if (!samePss) {
                return res.status(401).json({message: 'Incorrect password!'})
            }
            if (req.body.newpassword){
                return bcrypt.hash(req.body.newpassword, 10);
            }
            return new Promise((resolve)=>{
                console.log('Promise');
                resolve(null);
            });
        })
        .then(hash => {
            console.log('Hash', hash)
            const updatedPost = {
                mail: retUser.mail,
                password: hash ?? retUser.password,
                username: req.body.username ?? retUser.username,
                name: req.body.name ?? retUser.name,
                lastname: req.body.lastname ?? retUser.lastname
            }
            return User.updateOne({mail: req.body.mail}, updatedPost);
        })
        .then(dbRes => {
            console.log('update response',dbRes);
            res.status(201).json({message: 'Profile updated'})
        })
        .catch(e => {
            console.log(e);
            res.status(400).json({message: 'Error updating profile.'})
        })
}

exports.getProfile = (req, res) => {
    console.log('Req params', req.query.profileId)
    User.findById(req.query.profileId)
        .then(user => {
            
            sentUser = {
                ...user._doc,
                password: ''
            }
            console.log(sentUser)
            res.status(200).json(sentUser)
        }
        )
        .catch((e) => {
            console.log(e)
            res.status(401).json({message: 'User does not exists!'})})
}