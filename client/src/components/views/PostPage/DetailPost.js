import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnePost, getPost } from "../../../_actions/post_action";

function DetailPost() {
  const postId = useParams().postId;
  const dispatch = useDispatch();
  const [Posts, setPosts] = useState([]);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  useEffect(() => {
    fetchPostList();
    // console.log(title);
  }, []);

  const fetchPostList = () => {
    dispatch(getOnePost({ _id: postId })).then((response) => {
      if (response.payload.success) {
        setPosts(response.payload.posts);
        console.log(Posts[0]);
        setTitle(response.payload.posts[0].title);
        setContent(response.payload.posts[0].content);
      } else {
        alert("게시글 정보를 가져오는데 실패하였습니다.");
      }
    });
  };

  return (
    <tr>
      <td>{title} </td>
      <td>{content} </td>
    </tr>
  );
}
export default DetailPost;
