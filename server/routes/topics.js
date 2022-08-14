const express = require("express");
const router = express.Router();

const { Topic } = require("../models/Topic");

//Topic 불러오기
router.post("/getTopic", (req, res) => {
  Topic.find({ TOPIC: req.body.TOPIC }).exec((err, topics) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, topics });
  });
});
//Topic 삭제
router.post("/removeTopic", (req, res) => {
  Topic.findOneAndDelete({
    topic: req.body.topic,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});
router.post("/topic", (req, res) => {
  //Topic 등록

  const topic = new Topic(req.body);

  topic.save((err, req) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

module.exports = router;
