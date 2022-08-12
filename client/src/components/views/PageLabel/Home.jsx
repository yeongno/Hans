import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const onWrite = () => {
    navigate("/PostPage");
  };
  return (
    <div
      style={{
        width: "300px",
        height: "100px",
        display: "flex",
      }}
    >
      <HomeOutlined
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
        <span>HOME</span>
      </div>
      <div
        style={{
          fontSize: "50px",
          marginTop: "8.5px",
          marginLeft: "940px",

          color: "white",
        }}
      >
        <EditOutlined onClick={onWrite} />
      </div>
    </div>
  );
}

export default Home;
