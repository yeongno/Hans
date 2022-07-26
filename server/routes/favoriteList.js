const express = require("express");
const router = express.Router();
const { FavoriteList } = require("../models/FavoriteList");

router.post("/addToFavorite", (req, res) => {
  const Favoritelist = new FavoriteList(req.body);

  Favoritelist.save((err, req) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post("/removeFavorite", (req, res) => {
  FavoriteList.findOneAndDelete({
    postFrom: req.body.postFrom,
    userFrom: req.body.userFrom,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, result });
  });
});

module.exports = router;
