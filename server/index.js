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
//파일 업로드 코드
const storage = multer.diskStorage({
  //파일 업로드 경로 설정
  destination: (req, file, cb) => {
    cb(null, "/Web/material-dashboard-react-main/client/public/images");
    //경로 지정(절대 경로 사용, 상대 경로도 되기는 하나 안정적으로 쓰기 위해 절대 경로로 설정했습니다.)
    //절대 경로 사용시 드라이브 명칭(C:/, D:/ 등)은 제외하고 넣으셔야 합니다.
    //파일 업로드 경로는 가능한 public폴더 내에 있는 폴더에 지정하는게 좋습니다.
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`);
    //업로드되는 파일에 고유 ID를 생성합니다.(파일 중복 방지)
  },
});
//파일 업로드 변수
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    //파일 형식 제한(해당 코드는 특정 이미지만 업로드 되게 설정함)
    if (["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype))
      cb(null, true);
    else cb(new Error("해당 파일의 형식을 지원하지 않습니다."), false);
  },
  //파일 용량 제한
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
//파일 업로드를 요청하는 API(POST 방식)
//upload.single("file") <- 단일 파일
//upload.array("file") <- 다중 파일
app.post("/api/posts/upload", upload.single("file"), (req, res) => {
  const { file } = req;
  console.log("File", file);
  res.status(200).json(req.file);
});
//images 폴더 내의 파일들을 외부로 노출 시켜주기위한 미들웨어.
app.use("/images", express.static(path.join(__dirname, "/images")));

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
