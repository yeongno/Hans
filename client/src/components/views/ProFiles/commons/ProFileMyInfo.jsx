import { Button, Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProFileMyInfo() {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [FriendNum, setFriendsNum] = useState("");
  const [FilePath, setFilePath] = useState("");
  const [CreatedAt, setCreatedAt] = useState("");
  const [UpdatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = () => {
    axios
      .post("/api/users/getProFile", {
        userFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) {
          setName(response.data.userInfo[0].name);
          setEmail(response.data.userInfo[0].email);
          setFilePath(response.data.userInfo[0].proFileImg);
          setFriendsNum(response.data.userInfo[0].friends);
          setCreatedAt(response.data.userInfo[0].createdAt.substr(0, 10));
          setUpdatedAt(response.data.userInfo[0].updatedAt.substr(0, 10));
        } else {
          alert("유저 정보를 가져오는데 실패하였습니다.");
        }
      });
  };

  return (
    <div>
      <div style={{ width: "85" }}>
        <Card
          title={`${Name}`}
          style={{
            width: "100%",
            borderRadius: "7px",
          }}
        >
          <p>
            <img
              style={{
                width: "200px",
                height: "200px",
                border: "1px solid lightgray",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "1px 1px 1px 1px inset",
              }}
              src={`http://localhost:5000/${FilePath}`}
              alt="thumbnail"
            />
          </p>
          <p>Name : {`${Name}`}</p>
          <p>Email : {`${Email}`}</p>
          <p>생성일 : {`${CreatedAt}`}</p>
          <p>최근수정일 : {`${UpdatedAt}`}</p>
        </Card>
      </div>
    </div>
  );
}

export default ProFileMyInfo;
