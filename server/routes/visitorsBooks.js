const express = require("express");
const router = express.Router();

const { VisitorsBook } = require("../models/VisitorsBook");

//게시글의 댓글 불러오기
router.post("/getThisComments", (req, res) => {
  VisitorsBook.find({ thisPostID: req.body.thisPostID }).exec(
    (err, comments) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, comments });
    }
  );
});
//댓글 삭제
router.post("/removeComment", (req, res) => {
  VisitorsBook.findOneAndDelete({
    comment: req.body.comment,
    userFrom: req.body.userFrom,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});
router.post("/comment", (req, res) => {
  //회원 가입 할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  const visitorsBook = new VisitorsBook(req.body);

  visitorsBook.save((err, req) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

module.exports = router;
