import { Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import DropDown from "../DropDwon/DropDown";
import { ProfileOutlined, SmileOutlined } from "@ant-design/icons";
import ReplyButton from "../ReplySection/ReplyButton";
import LikeButton from "../LikeButton";
import { Default_img } from "../../../../Config";

function FavoriteList(props) {
  const postFrom = props.postFrom;

  //posts
  const [PostImg, setPostImg] = useState();
  const [PostTitle, setPostTitle] = useState();
  const [PostContent, setPostContent] = useState();
  const [PostFavoriteNumber, setPostFavoriteNumber] = useState();
  const [PostCreatedAt, setPostCreatedAt] = useState();
  const [userFrom, setUserFrom] = useState();

  // users
  const [Name, setName] = useState("");
  const [FilePath, setFilePath] = useState("");

  //DropDown_ compared userId
  const [Compare, steCompare] = useState(false);

  useEffect(() => {
    fetchPostList();
  }, []);

  const fetchPostList = () => {
    axios.post("/api/posts/getOnePost", { _id: postFrom }).then((response) => {
      setPostImg(response.data.posts[0].imagePath);
      setPostTitle(response.data.posts[0].title);
      setPostContent(response.data.posts[0].content);
      setPostFavoriteNumber(response.data.posts[0].favoriteNumber);
      setPostCreatedAt(response.data.posts[0].PostCreatedAt);
      setUserFrom(response.data.posts[0].userFrom);

      const userFrom1 = response.data.posts[0].userFrom;
      axios
        .post("/api/users/getProFileImg", { _id: userFrom1 })
        .then((response) => {
          setName(response.data.userInfo.name);
          setFilePath(response.data.proFileImg);
        });
      if (userFrom1 === localStorage.getItem("userId")) {
        steCompare(true);
        console.log("yes~~");
      }
    });
  };
  // console.logK(userFrom, " user f ro m");
  const onErrorHandler = (e) => {
    e.targetsrc = Default_img;
  };

  return (
    <div>
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
            {FilePath && (
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
              />
            )}
            {!FilePath && (
              <ProfileOutlined
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
              />
            )}
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
                {Name}
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
                {moment(PostCreatedAt).format("M[월] D[일]")}
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
              {Compare && (
                <DropDown
                  postFrom={postFrom}
                  title={PostTitle}
                  content={PostContent}
                  userFrom={userFrom}
                />
              )}
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
              {PostTitle}
            </span>
          </div>
          <div
            style={{
              justifyContent: "center",
              marginLeft: "7%",
            }}
          >
            {PostImg && (
              <img
                style={{
                  maxWidth: "50%",
                  maxHeight: "50%",
                }}
                src={`http://localhost:5000/${PostImg}`}
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
            {PostContent}
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
                postFrom={postFrom}
                title={PostTitle}
                content={PostContent}
                favoriteNumber={PostFavoriteNumber}
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

              <ReplyButton postFrom={postFrom} />
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

export default FavoriteList;
