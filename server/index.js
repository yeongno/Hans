const express = require("express");
const app = express();
const config = require("./config/key");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//aplication/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");

const connect = mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/favorite", require("./routes/favorites"));
app.use("/api/favoriteList", require("./routes/favoriteList"));
app.use("/api/users", require("./routes/users"));
app.use("/api/video", require("./routes/video"));
app.use("/api/reply", require("./routes/reply"));
app.use("/api/friends", require("./routes/friends"));

//static files path of polder
app.use("/uploads", express.static("uploads"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// app.listen(process.env.PORT || 3000, function () {
//   console.log(
//     "Express server listening on port %d in %s mode",
//     this.address().port,
//     app.settings.env
//   );
// });
