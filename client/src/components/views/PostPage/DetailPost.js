//게시글 조회
import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getOnePost,
  getPost,
  commentGo,
  getThisComments,
} from "../../../_actions/post_action";
import { getUser } from "../../../_actions/user_action";

function DetailPost() {
  const postId = useParams().postId;
  const cName = useParams().cName; //댓글 작성자
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Posts, setPosts] = useState([]);
  const [Title, setTitle] = useState();
  const [Content, setContent] = useState();
  const [UserFrom, setuserFrom] = useState();
  const [FavoriteNumber, setFavoriteNumber] = useState();
  const [Favorited, setFavorited] = useState(false);
  //댓글 내용(댓글 등록)
  const [Comment, setComment] = useState("");
  //댓글 작성자
  const [CName, setCName] = useState([]);
  //댓글 로드(해당 게시글에 저장된 댓글 불러오기)
  const [Comments, setComments] = useState([]);
  useEffect(() => {
    fetchCommentList();
    fetchloadUser();
  }, []);
  //로그인 정보 불러오기
  const fetchloadUser = () => {
    dispatch(getUser({ _id: localStorage.getItem("userId") })).then(
      (response) => {
        if (response.payload.success) {
          setCName(response.payload.users);
        }
      }
    );
  };
  const LUName = CName.map((users, index) => {});

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
  };

  //댓글 목록 표시
  const renderComments = Comments.map((comments, index) => {
    return (
      <tr key={index}>
        <td></td>
        <td>
          <font size="1">{comments.createdAt}</font>
          <br />
          {comments.comment}
        </td>
        <button
          onClick={() =>
            onClickDelete(
              comments.comment,
              comments.userFrom,
              comments.commentFrom
            )
          }
        >
          삭제
        </button>
      </tr>
    );
  });
  const backList = () => {
    navigate("/PostList");
  };
  const onComment = (event) => {
    setComment(event.currentTarget.value);
  };
  const userFrom = localStorage.getItem("userId");
  const variable = {
    userFrom: UserFrom,
    postFrom: postId,
    nameFrom: CName,
    title: Title,
    content: Content,
  };
  useEffect(() => {
    fetchPostList();
  }, []);
  const fetchPostList = () => {
    dispatch(getUser({ _id: postId })).then((response) => {
      if (response.payload.success) {
        setCName(response.payload.posts.name);
      } else {
        alert("error");
      }
    });
    dispatch(getOnePost({ _id: postId })).then((response) => {
      if (response.payload.success) {
        setPosts(response.payload.posts);
        setTitle(response.payload.posts[0].title);
        setContent(response.payload.posts[0].content);
        setuserFrom(response.payload.posts[0].userFrom);
        setFavoriteNumber(response.payload.posts[0].favoriteNumber);
      } else {
        alert("게시글 정보를 가져오는데 실패하였습니다.");
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
  //댓글 등록 핸들러
  const onCSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Comment", Comment);
    let body = {
      cName: userFrom,
      thisPostID: postId,
      comment: Comment,
      userFrom: userFrom,
    };
    dispatch(commentGo(body)).then((response) => {
      if (response.payload.success) {
        alert("Successed to comment up");
        fetchCommentList();
        console.log(response);
      } else {
        console.log(response.payload);
        alert("Failed to comment up");
      }
    });
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
      <hr />
      <div>
        <Button onClick={onClickFavorite}>
          {Favorited ? "Not Favorite  " : "Add to Favorite  "}
          {FavoriteNumber}
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>{Title} </th>
          </tr>
        </thead>
        <tbody>
          <div dangerouslySetInnerHTML={{ __html: Content }}></div>
        </tbody>
        <tr>
          <tr>Comments</tr>
          <tbody>{renderComments}</tbody>
          <div>
            <form>
              <textarea rows="3" cols="60" onChange={onComment}></textarea>
              <button onClick={onCSubmitHandler}>확인</button>
            </form>
          </div>
          <tr>
            <button onClick={backList}>목록보기</button>
          </tr>
        </tr>
      </table>
    </div>
  );
}
export default DetailPost;
