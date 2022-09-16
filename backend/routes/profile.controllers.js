const User = require('../models/user.model');

//Any profile from any user
exports.getProfile = (req, res) => {
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

function unfollow(follower, followed){
    return User.updateOne({_id: follower}, {$pull: {following: followed}})
        .then(r => {
            if (r.modifiedCount > 0){
                return User.updateOne({_id: followed}, {$pull: {followers: follower}});
            }
            throw 'Did not update follower';
        })

}

//User A(+1 following) follows B (+1 follower)
exports.followAccount = (req, res) => {
    const follower = req.userData.id;
    const followed = req.query.followedId;
    let result = 'Unfollowing';

    User.updateOne({_id: follower}, {$addToSet: {following: followed}})
        .then(r => {
            console.log('Follower response:', r);
            if (r.acknowledged && r.modifiedCount<=0){
                console.log('Unfollowing');
                return unfollow(follower, followed)
            }
            result = 'Following'
            return User.updateOne({_id: followed}, {$addToSet: {followers: follower}});
        })
        .then(r => {
            console.log('Followed response:', r)
            res.status(201).json({message: result, userId: follower})
        })
        .catch((e) => {
            console.log(e)
            res.status(401).json({message: "Couldn't follow account"})})

}