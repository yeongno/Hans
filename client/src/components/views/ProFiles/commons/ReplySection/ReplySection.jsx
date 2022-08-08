import { MessageOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function ReplySection(props) {
  const [replyOpen, setreplyOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const [FilePath, setFilePath] = useState("");
  const [UserImg, setUserImg] = useState("");
  const [UserName, setUserName] = useState("");
  const [Contentset, setContents] = useState("");
  const [OnReply, setOnReply] = useState(false);
  const userId = user.userData._id;
  const userName = user.userData.name;
  const onContentHandler = (event) => {
    setContents(event.currentTarget.value);
  };
  const onSubmit = () => {
    if (Contentset) {
      axios
        .post("/api/reply/setReply", {
          userFrom: userId,
          postFrom: props.postFrom,
          proFileImg: FilePath,
          userName,
        })
        .then((response) => {
          if (response.data.success) {
            console.log(response.data.req);
          }
        });
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);
  const fetchUserList = () => {
    axios
      .post("/api/users/getProFile", {
        userFrom: userId,
      })
      .then((response) => {
        if (response.data.success) {
          setFilePath(response.data.userInfo[0].proFileImg);
        } else {
          alert("유저 정보를 가져오는데 실패하였습니다.");
        }
      });
    axios
      .post("/api/reply/getReply", {
        postFrom: props.postFrom,
      })
      .then((response) => {
        if (response.data.req[0]) {
          console.log(response.data.req);
          setUserImg(response.data.req[0].proFileImg);
          setUserName(response.data.req[0].userName);
          setOnReply(true);
          console.log("req", response.data.req);
          console.log("postFrom", props.postFrom);
        } else {
          setOnReply(false);
          console.log("nope");
        }
      });
  };
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        height: "500px",
        overflowY: "scroll",
        overflowX: "none",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <div style={{ height: "86%" }}>
        {/* reply rendering zone */}
        <div>
          {OnReply && (
            <img
              style={{
                width: "5%",
                height: "5%",
                border: "1px solid lightgray",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50px",
                boxShadow: "1px 1px 1px 1px inset",
              }}
              src={`http://localhost:5000/${UserImg}`}
              alt="프로필"
            />
          )}
        </div>
      </div>
      <div
        // reply submit zone
        style={{
          display: "flex",
          width: "100%",
          marginLeft: "2%",
          marginRight: "2%",
        }}
      >
        <img
          style={{
            width: "5%",
            height: "5%",
            border: "1px solid lightgray",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50px",
            boxShadow: "1px 1px 1px 1px inset",
          }}
          src={`http://localhost:5000/${FilePath}`}
          alt="프로필"
        />
        <Input
          style={{ width: "80%", borderRadius: "10px" }}
          placeholder="댓글을 입력하세요"
          onChange={onContentHandler}
          onPressEnter={onSubmit}
          value={Contentset}
        />
      </div>
      <span style={{ marginLeft: "8%" }}>
        글을 게시하려면 Enter 키를 누르세요.
      </span>
    </div>
  );
}
export default ReplySection;
