const express = require("express");
const app = express();
const config = require("./config/key");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//파일 업로드 관련 모듈
const multer = require("multer"); //파일을 업로드할 수 있게 해주는 모듈
const path = require("path"); //경로 설정
const mime = require("mime-types"); //파일 타입 지정
const { v4: uuid } = require("uuid"); //고유 ID를 생성해 파일 중복을 방지해주는 모듈

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

app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/favorite", require("./routes/favorites"));
app.use("/api/favoriteList", require("./routes/favoriteList"));
app.use("/api/topics", require("./routes/topics"));
app.use("/api/friends", require("./routes/friends"));
app.use("/api/reply", require("./routes/reply"));
app.use("/api/visitorsBooks", require("./routes/visitorsBooks"));

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
