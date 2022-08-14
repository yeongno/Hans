import {
  EllipsisOutlined,
  LikeOutlined,
  MessageOutlined,
  OrderedListOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Button, Col, Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import LikeButton from "./LikeButton";
import ReplyButton from "./ReplySection/ReplyButton";
import DropDown from "./DropDwon/DropDown";

function ProFilePictureList() {
  const [FilePath, setFilePath] = useState("");
  const [Posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user);
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
  const renderCards = Posts.map((posts, index) => {
    return (
      <td
        key={index}
        style={{
          background: "white",
          width: "25%",
          borderRadius: "2.5px",
          float: "left",
        }}
      >
        <Link to={`/Postpage/${posts._id}`}>
          {posts.imagePath && (
            <img
              style={{
                width: "150px",
                height: "150px",
                marginLeft: "15px",
                marginRight: "15px",
                marginTop: "15px",
                marginBottom: "15px",
                boxShadow: "0px 0px 0px 1px #E2E2E2",
              }}
              src={`http://localhost:5000/${posts.imagePath}`}
              alt="FileImg"
            />
          )}
        </Link>
      </td>
    );
  });

  return (
    <div>
      <table>
        <tr>{renderCards}</tr>
      </table>
    </div>
  );
}

export default ProFilePictureList;
