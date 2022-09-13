const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  mail: {
    type: String,
    requires: [1],
    unique: true
  },
  password: {
    type: String,
    requires: [1],
    minlength: 1,
  },
  username: {
    type: String,
    requires: [1],
    unique: true
  },
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }]
});

userSchema.plugin(uniqueValidator)

//Create collections
const User = mongoose.model('User', userSchema);

module.exports = User;
