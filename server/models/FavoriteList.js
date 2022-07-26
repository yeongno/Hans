const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteListSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postFrom: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    content: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

const FavoriteList = mongoose.model("FavoriteList3", favoriteListSchema);

module.exports = { FavoriteList };
