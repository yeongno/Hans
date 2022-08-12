import { Button, Col, Input, Menu, Upload } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FavoriteList from "./FavoriteLanderingSection/FavoriteList";

function ProFileFavoriteList(props) {
  const [FilePath, setFilePath] = useState("");
  const [Posts, setPosts] = useState([]);
  const [Ondefault, setdefault] = useState(false);
  const user = useSelector((state) => state.user);
  const [replyOpen, setreplyOpen] = useState(false);
  const onReply = () => {
    setreplyOpen(true);
  };
  useEffect(() => {
    fetchPostList();
  }, []);

  const fetchPostList = () => {
    axios
      .post("/api/favoriteList/getList", {
        userFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) {
          setPosts(response.data.posts);
          // console.log(Posts[0]);
        } else {
          alert("게시글 정보를 가져오는데 실패하였습니다.");
        }
      });
  };
  // const onOption = () => {};

  // // 해당 기능은 상세페이지에서 구현
  // const onClickDelete = (title, userFrom, postFrom) => {
  //   const variables = {
  //     title,
  //     userFrom,
  //     postFrom,
  //   };

  //   axios.post("/api/posts/removePost", variables).then((response) => {
  //     if (response.data.success) {
  //       fetchPostList();
  //     } else {
  //       alert("리스트에서 지우는데 실패 했습니다.");
  //     }
  //   });
  //   axios
  //     .post("/api/favoriteList/removeFavorites", variables)
  //     .then((response) => {
  //        .log(variables);
  //     });
  // };
  // const onClickLike = (id) => {
  //    .log(id);
  // };
  // const [Favorited, setFavorited] = useState(0);

  const renderCards = Posts.map((posts, index) => {
    return (
      <Col key={index}>
        <div>
          <FavoriteList postFrom={posts.postFrom} userFrom={posts.userFrom} />
        </div>
      </Col>
    );
  });

  return (
    <div>
      <div>{renderCards}</div>
    </div>
  );
}

export default ProFileFavoriteList;
