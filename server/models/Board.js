// 게시판(board) 관련 DB설정 파일 입니다.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = mongoose.Schema(
  {
    //유저 정보
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    //게시글 제목
    title: {
      type: String,
      maxlength: 255,
    },
    //게시글 내용
    content: {
      type: String,
      maxlength: 65535,
    },
    //파일 첨부
    UpFile: {
      type: String,
    },
    File: {
      type: String,
    },
    createdAt: {
      // 글을 생성한 날짜
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Board = mongoose.model("Board", boardSchema);

module.exports = { Board };
