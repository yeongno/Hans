const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteListSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // unique: 1,
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
    favorited: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const FavoriteList = mongoose.model("FavoriteList123", favoriteListSchema);

module.exports = { FavoriteList };
