import { Button, Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

function ProFileFriendList() {
  const navigate = useNavigate();
  const [Friends, setFriends] = useState([]);
  const [AddFriendNumber, setAddFriendNumber] = useState();
  const myId = localStorage.getItem("userId");
  useEffect(() => {
    fetchFriendList();
  }, []);

  const fetchFriendList = () => {
    axios
      .post("/api/friends/getList", {
        userFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) {
          setFriends(response.data.users);
          console.log(response.data.users);
        } else {
          alert("친구 정보를 가져오는데 실패하였습니다.");
        }
      });
    axios
      .post("/api/users/getProFile", {
        userFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) {
          setAddFriendNumber(response.data.userInfo[0].friends);
        } else {
          alert("친구 정보를 가져오는데 실패하였습니다.");
        }
      });
  };

  const onClickDelete = (friendName, myName, theyUser) => {
    const variables = {
      friendName,
      myName,
      theyUser,
    };

    axios.post("/api/friends/removeFriend", variables).then((response) => {
      if (response.data.success) {
        fetchFriendList();
      } else {
        alert("리스트에서 지우는데 실패 했습니다.");
      }
    });
    axios
      .post("/api/users/updateFriend", {
        _id: myId,
        friends: AddFriendNumber - 1,
      })
      .then((response) => {
        if (response.data.success) {
        }
      });
  };

  const renderCards = Friends.map((friends, index) => {
    const profileImg = "http://localhost:5000/" + friends.friendProfileImg;
    return (
      <>
        <Card
          key={index}
          title={friends.friendName}
          extra={
            <label>
              {moment(friends.createdAt).format("M[월] D[일]")}에 추가함
            </label>
          }
          style={{
            borderRadius: "6px",
            width: "25%",
            boxShadow: "0.2px 0.2px 0.2px 0.2px gray",
            float: "left",
          }}
        >
          <p>
            <center>
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
            </center>
          </p>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Email : {friends.friendEmail}
          </p>
          <center>
            <Link to={`/${friends.theyUser}`}>
              <Button>친구 정보</Button>
            </Link>
            <Button
              onClick={() =>
                onClickDelete(
                  friends.friendName,
                  friends.myName,
                  friends.theyUser
                )
              }
            >
              친구 삭제
            </Button>
            <Button>친구 차단</Button>
          </center>
        </Card>
      </>
    );
  });

  return (
    <div>
      <style></style>
      <div style={{ width: "85" }}>
        <div>{renderCards}</div>
      </div>
    </div>
  );
}

export default ProFileFriendList;
