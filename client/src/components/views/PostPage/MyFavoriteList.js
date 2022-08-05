import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MyFavoriteList() {
  const navigate = useNavigate();
  const goPost = () => {
    navigate("/postPage");
  };
  const [Posts, setPosts] = useState([]);
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
          console.log(Posts[0]);
        } else {
          alert("게시글 정보를 가져오는데 실패하였습니다.");
        }
      });
  };

  const onClickDelete = (title, userFrom, postFrom) => {
    const variables = {
      title,
      userFrom,
      postFrom,
    };

    axios
      .post("/api/favoriteList/removeFavorite", variables)
      .then((response) => {
        if (response.data.success) {
          fetchPostList();
        } else {
          alert("리스트에서 지우는데 실패 했습니다.");
        }
      });
  };

  const renderCards = Posts.map((posts, index) => {
    console.log(posts);
    return (
      <tr key={index}>
        <td>{posts.title}</td>
        <td>{posts.content} </td>
        <td>
          <Button
            onClick={() =>
              onClickDelete(posts.title, posts.userFrom, posts.postFrom)
            }
          >
            remove
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <Button onClick={goPost}>게시글 작성</Button>
      <div style={{ width: "85", margin: "3rem auto" }}>
        <h2>My Favorite List</h2>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Remove from Articles</th>
            </tr>
          </thead>
          <tbody>{renderCards}</tbody>
        </table>
      </div>
    </div>
  );
}

export default MyFavoriteList;
