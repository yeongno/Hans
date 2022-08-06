import { OrderedListOutlined } from "@ant-design/icons";
import { Button, Menu, Upload } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function ProFilePostList(props) {
  const [Posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPostList();
  }, []);

  const fetchPostList = () => {
    axios
      .post("/api/posts/getOnePost", {
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

  // 해당 기능은 상세페이지에서 구현
  const onClickDelete = (title, userFrom, postFrom) => {
    const variables = {
      title,
      userFrom,
      postFrom,
    };

    axios.post("/api/posts/removePost", variables).then((response) => {
      if (response.data.success) {
        fetchPostList();
      } else {
        alert("리스트에서 지우는데 실패 했습니다.");
      }
    });
    axios
      .post("/api/favoriteList/removeFavorites", variables)
      .then((response) => {
        console.log(variables);
      });
  };

  const renderCards = Posts.map((posts, index) => {
    return (
      <tr key={index}>
        <td>{posts.title}</td>
        <td>{posts.content} </td>
        <td>
          {/* <button onClick={() => onClickArticle(posts.title, posts.userFrom)}> */}
          <Link to={`/postPage/${posts._id}`}>
            <button>글 보기 </button>
          </Link>
          {/* </button> */}
          <button
            onClick={() =>
              onClickDelete(posts.title, posts.userFrom, posts._id)
            }
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div style={{ width: "85" }}>
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

export default ProFilePostList;
