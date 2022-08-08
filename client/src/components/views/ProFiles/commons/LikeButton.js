import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function LikeButton(props) {
  const [Favorited, setFavorited] = useState("true");
  useEffect(() => {
    fetchPostList();
  }, []);

  const fetchPostList = () => {
    axios
      .post("/api/favoriteList/favorited", {
        userFrom: localStorage.getItem("userId"),
        postFrom: props.postFrom,
      })
      .then((response) => {
        setFavorited(response.data.favorited);
        console.log(response.data.favorited);
        console.log(props.postFrom);
      });
  };

  const onLiked = () => {
    axios
      .post("/api/favoriteList/removeFavorite", {
        postFrom: props.postFrom,
        userFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) {
          setFavorited(false);
          console.log(props.postFrom);
        }
      });
  };
  const onLike = () => {
    axios
      .post("/api/favoriteList/addToFavorite", {
        userFrom: localStorage.getItem("userId"),
        postFrom: props.postFrom,
        title: props.title,
        content: props.content,
      })
      .then((response) => {
        setFavorited(true);
      });
  };
  return (
    <div>
      <div style={{ width: "100%", display: "flex" }}>
        {Favorited && (
          <Button style={{ width: "100%", border: "none" }} onClick={onLiked}>
            <LikeFilled />
            좋아요
          </Button>
        )}
      </div>
      <div>
        {!Favorited && (
          <Button style={{ width: "100%", border: "none" }} onClick={onLike}>
            <LikeOutlined />
            좋아요
          </Button>
        )}
      </div>
    </div>
  );
}

export default LikeButton;
