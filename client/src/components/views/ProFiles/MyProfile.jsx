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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { myProFile } from "../../../_actions/page_action";
import ProFileFavoriteList from "./commons/ProFileFavoriteList";
import ProFileFriendList from "./commons/ProFileFriendList";
import ProFilePictureList from "./commons/ProFilePictureList";
import ProFilePostList from "./commons/ProFilePostList";
import ModifyProFile from "./ModifyProFile";

function MyProFile() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const user = useSelector((state) => state.user);
  const [FriendNum, setFriendsNum] = useState("");
  const [FilePath, setFilePath] = useState("");
  const navigate = useNavigate();
  const [OnPost, setOnPost] = useState(false);
  const [OnPostList, setOnPostList] = useState(true);
  const [OnFavoritList, setOnFavoritList] = useState(false);
  const [OnInformation, setOnInformation] = useState(false);
  const [OnFriend, setOnFriend] = useState(false);
  const [OnPicture, setOnPictures] = useState(false);
  const page = useSelector((state) => state.page.currentPage);

  const dispatch = useDispatch();

  const onPostList = () => {
    setOnPictures(false);
    setOnInformation(false);
    setOnFriend(false);
    setOnPost(true);
  };
  const onMyPostList = () => {
    setOnPictures(false);
    setOnFavoritList(false);
    setOnFriend(false);
    setOnPostList(true);
  };
  const onMyFavoriteList = () => {
    setOnPictures(false);
    setOnPostList(false);
    setOnFriend(false);
    setOnFavoritList(true);
  };
  const onInfor = () => {
    setOnPictures(false);
    setOnPost(false);
    setOnFriend(false);
    setOnInformation(true);
  };

  const onFriend = () => {
    setOnPost(false);
    setOnInformation(false);
    setOnFriend(false);
    setOnPictures(false);
    setOnFriend(true);
  };

  const onPictures = () => {
    setOnPost(false);
    setOnInformation(false);
    setOnFriend(false);
    setOnPictures(true);
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
            }
          });
      } else {
        alert("비디오 업로드를 실패했습니다.");
      }
    });
  };
  useEffect(() => {
    setOnPost(true);
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
          dispatch(
            myProFile({
              page: "myProFile",
              FriendNum: response.data.userInfo[0].friends,
            })
          );
        } else {
          alert("유저 정보를 가져오는데 실패하였습니다.");
        }
      });

    // dispatch(myProFile({ page: "myProFile" }));
  };
  const onFriendNum = (event) => {
    setFriendsNum(event.currentTarget.value);
    setFriendsNum(page.FriendNum);
  };

  return (
    <div>
      <div style={{ marginLeft: "10%", marginRight: "10%" }}>
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
                {page.FriendNum && (
                  <Input
                    readOnly
                    style={{ width: "calc(99%)", border: "none" }}
                    placeholder="Name"
                    value={`친구 : ${page.FriendNum}명`}
                  />
                )}
                {!page.FriendNum && (
                  <Input
                    readOnly
                    style={{ width: "calc(99%)", border: "none" }}
                    placeholder="Name"
                    onChange={onFriendNum}
                    value={`친구 : ${page.FriendNum}명`}
                  />
                )}
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

            <Button onClick={onFriend}>
              <TeamOutlined />
              친구
            </Button>
            <Button onClick={onPictures}>
              <PictureOutlined />
              사진
            </Button>
            <Button onClick={onInfor}>
              <InfoCircleOutlined />
              정보
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

            <br />
            <br />
            {OnPost && (
              <div>
                <Button onClick={onMyPostList} style={{ width: "50%" }}>
                  MyPostList
                </Button>
                <Button onClick={onMyFavoriteList} style={{ width: "50%" }}>
                  FavoriteList
                </Button>{" "}
                {OnPostList && <ProFilePostList />}
              </div>
            )}
            {OnPost && <div>{OnFavoritList && <ProFileFavoriteList />}</div>}
            {OnInformation && <ModifyProFile />}
            {OnFriend && <ProFileFriendList />}
            {OnPicture && <ProFilePictureList />}
          </div>
        </Form>
      </div>
    </div>
  );
}
export default MyProFile;
