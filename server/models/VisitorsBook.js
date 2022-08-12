const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisitorsBookSchema = mongoose.Schema(
  {
    userFrom: {
      //방명록 작성자
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
    //누구의 방명록에 적을지 구분하는 스키마
    thisUserID: {
      type: String,
    },
    writer: {
      type: String,
    },
    //작성자 프로필 사진
    writerProfileImg: {
      type: String,
    },
  },
  { timestamps: true }
);

const VisitorsBook = mongoose.model("VisitorsBook", VisitorsBookSchema);

module.exports = { VisitorsBook };
