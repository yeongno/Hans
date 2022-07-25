import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPost } from "../../../_actions/post_action";

function PostList() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const goPost = () => {
    navigate("/postPage");
  };
  const [Posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPostList();
  }, []);

  // const fetchPostList = () => {
  //   axios
  //     .post("/api/posts/getPost", {
  //       userFrom: localStorage.getItem("userId"),
  //     })
  //     .then((response) => {
  //       if (response.data.success) {
  //         setPosts(response.data.posts);
  //       } else {
  //         alert("게시글 정보를 가져오는데 실패하였습니다.");
  //       }
  //     });
  // };

  const fetchPostList = () => {
    dispatch(getPost({ userFrom: localStorage.getItem("userId") })).then(
      (response) => {
        if (response.payload.success) {
          setPosts(response.payload.posts);
        } else {
          alert("게시글 정보를 가져오는데 실패하였습니다.");
        }
      }
    );
  };

  const onClickDelete = (title, userFrom) => {
    const variables = {
      title,
      userFrom,
    };

    axios.post("/api/posts/removePost", variables).then((response) => {
      if (response.data.success) {
        fetchPostList();
      } else {
        alert("리스트에서 지우는데 실패 했습니다.");
      }
    });
  };
  const onClickArticle = () => {
    navigate("/LPost");
  };
  const renderCards = Posts.map((posts, index) => {
    return (
      <tr key={index}>
        <td>{posts.title} </td>
        <td>{posts.content} </td>
        <td>
          <button onClick={onClickArticle}>글보기</button>
          <button onClick={() => onClickDelete(posts.title, posts.userFrom)}>
            Remove
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <button onClick={goPost}>게시글 작성</button>
      <div style={{ width: "85", margin: "3rem auto" }}>
        <h2>게시글 목록</h2>
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

export default PostList;
