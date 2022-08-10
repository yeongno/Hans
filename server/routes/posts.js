const express = require("express");
const router = express.Router();

const { Post } = require("../models/Post");

// router.post("/uploadFileImg", (req, res) => {
//   User.findOneAndUpdate(
//     { _id: req.body._id },
//     {
//       proFileImg: req.body.proFileImg,
//     }
//   ).exec((err, result) => {
//     if (err) return res.status(400).send(err);
//     return res.status(200).json({ success: true, result });
//   });
// });

router.post("/getPost", (req, res) => {
  Post.find({ topic: req.body.public }).exec((err, posts) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, posts });
  });
});
router.post("/getPostList", (req, res) => {
  Post.find({ userFrom: req.body.userFrom }).exec((err, posts) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, posts });
  });
});
router.post("/getOnePost", (req, res) => {
  Post.find({ _id: req.body._id }).exec((err, posts) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, posts });
  });
});
router.post("/getImgeFile", (req, res) => {
  Post.find({ _id: req.body._id }).exec((err, posts) => {
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

router.post("/removeOnePost", (req, res) => {
  Post.findOneAndDelete({
    _id: req.body._id,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post("/updatePost", (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.body._id },
    {
      title: req.body.title,
      content: req.body.content,
      imagePath: req.body.imagePath,
    }
  ).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, result });
  });
});

router.post("/downToFavorite", (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.body._id, userFrom: req.body.userFrom },
    {
      favoriteNumber: 0,
    }
  ).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post("/upToFavorite", (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.body._id, userFrom: req.body.userFrom },
    {
      favoriteNumber: 1,
    }
  ).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post("/updateFavorite", (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.body._id, userFrom: req.body.userFrom },
    {
      favoriteNumber: req.body.favoriteNumber,
    }
  ).exec((err, result) => {
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
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
