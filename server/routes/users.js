const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const multer = require("multer");
const { Friend } = require("../models/Friend");
const path = require("path");

//STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/proFileImg/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});
var upload = multer({ storage: storage }).single("file");
router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uploadProFileImg", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body._id },
    {
      proFileImg: req.body.proFileImg,
    }
  ).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, result });
  });
});

router.post("/uploadFileImg", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body._id },
    {
      tempImg: req.body.tempImg,
    }
  ).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, result });
  });
});
router.get("/getVideos", (req, res) => {
  //비디오를 DB에서 가져와 클라이언트에 보낸다.
  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos });
    });
});
router.post("/register", (req, res) => {
  //회원 가입 할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
router.post("/getProFileImg", (req, res) => {
  User.findOne({ _id: req.body._id }).exec((err, user) => {
    if (err) return res.status(400).send(err);
    return res
      .status(200)
      .json({ success: true, proFileImg: user.proFileImg, userInfo: user });
  });
});

router.post("/login", (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      //비밀번호 까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //토큰을 저장한다. 어디에? -> 쿠키, 로컬스토리지 둘중 하나를 쓴다. 우리는 쿠키
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id, name: user.name });
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 True 라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

router.get("/logout", (req, res) => {
  User.find({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

router.post("/updateName", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body._id },
    { name: req.body.name },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.post("/getProFile", (req, res) => {
  User.find({ _id: req.body.userFrom }).exec((err, userInfo) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, userInfo });
  });
});

router.get("/getUsers", (req, res) => {
  User.find({ role: 0 }).exec((err, userInfo) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, userInfo });
  });
});

//친구 추가
router.post("/addFriend", (req, res) => {
  const friend = new Friend(req.body);

  friend.save((err, req) => {
    if (err) return res.json({ addSuccess: false, err });
    return res.status(200).json({
      addSuccess: true,
      req,
    });
  });
});
//친구 수 업데이트
router.post("/updateFriend", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body._id },
    {
      friends: req.body.friends,
    }
  ).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
