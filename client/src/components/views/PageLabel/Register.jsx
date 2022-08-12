import {
  EditOutlined,
  FormOutlined,
  HomeOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";

function Register() {
  const page = useSelector((state) => state.page.currentPage);

  return (
    <div
      style={{
        width: "300px",
        height: "100px",
        display: "flex",
      }}
    >
      <FormOutlined
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
        <span>Register</span>
      </div>
    </div>
  );
}

export default Register;
