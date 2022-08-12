import { Button, Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProFileFriendAway() {
  const navigate = useNavigate();
  const [AwayName, setAwayName] = useState([]);
  const [AwayEmail, setAwayEmail] = useState([]);
  const [AwayFilePath, setAwayFilePath] = useState([]);
  const [Friends, setFriends] = useState([]);
  const [AwayUser, setAwayUser] = useState();
  const [AddFriendNumber, setAddFriendNumber] = useState();
  const myId = localStorage.getItem("userId");
  useEffect(() => {
    fetchFriendList();
  }, []);

  const fetchFriendList = () => {
    axios
      .post("/api/friends/getAwayList", {
        userFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) {
          setFriends(response.data.users);
          setAwayUser(response.data.users[0].myName);
          console.log(response.data.users);
          axios
            .post("/api/users/getProFile", {
              userFrom: AwayUser,
            })
            .then((response) => {
              if (response.data.success) {
                console.log(response.data.userInfo);
                setAwayName(response.data.userInfo[0].name);
                setAwayEmail(response.data.userInfo[0].email);
                setAwayFilePath(response.data.userInfo[0].proFileImg);
              } else {
                alert("친구 정보를 가져오는데 실패하였습니다.");
              }
            });
        } else {
          alert("친구 정보를 가져오는데 실패하였습니다.");
        }
      });
  };

  const renderCards = Friends.map((users, index) => {
    const profileImg = "http://localhost:5000/" + users.proFileImg;
    return (
      <>
        <Card
          key={index}
          title={users.AwayName}
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
            Email : {users.AwayEmail}
          </p>
          <center>
            <Link to={`/${AwayUser}`}>
              <Button>친구 정보</Button>
            </Link>
            <Button>차단</Button>
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

export default ProFileFriendAway;
