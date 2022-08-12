const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = mongoose.Schema(
  {
    //친구 추가 대상 ID
    theyUser: {
      type: String,
    },
    //친구 추가자의 ID
    myName: {
      type: String,
    },
    //친구 이메일
    friendEmail: {
      type: String,
    },
    //친구 닉네임(name)
    friendName: {
      type: String,
    },
    //친구의 프로필 사진
    friendProfileImg: {
      type: String,
    },
    theNumber: {
      type: Number,
      default: 0,
    },
    myFriend: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const Friend = mongoose.model("Friend", friendSchema);

module.exports = { Friend };
