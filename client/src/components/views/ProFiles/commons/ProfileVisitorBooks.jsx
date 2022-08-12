import {
  EllipsisOutlined,
  LikeOutlined,
  MessageOutlined,
  OrderedListOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Card, Form } from "antd";
import axios from "axios";
import { slice } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  vbookGo,
  getThisVBooks,
} from "../../../../_actions/visitorsBook_action";
const { TextArea } = Input;

function ProfileVisitorBooks() {
  const profileId = useParams().profileId;
  const [Comment, setComment] = useState("");
  const [Comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const [FilePath, setFilePath] = useState("");
  const userFrom = localStorage.getItem("userId");
  const userName = localStorage.getItem("name");
  useEffect(() => {
    fetchUserList();
  }, []);
  const fetchUserList = () => {
    axios
      .post("/api/users/getProFile", {
        userFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) {
          setFilePath(response.data.userInfo[0].proFileImg);
        } else {
          alert("유저 정보를 가져오는데 실패하였습니다.");
        }
      });
  };

  const onComment = (event) => {
    setComment(event.currentTarget.value);
  };
  useEffect(() => {
    fetchCommentList();
  }, []);

  const fetchCommentList = () => {
    dispatch(getThisVBooks({ thisUserID: profileId })).then((response) => {
      if (response.payload.success) {
        setComments(response.payload.visitorsBooks);
      } else {
        alert("댓글이 없습니다.");
      }
    });
  };

  const onClickDelete = (comment, userFrom, commentFrom) => {
    //삭제 확인창
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      const variables = {
        comment,
        userFrom,
        commentFrom,
      };
      axios
        .post("/api/visitorsBooks/removeVBooks", variables)
        .then((response) => {
          if (response.data.success) {
            fetchCommentList();
          } else {
            alert("댓글을 지우는데 실패 했습니다.");
          }
        });
    }
  };

  const renderVBooks = Comments.map((comments, index) => {
    const isAuthor = comments.userFrom === userFrom; //로그인 체크 변수
    return (
      <>
        <tr
          key={index}
          style={{
            backgroundColor: "#FFFFFF",
          }}
        >
          <td
            style={{ width: "5%", borderRight: "none", borderBottom: "none" }}
          >
            <>
              <img
                style={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid lightgray",
                  alignItems: "center",
                  justifyContent: "center",
                  verticalAlign: "Top",
                  borderRadius: "50px",
                  boxShadow: "1px 1px 1px 1px inset",
                }}
                src={comments.writerProfileImg}
                alt="thumbnail"
              />
            </>
          </td>
          <td
            style={{
              width: "80%",
              borderLeft: "none",
              borderRight: "none",
              textAlign: "Left",
              verticalAlign: "middle",
              borderBottom: "none",
            }}
          >
            <font style={{ color: "#A4A4A4" }}>{comments.writer} </font>
            <font size="1" color="gray">
              {moment(comments.createdAt).fromNow()}
            </font>
            <br />
            {comments.comment}
          </td>
          <td
            style={{
              width: "1000px",
              verticalAlign: "top",
              textAlign: "right",
              borderLeft: "none",
              borderBottom: "none",
            }}
          >
            {/*댓글 작성자와 로그인한 사용자가 일치할때 버튼 표시*/}
            {isAuthor && (
              <>
                <Button>수정</Button>
                <Button
                  onClick={() =>
                    onClickDelete(
                      comments.comment,
                      comments.userFrom,
                      comments.commentFrom
                    )
                  }
                >
                  삭제
                </Button>
                <br />
              </>
            )}
          </td>
        </tr>
      </>
    );
  });

  const onSubmitHandler = (event) => {
    if (Comment === "") {
      return alert("내용을 입력하세요.");
    } else {
      event.preventDefault();
      const profileImg = "http://localhost:5000/" + FilePath;
      console.log("Comment", Comment);
      let body = {
        writer: userName,
        thisUserID: profileId,
        comment: Comment,
        userFrom: userFrom,
        writerProfileImg: profileImg,
      };
      dispatch(vbookGo(body)).then((response) => {
        if (response.payload.success) {
          fetchCommentList();
          console.log(response);
        } else {
          console.log(response.payload);
          alert("Failed");
        }
      });
    }
  };

  return (
    <div>
      <Card
        title={<b>방명록</b>}
        style={{
          width: "100%",
          borderRadius: "7px",
        }}
      >
        <Form>
          <label>
            <img
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid lightgray",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50px",
                boxShadow: "1px 1px 1px 1px inset",
                marginLeft: "-0.6%",
                marginBottom: "-3.5%",
              }}
              src={`http://localhost:5000/${FilePath}`}
              alt="thumbnail"
            />
            <font style={{ verticalAlign: "bottom" }}>{userName}</font>
          </label>
          <TextArea
            placeholder="내용을 입력하세요."
            rows="3"
            cols="60"
            onChange={onComment}
            style={{
              marginLeft: "1.5%",
              width: "90%",
            }}
          ></TextArea>
          <Button
            onClick={onSubmitHandler}
            style={{
              width: "70px",
              height: "76px",
            }}
          >
            확인
          </Button>
        </Form>
      </Card>
      <div>{renderVBooks}</div>
    </div>
  );
}

export default ProfileVisitorBooks;
