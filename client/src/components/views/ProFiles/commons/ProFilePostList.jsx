import {
  EllipsisOutlined,
  LikeOutlined,
  MessageOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Menu, Upload } from "antd";
import axios from "axios";
import { slice } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

function ProFilePostList(props) {
  const [FilePath, setFilePath] = useState("");
  const [Posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchPostList();
  }, []);
  // const onChangeDate = (createdAt) => {
  //   setCreatedAt(createdAt);
  //   setMonth(CreatedAt.slice(5, 7));
  //   console.log(Date_Month);
  // };

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

  const renderCards = Posts.map((posts, index) => {
    // if (posts.index) {
    //   onChangeDate(posts.createdAt);
    // }
    // setCreatedAt(posts.createdAt);
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* <Input
                  readOnly
                  value={`${user.userData.name}`}
                  style={{
                    height: "15px",
                    fontSize: "15px",
                    paddingLeft: "1px",
                    border: "none",
                    fontWeight: "bold",
                    marginTop: "10px",
                    padding: "0",
                    background: "red",
                  }}
                /> */}
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
                {/* <Input
                  readOnly
                  value={`${moment(posts.createdAt).format("M[월] D[일]")}`}
                  style={{
                    height: "9px",
                    fontSize: "5px",
                    border: "none",
                    padding: "0",
                  }}
                /> */}
                <span
                  style={{
                    height: "10px",
                    fontSize: "10px",
                    paddingLeft: "1px",
                    marginTop: "1px",
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
              {/* <Input
                style={{
                  border: "none",
                  fontSize: "17px",
                  background: "none",
                }}
                value={posts.title}
              /> */}
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
