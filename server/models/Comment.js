const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
    },
    comment: {
      type: String,
    },
    ownerSelect: {
      type: Boolean,
      default: false,
    },
    favoriteNumber: {
      type: Number,
      default: 0,
    },
    thisPostID: {
      type: String,
    },
    writer: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
