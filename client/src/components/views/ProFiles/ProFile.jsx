import { InfoCircleOutlined, OrderedListOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProFileUserPostList from "./commons/ProFileUserPostList";
import ProFileInfo from "./commons/ProFileInfo";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addFriendGo } from "../../../_actions/post_action";

function ProFile() {
  const profileId = useParams().profileId;
  const [Name, setName] = useState();
  const [Email, setEmail] = useState();
  const [ProfileImg, setProfileImg] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [AddFriendNumber, setAddFriendNumber] = useState();
  const [MyFriend, setMyFriend] = useState(0);
  const [OnUserPost, setOnPost] = useState(true);
  const [OnUserInfo, setOnUserInfo] = useState(false);
  const [OnPostList, setOnPostList] = useState(true);

  const MyName = localStorage.getItem("userId");

  const onMyInfo = () => {
    setOnUserInfo(true);
    setOnPost(false);
    setOnPostList(false);
  };
  const onMyPostList = () => {
    setOnPost(true);
    setOnPostList(true);
    setOnUserInfo(false);
  };

  useEffect(() => {
    fetchUserList();
    fetchMyUserList();
  }, []);
  const fetchUserList = () => {
    axios
      .post("/api/users/getProFile", { userFrom: profileId })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.userInfo);
          setName(response.data.userInfo[0].name);
          setEmail(response.data.userInfo[0].email);
          setProfileImg(response.data.userInfo[0].proFileImg);
        } else {
          alert("유저 정보를 가져오는데 실패하였습니다.");
        }
      });
  };
  const fetchMyUserList = () => {
    axios
      .post("/api/users/getProFile", {
        userFrom: MyName,
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.userInfo);
          setAddFriendNumber(response.data.userInfo[0].friends);
        } else {
          alert("유저 정보를 가져오는데 실패하였습니다.");
        }
      });
    axios
      .post("/api/friends/myFriend", {
        theyUser: profileId,
        myName: MyName,
      })
      .then((response) => {
        if (response.data.success) {
          setMyFriend(response.data.result[0].myFriend);
          console.log("mf", MyFriend);
        } else {
          alert("MyFriend를 가져오는데 실패했습니다.");
        }
      });
  };
  const onAddFriend = (event) => {
    event.preventDefault();
    if (MyFriend === 0) {
      let body = {
        theyUser: profileId,
        myName: MyName,
        friendName: Name,
        friendEmail: Email,
        friendProfileImg: ProfileImg,
      };
      dispatch(addFriendGo(body)).then((response) => {
        if (response.payload.addSuccess) {
          alert("친구 추가에 성공했습니다.");
          fetchMyUserList();
          console.log(response);
        } else {
          console.log(response.payload);
          alert("친구 추가에 실패했습니다.");
        }
      });
      axios
        .post("/api/users/updateFriend", {
          _id: MyName,
          friends: AddFriendNumber + 1,
        })
        .then((response) => {
          if (response.data.success) {
          }
        });
    }
  };

  const onClickDelete = () => {
    axios
      .post("/api/friends/removeFriend", {
        theyUser: profileId,
        myName: MyName,
      })
      .then((response) => {
        if (response.data.success) {
          alert("삭제되었습니다.");
          fetchMyUserList();
          console.log(response);
        } else {
          alert("리스트에서 지우는데 실패 했습니다.");
        }
      });
    axios
      .post("/api/users/updateFriend", {
        _id: MyName,
        friends: AddFriendNumber - 1,
      })
      .then((response) => {
        if (response.data.success) {
        }
      });
  };

  return (
    <div>
      <div
        // className={Container}
        style={{ marginLeft: "10%", marginRight: "10%" }}
      >
        <div
          style={{
            position: "absolute",
            width: "80%",
          }}
        >
          <div
            style={{
              borderRadius: "6px",
              boxShadow: "0.2px 0.2px 0.2px 0.2px gray",
              float: "right",
            }}
          >
            <div
              style={{
                width: "400px",
                height: "130px",
                marginTop: "2%",
                marginLeft: "2%",
                marginRight: "2%",
                marginBottom: "2%",
              }}
            >
              <div>방명록</div>
            </div>
          </div>
        </div>
        <Form>
          <div
            style={{
              width: "1000px",
              height: "100px",
              display: "flex",
              position: "relative",
              marginTop: "10px",
            }}
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
                  src={`http://localhost:5000/${ProfileImg}`}
                  alt="thumbnail"
                />
              </div>
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

                {MyFriend === 0 && (
                  <Button onClick={onAddFriend}>+친구 추가</Button>
                )}
                {MyFriend === 1 && (
                  <Button onClick={onClickDelete}>친구 추가됨</Button>
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
            <Button onClick={onMyInfo}>
              <InfoCircleOutlined />
              정보
            </Button>
            <Button onClick={onMyPostList}>
              <OrderedListOutlined /> 게시물
            </Button>
            <Button>
              <OrderedListOutlined /> 방명록
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
            <br />
            <br />
            {OnUserPost && <div>{OnPostList && <ProFileUserPostList />}</div>}
            {OnUserInfo && <div>{OnUserInfo && <ProFileInfo />}</div>}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ProFile;
