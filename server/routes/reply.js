const express = require("express");
const { Reply } = require("../models/Reply");
const router = express.Router();
router.post("/setReply", (req, res) => {
  //회원 가입 할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  const reply = new Reply(req.body);

  reply.save((err, req) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, req });
  });
});
router.post("/getReply", (req, res) => {
  Reply.find({ postFrom: req.body.postFrom }).exec((err, req) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, req });
  });
});

router.post("/removeReply", (req, res) => {
  Reply.deleteMany({
    postFrom: req.body.postFrom,
    userFrom: req.body.userFrom,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
