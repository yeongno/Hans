import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import Regist from "./Register.module.css";
import logo from "../../../logo.svg";

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

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
      <Form className={Regist.frm} onSubmit={onSubmitHandler}>
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
          <a href="#!" className={Regist.emailck}>
            <span class="">인증</span>
          </a>
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
        <Button type="submit" className={Regist.regi}>
          회원가입
        </Button>
      </Form>
    </div>
  );
}

export default RegisterPage;
