import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import logo from "../../../logo.svg";
import axios from "axios";
import Regist from "./RegisterPage.module.css";
import { home, register } from "../../../_actions/page_action";
//이메일 인증 관련 모듈 설치
//npm install nodemailer --save

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    dispatch(register({ page: "Register" }));
  }, []);

  //-------------------------------------------------
  const _searchPassword = async function () {
    const user_email = Email;

    const obj = { user_email: user_email };
    const res = await axios("/search/pw", {
      method: "POST",
      data: obj,
      headers: new Headers(),
    });

    alert(Email + "의 주소로 \n6자리의 숫자코드가 수신되었습니다.");
    return this.setState({
      result: true,
      secret: res.data.secret,
      user_data: res.data.result[0],
    });
  };
  //--------------------------------------------------
  const sendEmail = () => {
    axios
      .post("/api/users/sendEmail", {
        user_email: Email,
      })
      .then((response) => {
        if (response.data.success) {
        } else {
          alert("유저 정보를 가져오는데 실패하였습니다.");
        }
      });
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const navigate = useNavigate();
  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log("Email", Email);
    console.log("Password", Password);

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }
    let body = {
      email: Email,
      password: Password,
      name: Name,
      proFileImg: "uploads/postImg/default-profile-img.png",
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert("Failed to sign up");
      }
    });
  };
  const onSubmit = () => {
    console.log("Email", Email);
    console.log("Password", Password);

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }
    let body = {
      email: Email,
      password: Password,
      name: Name,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert("Failed to sign up");
      }
    });
  };
  return (
    <div className={Regist.wrapper}>
      <form className={Regist.frm} onSubmit={onSubmitHandler}>
        <img className={Regist.png} src={logo} />
        <span style={{ fontWeight: "bold" }}>Email</span>
        <div className={Regist.check}>
          <Input
            type="email"
            value={Email}
            onChange={onEmailHandler}
            placeholder="이메일"
            className={Regist.email}
          />
          <div className={Regist.emailck}>
            <span class="" onClick={() => _searchPassword()}>
              인증
            </span>
          </div>
        </div>
        <span style={{ fontWeight: "bold" }}>Name</span>
        <Input
          type="text"
          value={Name}
          onChange={onNameHandler}
          placeholder="이름"
          className={Regist.name}
        />
        <span style={{ fontWeight: "bold" }}>Password</span>
        <Input
          type="password"
          value={Password}
          onChange={onPasswordHandler}
          placeholder="비밀번호"
          className={Regist.pwd}
        />
        <span style={{ fontWeight: "bold" }}>Confirm Password</span>
        <Input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmHandler}
          placeholder="비밀번호 확인"
          className={Regist.pwdcheck}
        />
        <br />
        <Button className={Regist.regi} onClick={onSubmit}>
          회원가입
        </Button>
      </form>
    </div>
  );
}

export default RegisterPage;
