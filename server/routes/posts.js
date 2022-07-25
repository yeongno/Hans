const express = require("express");
const router = express.Router();

const { Post } = require("../models/Post");

router.post("/getPost", (req, res) => {
  Post.find({ userFrom: req.body.userFrom }).exec((err, posts) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, posts });
  });
});

router.post("/removePost", (req, res) => {
  Post.findOneAndDelete({
    title: req.body.title,
    userFrom: req.body.userFrom,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post("/post", (req, res) => {
  //회원 가입 할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  const post = new Post(req.body);

  post.save((err, req) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

module.exports = router;
