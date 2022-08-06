import {
  EllipsisOutlined,
  LikeOutlined,
  MessageOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Menu, Upload } from "antd";
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
      <Col key={index}>
        <div
          style={{
            background: "white",
            width: "100%",
            height: "100%",
            marginRight: "10%",
            borderRadius: "2.5px",
            boxShadow: "0px 0px 0px 1px #E2E2E2",
          }}
        >
          <div>
            <div style={{ display: "flex" }}>
              <Input
                style={{
                  border: "none",
                  fontSize: "17px",
                  background: "none",
                }}
                value={posts.title}
              />
              <Button style={{ border: "none" }}>
                <EllipsisOutlined />
              </Button>
            </div>

            <Input
              style={{
                marginLeft: "10px",
                border: "none",
                fontSize: "12px",
                background: "none",
              }}
              value={posts.content}
            />
            <div
              style={{ background: "gray", height: "0.3px", width: "100%" }}
            />
            <div style={{ justifyContent: "center", display: "flex" }}>
              <Button style={{ width: "50%", border: "none" }}>
                <LikeOutlined />
                좋아요
              </Button>
              <Button style={{ width: "50%", border: "none" }}>
                <MessageOutlined />
                댓글 달기
              </Button>
            </div>
          </div>
        </div>
      </Col>
      // <tr key={index}>
      //   <td>{posts.title}</td>
      //   <td>{posts.content} </td>
      //   <td>
      //     {/* <button onClick={() => onClickArticle(posts.title, posts.userFrom)}> */}
      //     <Link to={`/postPage/${posts._id}`}>
      //       <button>글 보기 </button>
      //     </Link>
      //     {/* </button> */}
      //     <button
      //       onClick={() =>
      //         onClickDelete(posts.title, posts.userFrom, posts._id)
      //       }
      //     >
      //       Remove
      //     </button>
      //   </td>
      // </tr>
    );
  });

  return (
    <div>
      {/* <div style={{ width: "85" }}>
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
      </div> */}

      <div>{renderCards}</div>
    </div>
  );
}

export default ProFilePostList;
