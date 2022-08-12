import { Button, Col, Input, Menu, Upload } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myFavorite, myProfileModify } from "../../../../_actions/page_action";
import { getPost } from "../../../../_actions/post_action";
import HomeLandingList from "./HomeLandingList";

function HomeSection(props) {
  const [FilePath, setFilePath] = useState("");
  const [Posts, setPosts] = useState([]);
  const [Ondefault, setdefault] = useState(false);
  const user = useSelector((state) => state.user);
  const page = useSelector((state) => state.page);
  const [replyOpen, setreplyOpen] = useState(false);
  const onReply = () => {
    setreplyOpen(true);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    fetchPostList();
  }, []);
  const fetchPostList = () => {
    // dispatch(myFavorite({ modify: true }));
    dispatch(getPost({ public: "public" })).then((response) => {
      if (response.payload.success) {
        setPosts(response.payload.posts);
      } else {
        alert("게시글 정보를 가져오는데 실패하였습니다.");
      }
    });
  };
  const renderCards = Posts.map((posts, index) => {
    return (
      <Col key={index}>
        <div>
          <HomeLandingList postFrom={posts._id} userFrom={posts.userFrom} />
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

export default HomeSection;
