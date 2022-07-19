const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
});

const Post = mongoose.model("PostList", postSchema);

module.exports = { Post };
