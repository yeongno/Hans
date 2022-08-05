import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getPost, getTopic } from "../../../_actions/post_action";
import { Button } from "antd";

function PostList() {
  const userFrom = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [Topics, setTopics] = useState([]); //토픽 데이터 불러오기 위한 변수
  const [Topic, setTopic] = useState(""); //토픽 설정 변수

  const goPost = () => {
    navigate("/postPage");
  };
  const goFavoriteList = () => {
    navigate("/myFavoriteList");
  };
  // modal이 보이는 여부 상태
  const [show, setShow] = useState(false);
  const [Posts, setPosts] = useState([]);
  //토픽 불러오기
  useEffect(() => {
    fetchTopicList();
  }, []);
  const fetchTopicList = () => {
    dispatch(getTopic({ type: "TOPIC" })).then((response) => {
      if (response.payload.success) {
        setTopics(response.payload.topics);
      } else {
        alert("Load Error");
      }
    });
  };
  const onTopicHandler = (event) => {
    setTopic(event.currentTarget.value);
  };
  const topicList = Topics.map((topics, index) => {
    return <option value={topics.topicName}>{topics.topicName}</option>;
  });

  useEffect(() => {
    fetchPostList();
  }, []);
  //포스트 불러오기
  const fetchPostList = () => {
    dispatch(getPost({ topic: "public" })).then((response) => {
      if (response.payload.success) {
        setPosts(response.payload.posts);
        console.log(Posts[0]);
      } else {
        alert("삭제되었거나 존재하지 않는 게시물입니다.");
      }
    });
  };
  //수정 삭제 버튼(작성자와 로그인한 사용자가 일치할때 표시되도록)

  const onClickDelete = (title, userFrom, postFrom) => {
    //삭제 확인창
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
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
        .then((response) => {});
    }
  };

  const renderCards = Posts.map((posts, index) => {
    const isAuthor = posts.userFrom === userFrom; //로그인 체크 변수
    return (
      <tr key={index}>
        <td>{posts.topic}</td>
        <Link to={`/postPage/${posts._id}`}>
          <font color="black">
            <tr>{posts.title}</tr>
          </font>
        </Link>
        <td>{posts.content} </td>
        <td>{posts.createdAt}</td>
        <td>{posts.favoriteNumber}</td>
        <td>{posts.writer}</td>
        <td>
          {/* <button onClick={() => onClickArticle(posts.title, posts.userFrom)}> */}
          <Link to={`/postPage/${posts._id}`}>
            <Button>글 보기 </Button>
          </Link>
          {/* </button> */}
          {/*글 작성자와 로그인한 사용자가 일치할때 버튼 표시*/}
          {isAuthor && (
            <>
              <Button>수정</Button>
              <Button
                className="delete-button"
                onClick={() =>
                  onClickDelete(posts.title, posts.userFrom, posts.postFrom)
                }
              >
                삭제
              </Button>
            </>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div style={{ width: "85", margin: "3rem auto" }}>
        <h2>게시글 목록</h2>
        <Button onClick={goPost}>게시글 작성</Button>
        <Button onClick={goFavoriteList}>My FavoriteList</Button>
        <select onChange={onTopicHandler} value={Topic}>
          <option>Select Topic</option>
          {topicList}
        </select>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Title</th>
              <th>Content</th>
              <th width="200">Date</th>
              <th>Like</th>
              <th>Writer</th>
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
