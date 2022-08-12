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
import ProFileFriendList from "./commons/ProFileFriendList";
import ProFileFriendAway from "./commons/ProFileFriendAway";
import ProFileMyInfo from "./commons/ProFileMyInfo";

function MyProFile() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Friends, setFriends] = useState("");
  const [FriendNum, setFriendsNum] = useState("");
  const user = useSelector((state) => state.user);

  const [FilePath, setFilePath] = useState("");
  const navigate = useNavigate();
  const [OnPost, setOnPost] = useState(false);
  const [OnFriends, setOnFriends] = useState(false);
  const [OnMyInfo, setOnMyInfo] = useState(true);
  const [OnMyFriends, setOnMyFriends] = useState(false);
  const [OnAwayFriends, setOnAwayFriends] = useState(false);
  const [OnMyBanFriends, setOnMyBanFriends] = useState(false);
  const [OnPostList, setOnPostList] = useState(false);
  const [OnFavoritList, setOnFavoritList] = useState(false);

  const onPostList = () => {
    setOnMyInfo(false);
    setOnPostList(true);
    setOnPost(true);
    setOnFriends(false);
    setOnMyFriends(false);
  };
  const onMyInfo = () => {
    setOnMyInfo(true);
    setOnPost(false);
    setOnFriends(false);
    setOnMyFriends(false);
  };
  const onMyPostList = () => {
    setOnMyInfo(false);
    setOnFavoritList(false);
    setOnPostList(true);
    setOnMyFriends(false);
  };
  const onMyFavoriteList = () => {
    setOnMyInfo(false);
    setOnPostList(false);
    setOnFavoritList(true);
    setOnMyFriends(false);
  };
  const onFriends = () => {
    setOnMyInfo(false);
    setOnFriends(true);
    setOnMyFriends(true);
    setOnPostList(false);
    setOnFavoritList(false);
    setOnMyBanFriends(false);
    setOnPost(false);
  };

  const onAwayFriends = () => {
    setOnMyInfo(false);
    setOnMyFriends(false);
    setOnAwayFriends(true);
    setOnMyBanFriends(false);
    setOnPost(false);
  };

  const onMyFriends = () => {
    setOnMyInfo(false);
    setOnMyFriends(true);
    setOnAwayFriends(false);
    setOnMyBanFriends(false);
    setOnPost(false);
  };

  const onMyBanFriends = () => {
    setOnMyInfo(false);
    setOnMyFriends(false);
    setOnAwayFriends(false);
    setOnMyBanFriends(true);
    setOnPost(false);
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
          setFriendsNum(response.data.userInfo[0].friends);
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
                  value={`${Name}`}
                />
                <br />
                <Input
                  readOnly
                  style={{ width: "calc(99%)", border: "none" }}
                  placeholder="Name"
                  value={`친구 : ${FriendNum}명`}
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
            <Button onClick={onMyInfo}>
              <InfoCircleOutlined />
              정보
            </Button>
            <Button onClick={onFriends}>
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
            {OnFriends === true && (
              <>
                <Button onClick={onMyFriends} style={{ width: "50%" }}>
                  친구 목록
                </Button>
                <Button onClick={onMyFavoriteList} style={{ width: "50%" }}>
                  차단 친구 관리
                </Button>
              </>
            )}
            {OnPost === true && (
              <>
                <Button onClick={onMyPostList} style={{ width: "50%" }}>
                  MyPostList
                </Button>
                <Button onClick={onMyFavoriteList} style={{ width: "50%" }}>
                  FavoriteList
                </Button>
              </>
            )}
            <br />
            <br />
            {OnPost && <div>{OnPostList && <ProFilePostList />}</div>}
            {OnPost && <div>{OnFavoritList && <ProFileFavoriteList />}</div>}
            {OnFriends && <div>{OnMyFriends && <ProFileFriendList />}</div>}
            {OnFriends && <div>{OnAwayFriends && <ProFileFriendAway />}</div>}
            {OnFriends && <div>{OnMyBanFriends && <ProFileFriendList />}</div>}
            {OnMyInfo && <div>{OnMyInfo && <ProFileMyInfo />}</div>}
          </div>
        </Form>
      </div>
    </div>
  );
}
export default MyProFile;
