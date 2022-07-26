const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    ownerSelect: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("PostLists", postSchema);

module.exports = { Post };
