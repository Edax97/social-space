const mongoose = require('mongoose');

const postSchema = {
  title: {
    type: String,
    requires: [1],
    minlength: 1,
  },
  content: {
    type: String,
    requires: [1],
    minlength: 1,
  },
  imagePath: {
    type: String,
  }
};


//Create collections
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
