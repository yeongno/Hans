import {
  EllipsisOutlined,
  LikeOutlined,
  MessageOutlined,
  OrderedListOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Menu, Upload } from "antd";
import axios from "axios";
import { slice } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import LikeButton from "./LikeButton";
import ReplyButton from "./ReplyButton";
import ReplySection from "./ReplySection";

function ProFilePostList(props) {
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
      .post("/api/posts/getPostList", {
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
    axios
      .post("/api/users/getProFileImg", { _id: localStorage.getItem("userId") })
      .then((response) => {
        if (response.data.success) {
          setFilePath(response.data.proFileImg);
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
  const onClickLike = (id) => {
    console.log(id);
  };
  const [Favorited, setFavorited] = useState(0);

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
            marginBottom: "10px",
          }}
        >
          <div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <img
                style={{
                  width: "35px",
                  height: "35px",
                  border: "1px solid lightgray",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50px",
                  boxShadow: "1px 1px 1px 1px inset",
                  marginTop: "5px",
                  marginLeft: "5px",
                  marginRight: "10px",
                }}
                src={`http://localhost:5000/${FilePath}`}
                alt="proFileImg"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    height: "15px",
                    fontSize: "15px",
                    paddingLeft: "1px",
                    border: "none",
                    fontWeight: "bold",
                    marginTop: "4px",
                  }}
                >
                  {user.userData.name}
                </span>
                <span
                  style={{
                    height: "10px",
                    fontSize: "10px",
                    paddingLeft: "1px",
                    marginTop: "2px",
                    border: "none",
                  }}
                >
                  {moment(posts.createdAt).format("M[월] D[일]")}
                </span>
              </div>
              <div
                style={{
                  border: "none",
                  alignContent: "end",
                  display: "flex",
                  width: "100%",
                  justifyContent: "end",
                  marginTop: "5px",
                }}
              >
                <Button style={{ border: "none" }}>
                  <EllipsisOutlined />
                </Button>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <span
                style={{
                  border: "none",
                  fontSize: "17px",
                  background: "none",
                  marginLeft: "1%",
                }}
              >
                {posts.title}
              </span>
            </div>
            <div
              style={{
                justifyContent: "center",
                marginLeft: "7%",
              }}
            >
              {posts.imagePath && (
                <img
                  style={{
                    maxWidth: "50%",
                    maxHeight: "50%",
                  }}
                  src={`http://localhost:5000/${posts.imagePath}`}
                  alt="FileImg"
                />
              )}
            </div>
            <span
              style={{
                marginLeft: "10px",
                border: "none",
                fontSize: "12px",
                background: "none",
                marginLeft: "1%",
              }}
            >
              {posts.content}
            </span>
            <div
              style={{
                width: "100%",
                height: "0.3px",
                background: "#cccccc",
              }}
            />
            <div style={{ justifyContent: "center", display: "flex" }}>
              <div style={{ width: "50%", border: "none" }}>
                <LikeButton
                  style={{ border: "none" }}
                  postFrom={posts._id}
                  title={posts.title}
                  content={posts.content}
                  favoriteNumber={posts.favoriteNumber}
                />
              </div>
              <div style={{ width: "50%", border: "none" }}>
                <div
                  style={{
                    marginLeft: "2%",
                    marginBottom: "1%",
                    marginTop: "1%",
                  }}
                >
                  <SmileOutlined style={{ border: "none", opacity: "0" }} />
                </div>
                <div style={{ marginRight: "2%" }}>
                  <div
                    style={{
                      background: "#cccccc",
                      height: "1px",
                      width: "100%",
                    }}
                  />
                </div>
                {/* <Button
                  style={{ width: "100%", border: "none" }}
                  onClick={onReply}
                >
                  <MessageOutlined />
                  댓글 달기
                </Button> */}
                <ReplyButton postFrom={posts._id} />
              </div>
            </div>{" "}
          </div>
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

export default ProFilePostList;
