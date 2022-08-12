import { Button, Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

  const myName = localStorage.getItem("userId");
  const onAddFriend = (event) => {
    event.preventDefault();
    let body = {
      theyUser: profileId,
      myName: myName,
      friendName: Name,
      friendEmail: Email,
      friendProfileImg: ProfileImg,
    };
    dispatch(addFriendGo(body)).then((response) => {
      if (response.payload.addSuccess) {
        alert("친구 추가에 성공했습니다.");
        console.log(response);
      } else {
        console.log(response.payload);
        alert("친구 추가에 실패했습니다.");
      }
    });
  };

  const goUserList = () => {
    navigate("/ProfileList");
  };
  useEffect(() => {
    fetchUserList();
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
  const profileImg = "http://localhost:5000/" + ProfileImg;
  return (
    <div>
      <hr />
      <Card
        title={Name}
        style={{
          borderRadius: "6px",
          width: "100%",
          boxShadow: "0.2px 0.2px 0.2px 0.2px gray",
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
            src={profileImg}
            alt="thumbnail"
          />
        </p>
        <p>Name : {Name}</p>
        <p>Email : {Email}</p>
        <Button onClick={onAddFriend}>친구 추가</Button>
        <Button>차단</Button>
        <Button onClick={goUserList}>유저목록</Button>
      </Card>
    </div>
  );
}
export default ProFile;
