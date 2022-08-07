const express = require("express");
const router = express.Router();
const { FavoriteList } = require("../models/FavoriteList");

router.post("/addToFavorite", (req, res) => {
  const Favoritelist = new FavoriteList(req.body);

  Favoritelist.save((err, req) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, req });
  });
});

router.post("/removeFavorite", (req, res) => {
  FavoriteList.findOneAndDelete({
    postFrom: req.body.postFrom,
    userFrom: req.body.userFrom,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post("/getList", (req, res) => {
  FavoriteList.find({ userFrom: req.body.userFrom }).exec((err, posts) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, posts });
  });
});

router.post("/favorited", (req, res) => {
  FavoriteList.find({
    userFrom: req.body.userFrom,
    postFrom: req.body.postFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    let result = true;
    if (info.length === 0) {
      result = false;
    }
    return res.status(200).json({ success: true, favorited: result });
  });
});

router.post("/removeFavorites", (req, res) => {
  FavoriteList.deleteMany({
    postFrom: req.body.postFrom,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
