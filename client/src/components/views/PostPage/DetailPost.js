//게시글 조회
import { Button, Card, Input, Avatar, Comment, Tooltip } from "antd";
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import axios from "axios";
import React, { createElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getOnePost,
  getPost,
  commentGo,
  getThisComments,
} from "../../../_actions/post_action";
import moment from "moment";
const { TextArea } = Input;

function DetailPost() {
  const postId = useParams().postId;
  const cName = useParams().cName; //댓글 작성자
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Posts, setPosts] = useState([]);
  const [Title, setTitle] = useState();
  const [Topic, setTopic] = useState();
  const [Content, setContent] = useState();
  const [Created, setCreated] = useState();
  const [UserFrom, setuserFrom] = useState();
  const [Writer, setWriter] = useState();
  const [FavoriteNumber, setFavoriteNumber] = useState();
  const [Favorited, setFavorited] = useState(false);
  const [ViewNumber, setViewNumber] = useState();
  //댓글 내용(댓글 등록)
  const [Comment, setComment] = useState("");
  //댓글 작성자
  const [CName, setCName] = useState([]);
  //댓글 로드(해당 게시글에 저장된 댓글 불러오기)
  const [Comments, setComments] = useState([]);
  const userFrom = localStorage.getItem("userId");
  const userName = localStorage.getItem("name");

  const [FilePath, setFilePath] = useState("");
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
  useEffect(() => {
    fetchCommentList();
  }, []);

  const fetchCommentList = () => {
    dispatch(getThisComments({ thisPostID: postId })).then((response) => {
      if (response.payload.success) {
        setComments(response.payload.comments);
        console.log(Comments[0]);
      } else {
        alert("댓글이 없습니다.");
      }
    });
  };

  //댓글 삭제
  const onClickDelete = (comment, userFrom, commentFrom) => {
    //삭제 확인창
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      const variables = {
        comment,
        userFrom,
        commentFrom,
      };
      axios.post("/api/comments/removeComment", variables).then((response) => {
        if (response.data.success) {
          fetchCommentList();
        } else {
          alert("댓글을 지우는데 실패 했습니다.");
        }
      });
    }
  };
  //대댓글
  const ansComment = (writer) => {
    return (
      <div>
        <label>{writer}님에게 답글</label>
        <form>
          <div>
            <form>
              <label>{userName}</label>
              <textarea rows="3" cols="60"></textarea>
              <button>확인</button>
            </form>
          </div>
        </form>
      </div>
    );
  };
  //댓글 목록 표시
  const renderComments = Comments.map((comments, index) => {
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
            <Button onClick={ansComment(comments.writer)}>답글</Button>
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
  const backList = () => {
    navigate("/PostList");
  };
  const onComment = (event) => {
    setComment(event.currentTarget.value);
  };
  const variable = {
    userFrom: UserFrom,
    postFrom: postId,
    nameFrom: CName,
    title: Title,
    content: Content,
  };

  useEffect(() => {
    fetchPostList();
    fetchpostView();
  }, []);
  const fetchPostList = () => {
    dispatch(getOnePost({ _id: postId })).then((response) => {
      if (response.payload.success) {
        setPosts(response.payload.posts);
        console.log("info", response.payload.posts);
        setTitle(response.payload.posts[0].title);
        setContent(response.payload.posts[0].content);
        setCreated(response.payload.posts[0].createdAt);
        setuserFrom(response.payload.posts[0].userFrom);
        setTopic(response.payload.posts[0].topic);
        setWriter(response.payload.posts[0].writer);
        setFavoriteNumber(response.payload.posts[0].favoriteNumber);
        setViewNumber(response.payload.posts[0].viewNumber);
      } else {
        alert("게시글 정보를 가져오는데 실패하였습니다.");
      }
    });
    axios
      .post("/api/posts/updateView", {
        _id: postId,
        viewNumber: ViewNumber + 1,
      })
      .then((response) => {
        if (response.data.success) {
        }
      });

    axios
      .post("/api/favoriteList/favorited", {
        postFrom: postId,
        userFrom: UserFrom,
      })
      .then((response) => {
        if (response.data.success) {
          setFavorited(Favorited);
        } else {
          alert("Favorited를 가져오는데 실패했습니다.");
        }
      });
  };
  const fetchpostView = () => {
    axios
      .post("/api/posts/updateView", {
        _id: postId,
        userFrom: UserFrom,
        view: ViewNumber + 1,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("view", ViewNumber);
        }
      });
  };
  //댓글 등록 핸들러
  const onCSubmitHandler = (event) => {
    if (Comment === "") {
      return alert("내용을 입력하세요.");
    } else {
      event.preventDefault();
      const profileImg = "http://localhost:5000/" + FilePath;
      console.log("Comment", Comment);
      let body = {
        writer: userName,
        thisPostID: postId,
        comment: Comment,
        userFrom: userFrom,
        writerProfileImg: profileImg,
      };
      dispatch(commentGo(body)).then((response) => {
        if (response.payload.success) {
          fetchCommentList();
          console.log(response);
        } else {
          console.log(response.payload);
          alert("Failed to comment up");
        }
      });
    }
  };

  const onClickFavorite = () => {
    if (Favorited) {
      axios
        .post("/api/favoriteList/removeFavorite", variable)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
            console.log(response.data.result);
          } else {
            alert("Favorite 리스트에서 지우는 걸 실패했습니다.");
          }
        });
      axios
        .post("/api/posts/updateFavorite", {
          _id: postId,
          userFrom: UserFrom,
          favoriteNumber: FavoriteNumber - 1,
        })
        .then((response) => {
          if (response.data.success) {
          }
        });
    } else {
      let variable = {
        userFrom: UserFrom,
        postFrom: postId,
        title: Title,
        content: Content,
      };
      axios
        .post("/api/favoriteList/addToFavorite", variable)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber + 1);
            setFavorited(!Favorited);
          } else {
            alert("Favorite 리스트에서 추가하는 걸 실패했습니다.");
          }
        });
      axios
        .post("/api/posts/updateFavorite", {
          _id: postId,
          userFrom: UserFrom,
          favoriteNumber: FavoriteNumber + 1,
        })
        .then((response) => {
          if (response.data.success) {
          }
        });
    }
  };

  return (
    <div>
      <div style={{ marginLeft: "10%", marginRight: "10%" }}>
        <hr />
        <div></div>
        <Card
          size="small"
          title={
            <>
              <div>
                [{Topic}] {Title}
              </div>
              <div
                style={{
                  width: "99%",
                  textAlign: "right",
                  position: "absolute",
                }}
              >
                조회수 : {ViewNumber} <font color="#BCBCBC">|</font> 좋아요 :{" "}
                {FavoriteNumber}{" "}
              </div>
              <div>
                <Link to={`/${userFrom}`} style={{ color: "black" }}>
                  {Writer}
                </Link>{" "}
                <font color="#BCBCBC">|</font>
                {moment(Created).format(" Y[-]MM[-]DD")}
              </div>
            </>
          }
          style={{ width: "100%" }}
        >
          <div dangerouslySetInnerHTML={{ __html: Content }}></div>
          <label style={{ float: "right" }}>
            <Button onClick={onClickFavorite}>
              {Favorited ? "Not Favorite  " : "Add to Favorite  "}
              {FavoriteNumber}
            </Button>
          </label>
        </Card>
        <table>
          <tr>
            <tr>Comments</tr>
            <tbody style={{ width: "100%" }}>{renderComments}</tbody>
            <div>
              <form>
                <tr>
                  <td
                    style={{
                      width: "3%",
                      borderRight: "none",
                      textAlign: "center",
                    }}
                  >
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
                        }}
                        src={`http://localhost:5000/${FilePath}`}
                        alt="thumbnail"
                      />
                      {userName}
                    </label>
                  </td>
                  <td
                    style={{
                      width: "95%",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  >
                    <TextArea
                      placeholder="댓글을 입력하세요."
                      rows="3"
                      cols="60"
                      onChange={onComment}
                    ></TextArea>
                  </td>
                  <td
                    style={{
                      width: "8%",
                      verticalAlign: "middle",
                      textAlign: "center",
                      borderLeft: "none",
                    }}
                  >
                    <Button
                      onClick={onCSubmitHandler}
                      style={{
                        height: "60px",
                      }}
                    >
                      확인
                    </Button>
                  </td>
                </tr>
              </form>
            </div>
          </tr>
        </table>
        <Button onClick={backList}>목록보기</Button>
        <table>
          <tr style={{ backgroundColor: "white" }}>
            <td style={{ color: "gray", width: "5%" }}>이전 글</td>
            <td style={{}}></td>
          </tr>
          <tr style={{ backgroundColor: "white" }}>
            <td style={{ color: "gray", width: "5%" }}>다음 글</td>
            <td style={{}}></td>
          </tr>
        </table>
      </div>
    </div>
  );
}
export default DetailPost;
