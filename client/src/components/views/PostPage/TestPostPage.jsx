// import { Axios } from "axios";
// import { response } from 'express'
import logins from "./TestPostPage.module.css";
import {
  RightSquareOutlined,
  BorderOuterOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";
function TestPostPage(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const navigate = useNavigate();
  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log("Email", Email);
    console.log("Password", Password);

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      window.localStorage.setItem("userId", response.payload.userId);
      if (response.payload.loginSuccess) {
        navigate("/");
      } else {
        alert("Error");
      }
    });
  };
  return (
    <div className={logins.wrapper}>
      <div className={logins.lwrap}>
        <ul className={logins.login_type}>
          <Button className={logins.bt1}>
            <RightSquareOutlined />
            ID 로그인
          </Button>
          <Button className={logins.bt2}>
            <BorderOuterOutlined /> 1회용 로그인
          </Button>
          <Button className={logins.bt3}>
            <QrcodeOutlined />
            QR코드
          </Button>
        </ul>
        <div className={logins.loginfrm}>
          <form className={logins.form} onSubmit={onSubmitHandler}>
            <input
              type="email"
              value={Email}
              onChange={onEmailHandler}
              placeholder="이메일"
              className={logins.email}
            />
            <input
              type="password"
              value={Password}
              onChange={onPasswordHandler}
              placeholder="비밀번호"
              className={logins.password}
            />
            <br />
            <button className={logins.lobb} type="submit">
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TestPostPage;
