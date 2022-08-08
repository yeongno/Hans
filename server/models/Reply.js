const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
    },
    postFrom: {
      type: Schema.Types.ObjectId,
    },
    proFileImg: {
      type: String,
    },
    userName: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Reply = mongoose.model("ReplyList", replySchema);

module.exports = { Reply };
