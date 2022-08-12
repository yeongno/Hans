import {
  EditOutlined,
  HomeOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";

function ProFile() {
  const page = useSelector((state) => state.page.currentPage);

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
        <span>{page.name}'s ProFile</span>
      </div>
    </div>
  );
}

export default ProFile;
