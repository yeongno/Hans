const { User } = require("../models/User");
const { smtpTransport } = require("../config/email");

/* min ~ max까지 랜덤으로 숫자를 생성하는 함수 */
var generateRandom = function (min, max) {
  var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return ranNum;
};

let auth = (req, res, next) => {
  //인증 처리를 하는 곳
  SendEmail: async (req, res) => {
    const number = generateRandom(111111, 999999);

    const { sendEmail } = req.body;

    const mailOptions = {
      from: "ㅁㄴㅇㄹ",
      to: sendEmail,
      subject: "인증 관련 이메일 입니다",
      text: "오른쪽 숫자 6자리를 입력해주세요 : " + number,
    };

    const result = await smtpTransport.sendMail(
      mailOptions,
      (error, responses) => {
        if (error) {
          return res
            .status(statusCode.OK)
            .send(
              util.fail(statusCode.BAD_REQUEST, responseMsg.AUTH_EMAIL_FAIL)
            );
        } else {
          /* 클라이언트에게 인증 번호를 보내서 사용자가 맞게 입력하는지 확인! */
          return res.status(statusCode.OK).send(
            util.success(statusCode.OK, responseMsg.AUTH_EMAIL_SUCCESS, {
              number: number,
            })
          );
        }
      }
    );
  };
  //클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;

  //토큰을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
  });

  //유저가 있으면 인증 Okay

  //유저가 없으면 인증 No
};

module.exports = { auth };
