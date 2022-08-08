import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import React, { useState } from "react";

function LikeButton(props) {
  const [Favorited, setFavorited] = useState(true);
  axios
    .post("/api/favoriteList/favorited", {
      userFrom: localStorage.getItem("userId"),
      postFrom: props.postFrom,
    })
    .then((response) => {
      setFavorited(response.data.favorited);
      console.log(response.data.favorited);
    });
  return (
    <div>
      <div style={{ width: "100%", display: "flex" }}>
        {Favorited && (
          <Button style={{ width: "100%", border: "none" }}>
            <LikeFilled />
            좋아요
          </Button>
        )}
      </div>
      <div>
        {!Favorited && (
          <Button style={{ width: "100%", border: "none" }}>
            <LikeOutlined />
            좋아요
          </Button>
        )}
      </div>
    </div>
  );
}

export default LikeButton;
