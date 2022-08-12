import { EditOutlined, HomeOutlined, KeyOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "300px",
        height: "100px",
        display: "flex",
      }}
    >
      <KeyOutlined
        height={"100px"}
        style={{
          fontSize: "50px",
          color: "white",
          marginTop: "20px",
          marginLeft: "150px",
        }}
      />{" "}
      <div
        style={{
          fontSize: "50px",
          marginTop: "8.5px",
          marginLeft: "20px",
          color: "white",
        }}
      >
        <span>Login</span>
      </div>
    </div>
  );
}

export default Login;
