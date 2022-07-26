import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOnePost, getPost } from "../../../_actions/post_action";

function LPost() {
  const dispatch = useDispatch();
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPostList();
  }, []);

  const fetchPostList = () => {
    dispatch(getOnePost({ userFrom: localStorage.getItem("userId") })).then(
      (response) => {
        if (response.payload.success) {
          setPosts(response.payload.posts);
        } else {
          alert("게시글 정보를 가져오는데 실패하였습니다.");
        }
      }
    );
  };
  const renderCards = Posts.map((posts, index) => {
    console.log(index);
    return (
      <tr key={index}>
        <td>{posts.title}</td>
        <td>{posts.content} </td>
      </tr>
    );
  });
  return <div>{renderCards}</div>;
}

export default LPost;
