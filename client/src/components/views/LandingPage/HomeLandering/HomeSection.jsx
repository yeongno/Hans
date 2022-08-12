import { Button, Col, Input, Menu, Upload } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  home,
  myFavorite,
  myProfileModify,
} from "../../../../_actions/page_action";
import { getPost } from "../../../../_actions/post_action";
import HomeLandingList from "./HomeLandingList";

function HomeSection(props) {
  const [FilePath, setFilePath] = useState("");
  const [Posts, setPosts] = useState([]);
  const [Ondefault, setdefault] = useState(false);
  const user = useSelector((state) => state.user);
  const page = useSelector((state) => state.page);
  const [replyOpen, setreplyOpen] = useState(false);
  const navigate = useNavigate();
  const onReply = () => {
    setreplyOpen(true);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    fetchPostList();
  }, []);
  const fetchPostList = () => {
    // if (window.localStorage.getItem("onModify")) {
    //   window.localStorage.setItem("onModify", true);
    //   navigate("/myproFile");
    // }
    if (page.page === "myProFile") {
      navigate("/myproFile");
    }
    dispatch(getPost({ public: "public" })).then((response) => {
      if (response.payload.success) {
        setPosts(response.payload.posts);
      } else {
        alert("게시글 정보를 가져오는데 실패하였습니다.");
      }
    });
    dispatch(home({ page: "home" }));
  };
  const renderCards = Posts.map((posts, index) => {
    return (
      <div>
        <Col key={index}>
          <div style={{ marginLeft: "10%", marginRight: "10%" }}>
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
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  // display: "flex",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <div>
                  <HomeLandingList
                    postFrom={posts._id}
                    userFrom={posts.userFrom}
                  />
                </div>
              </div>
            </div>
          </div>
        </Col>
      </div>
    );
  });

  return (
    <div>
      <div style={{ marginTop: "20px" }} />
      <div>{renderCards}</div>
    </div>
  );
}

export default HomeSection;
