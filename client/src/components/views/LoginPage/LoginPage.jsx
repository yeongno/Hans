// import { Axios } from "axios";
// import { response } from 'express'
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { Link, useNavigate } from "react-router-dom";

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
      window.localStorage.setItem("name", response.payload.name);
      if (response.payload.loginSuccess) {
        navigate("/");
      } else {
        alert("Error");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <label>Not a member?</label>
        <Link to="/register">Register</Link>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
