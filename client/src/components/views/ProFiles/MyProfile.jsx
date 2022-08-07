import {
  CameraOutlined,
  InfoCircleOutlined,
  OrderedListOutlined,
  PictureOutlined,
  PlaySquareOutlined,
  SyncOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProFileFavoriteList from "./commons/ProFileFavoriteList";
import ProFilePostList from "./commons/ProFilePostList";

function MyProFile() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const user = useSelector((state) => state.user);

  const [FilePath, setFilePath] = useState("");
  const navigate = useNavigate();
  const [OnPost, setOnPost] = useState(false);
  const [OnPostList, setOnPostList] = useState(true);
  const [OnFavoritList, setOnFavoritList] = useState(false);

  const onPostList = () => {
    setOnPost(true);
  };
  const onMyPostList = () => {
    setOnFavoritList(false);
    setOnPostList(true);
  };
  const onMyFavoriteList = () => {
    setOnPostList(false);
    setOnFavoritList(true);
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
        style={{ marginLeft: "10%", marginRight: "10%" }}
      >
        <Form>
          <div
            style={{
              width: "1000px",
              height: "100px",
              display: "flex",
              position: "relative",
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
                      boxShadow: "1px 1px 1px 1px inset",
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
                      icon={<CameraOutlined />}
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
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "190px",
                  marginTop: "15px",
                }}
              >
                <Input
                  readOnly
                  style={{
                    width: "calc(99%)",
                    fontSize: "17px",
                    border: "none",
                  }}
                  placeholder="Name"
                  value={`이름 : ${Name}`}
                />
                <br />
                <Input
                  readOnly
                  style={{ width: "calc(99%)", border: "none" }}
                  placeholder="Name"
                  value={`친구 : ${Name}명`}
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
            }}
          >
            <br />
            <Button onClick={onPostList}>
              <OrderedListOutlined /> 게시물
            </Button>
            <Button>
              <InfoCircleOutlined />
              정보
            </Button>
            <Button>
              <TeamOutlined />
              친구
            </Button>
            <Button>
              <PictureOutlined />
              사진
            </Button>
            <Button>
              <PlaySquareOutlined />
              동영상
            </Button>
          </div>
          <div
            style={{
              width: "100%",
              height: "100px",
              // display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div></div>
            <Button onClick={onMyPostList} style={{ width: "50%" }}>
              MyPostList
            </Button>
            <Button onClick={onMyFavoriteList} style={{ width: "50%" }}>
              FavoriteList
            </Button>
            <br />
            <br />
            {OnPost && <div>{OnPostList && <ProFilePostList />}</div>}
            {OnPost && <div>{OnFavoritList && <ProFileFavoriteList />}</div>}
          </div>
        </Form>
      </div>
    </div>
  );
}
export default MyProFile;
