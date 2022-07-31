import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnePost, getPost } from "../../../_actions/post_action";

function DetailPost() {
  const postId = useParams().postId;
  const dispatch = useDispatch();
  const [Posts, setPosts] = useState([]);
  const [Title, setTitle] = useState();
  const [Content, setContent] = useState();
  const [UserFrom, setuserFrom] = useState();
  const [FavoriteNumber, setFavoriteNumber] = useState();
  const [Favorited, setFavorited] = useState(true);

  const variable = {
    userFrom: UserFrom,
    postFrom: postId,
    title: Title,
    content: Content,
  };
  useEffect(() => {
    fetchPostList();
  }, []);

  const fetchPostList = () => {
    dispatch(getOnePost({ _id: postId })).then((response) => {
      if (response.payload.success) {
        setPosts(response.payload.posts);
        setTitle(response.payload.posts[0].title);
        setContent(response.payload.posts[0].content);
        setuserFrom(response.payload.posts[0].userFrom);
        setFavoriteNumber(response.payload.posts[0].favoriteNumber);
      } else {
        alert("게시글 정보를 가져오는데 실패하였습니다.");
      }
    });
    axios
      .post("/api/favoriteList/favorited", {
        userFrom: window.localStorage.getItem("userId"),
        postFrom: postId,
      })
      .then((response) => {
        if (response.data.favorited === true) {
          setFavorited(true);
        } else if (response.data.favorited !== true) {
          setFavorited(false);
        }
      });
  };

  const onClickFavorite = () => {
    if (Favorited) {
      axios
        .post("/api/favoriteList/removeFavorite", variable)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(false);
          } else {
            alert("Favorite 리스트에서 지우는 걸 실패했습니다.");
          }
        });
      axios
        .post("/api/posts/updateFavorite", {
          _id: postId,
          userFrom: UserFrom,
          favoriteNumber: FavoriteNumber - 1,
        })
        .then((response) => {
          if (response.data.success) {
            console.log(`"지우기"${FavoriteNumber}`);
          }
        });
    } else if (!Favorited) {
      let variables = {
        userFrom: UserFrom,
        postFrom: postId,
        title: Title,
        content: Content,
      };
      axios
        .post("/api/favoriteList/addToFavorite", variables)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber + 1);
            setFavorited(true);
          } else {
            alert("Favorite 리스트에서 추가하는 걸 실패했습니다.");
          }
        });
      axios
        .post("/api/posts/updateFavorite", {
          _id: postId,
          userFrom: UserFrom,
          favoriteNumber: FavoriteNumber + 1,
        })
        .then((response) => {
          if (response.data.success) {
            console.log(`"추가하기 "${FavoriteNumber}`);
          }
        });
    }
  };
  return (
    <div>
      <hr />
      <div>
        <Button onClick={onClickFavorite}>
          {Favorited ? "Not Favorite  " : "Add to Favorite "}
          {FavoriteNumber}
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title : {Title} </th>
          </tr>
        </thead>
        <tbody>Content : {Content}</tbody>
      </table>
    </div>
  );
}
export default DetailPost;
