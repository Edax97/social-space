const mongoose = require('mongoose');
const PaginatePlugin = require('./pagination.plugin')

const postSchema = new mongoose.Schema({
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
    requires: [1]
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    requires: [1]
  }
});

postSchema.plugin(PaginatePlugin, {limit: 10})

//Create collections
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
