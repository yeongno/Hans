const express = require("express");
const router = express.Router();

const { Friend } = require("../models/Friend");
//친구 리스트 조회
router.post("/getList", (req, res) => {
  Friend.find({ myName: req.body.userFrom }).exec((err, users) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, users });
  });
});
//나를 친구 추가한 유저 조회
router.post("/getAwayList", (req, res) => {
  Friend.find({ theyUser: req.body.userFrom }).exec((err, users) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, users });
  });
});
//친구 삭제
router.post("/removeFriend", (req, res) => {
  Friend.findOneAndDelete({
    myName: req.body.myName,
    theyUser: req.body.theyUser,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, result });
  });
});
//친추 여부 확인
router.post("/myFriend", (req, res) => {
  Friend.find({
    myName: req.body.myName,
    theyUser: req.body.theyUser,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res
      .status(200)
      .json({ success: true, result, myFriend: result.myFriend });
  });
});

module.exports = router;
