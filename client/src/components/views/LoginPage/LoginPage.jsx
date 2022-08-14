import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../_actions/page_action";
import loginPage from "./LoginPage.module.css";
import { Button } from "antd";

import {
  RightSquareOutlined,
  BorderOuterOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
function LoginPage(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  useEffect(() => {
    dispatch(login({ page: "login" }));
    console.log("los");
  }, []);

  dispatch(login({ page: "login" }));

  const navigate = useNavigate();
  const onRegister = () => {
    navigate("/register");
  };
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
      window.localStorage.setItem("name", response.payload.name);
      if (response.payload.loginSuccess) {
        navigate("/homeSection");
        window.location.reload();
      } else {
        alert("Error");
      }
    });
  };
  return (
    <div className={loginPage.wrapper}>
      <div className={loginPage.lwrap}>
        <ul className={loginPage.login_type}>
          <Button className={loginPage.bt1}>
            <RightSquareOutlined />
            ID 로그인
          </Button>
          <Button className={loginPage.bt2}>
            <BorderOuterOutlined /> 1회용 로그인
          </Button>
          <Button className={loginPage.bt3}>
            <QrcodeOutlined />
            QR코드
          </Button>
        </ul>
        <div className={loginPage.loginfrm}>
          <form className={loginPage.form} onSubmit={onSubmitHandler}>
            <input
              type="email"
              value={Email}
              onChange={onEmailHandler}
              placeholder="이메일"
              className={loginPage.email}
            />
            <input
              type="password"
              value={Password}
              onChange={onPasswordHandler}
              placeholder="비밀번호"
              className={loginPage.password}
            />
            <br />
            <button className={loginPage.lobb} type="submit">
              로그인
            </button>
            <button className={loginPage.lobb} onClick={onRegister}>
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
