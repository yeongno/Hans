import { SyncOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProFilePostList from "./commons/ProFilePostList";

function MyProFile() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const user = useSelector((state) => state.user);

  const [FilePath, setFilePath] = useState("");
  const navigate = useNavigate();
  const [OnPost, setOnPost] = useState(false);
  const [Posts, setPosts] = useState([]);

  const onPostList = () => {
    setOnPost(true);
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/users/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        setFilePath(response.data.url);
        const proFileImg = response.data.url;
        axios
          .post("/api/users/uploadProFileImg", {
            _id: localStorage.getItem("userId"),
            proFileImg: proFileImg,
          })
          .then((response) => {
            if (response.data.success) {
              console.log(response.data.result);
            }
          });
      } else {
        alert("비디오 업로드를 실패했습니다.");
      }
    });
  };
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
        } else {
          alert("유저 정보를 가져오는데 실패하였습니다.");
        }
      });
  };

  return (
    <div>
      <div
        // className={Container}
        style={{ marginLeft: "10%" }}
      >
        <Form>
          <div
            style={{
              width: "1000px",
              height: "100px",
              display: "flex",
              position: "relative",
              backgroundColor: "blue",
              marginTop: "10px",
            }}
            // className={topContainer}
          >
            {/* Drop Zone */}
            <div
              style={{
                width: "100px",
                height: "100px",
                display: "flex",
                justifyContent: "center",
                position: "relative",
                backgroundColor: "black",
              }}
              // className={top.dropZone}
            >
              {FilePath && (
                <div>
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      border: "1px solid lightgray",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50px",
                    }}
                    src={`http://localhost:5000/${FilePath}`}
                    alt="thumbnail"
                  />
                </div>
              )}
              <Dropzone onDrop={onDrop} multiple={false} maxSize={10000000}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      top: "67%",
                      left: "67%",
                      opacity: "75%",
                    }}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <Button
                      icon={<SyncOutlined />}
                      style={{ fontSize: "3rem" }}
                    />
                  </div>
                )}
              </Dropzone>
            </div>
            <div
              style={{
                position: "relative",
                width: "200px",
                background: "red",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "190px",
                  background: "yellow",
                }}
              >
                <Input
                  style={{ width: "calc(50%)" }}
                  placeholder="Name"
                  value={`이름 : ${Name}`}
                />
                <br />
                <Input
                  style={{ width: "calc(50%)" }}
                  placeholder="Name"
                  value={`친구 : ${Name}`}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              width: "1000px",
              height: "50px",
              // justifyContent: "space-between",
              position: "relative",
              backgroundColor: "yellow",
            }}
          >
            <hr />
            <Button onClick={onPostList}>게시물</Button>
            <Button>정보</Button>
            <Button>친구</Button>
            <Button>사진</Button>
            <Button>동영상</Button>
            <hr />
          </div>{" "}
          <div
            style={{
              width: "1000px",
              height: "100px",
              // display: "flex",
              // justifyContent: "space-between",
              position: "relative",
              backgroundColor: "red",
            }}
          >
            {OnPost && <ProFilePostList />}
          </div>
        </Form>
      </div>
    </div>
  );
}
export default MyProFile;
