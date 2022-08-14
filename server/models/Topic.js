const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = mongoose.Schema({
  type: {
    type: String,
    default: "TOPIC",
  },
  topicName: {
    type: String,
  },
  theNumber: {
    type: Number,
    default: 0,
  },
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = { Topic };
