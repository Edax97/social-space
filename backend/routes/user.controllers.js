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
                userData: userFetched,
            });
        })
        .catch(() => {res.status(401).json({message: 'Invalid credentials!'})})
}