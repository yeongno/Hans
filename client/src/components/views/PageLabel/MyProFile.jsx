import {
  EditOutlined,
  HomeOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MyProFile() {
  const navigate = useNavigate();
  const onWrite = () => {
    navigate("/myProFile/PostPage");
  };
  return (
    <div
      style={{
        width: "300px",
        height: "100px",
        display: "flex",
      }}
    >
      <SolutionOutlined
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
        <span> ProFile</span>
      </div>
      <div
        style={{
          fontSize: "50px",
          marginTop: "8.5px",
          marginLeft: "1100px",

          color: "white",
        }}
      >
        <EditOutlined onClick={onWrite} />
      </div>
    </div>
  );
}

export default MyProFile;
