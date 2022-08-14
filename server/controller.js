const nodeMailer = require("nodemailer");

const mailPoster = nodeMailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "",
    pass: "",
  },
});

// 메일을 받을 유저 설정
const mailOpt = (user_data, title, contents) => {
  const mailOptions = {
    from: "",
    to: "",
    subject: "title",
    text: "contents",
  };

  return mailOptions;
};

// 메일 전송
const sendMail = (mailOption) => {
  mailPoster.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log("에러 " + error);
    } else {
      console.log("전송 완료 " + info.response);
    }
  });
};
module.exports = {
  needs: () => upload,
  api: {
    sendPw: (req, res) => {
      const body = req.body;
      const hash = hashing.enc(body.id, body.password, salt);

      model.api.searchInfo(body, hash, (result) => {
        var obj = {};
        if (result[0]) {
          obj["suc"] = result[0].dataValues;
          obj["msg"] = "로그인 성공";
          obj["ip"] = user_ip.address();
        } else {
          obj["suc"] = false;
          obj["msg"] = "로그인 실패";
        }
        res.send(obj);
      });
    },
  },

  search: {
    pw: (req, res) => {
      const body = req.body;

      model.search.pw(body, (result) => {
        var res_data = {};

        if (result[0]) {
          const title = "비밀번호 조회 인증에 대한 6자리 숫자입니다.";
          const contents = () => {
            let number = "";
            let random = 0;

            for (let i = 0; i < 6; i++) {
              random = Math.trunc(Math.random() * (9 - 0) + 0);
              number += random;
            }

            res_data["secret"] = number;
            return "인증 칸에 아래의 숫자를 입력해주세요. \n" + number;
          };

          // 조회되는 데이터가 있는 경우 (메일 전송)
          const mailOption = mailOpt(result[0].dataValues, title, contents());
          sendMail(mailOption);

          res_data["result"] = result;
          res.send(res_data);
        } else {
          // 데이터가 조회되지 않을 경우
          res.send(false);
        }
      });
    },
  },

  add: {
    board: (req, res) => {
      const body = req.body;

      model.add.board(body, (result) => {
        if (result) {
          res.send(true);
        }
      });
    },

    user: (req, res) => {
      const body = req.body;

      const hash_pw = hashing.enc(body.id, body.password, salt);

      model.add.user(body, hash_pw, now_date, (result) => {
        res.send(result);
      });
    },
  },
};
