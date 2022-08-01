import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function BoardList() {
  const navigate = useNavigate();
  const goWrite = () => {
    navigate("/BoardWrite");
  };
  const [Board, setBoard] = useState([]);
  useEffect(() => {
    fetchPostList();
  }, []);

  const fetchPostList = () => {
    axios
      .post("/api/Board/getBoard", {
        userFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) {
          setBoard(response.data.Board);
        } else {
          alert("게시글 정보를 가져오는데 실패하였습니다.");
        }
      });
  };
  const onClickArticle = () => {
    navigate("./BoardView/BoardView");
  };
  const renderCards = Board.map((Board, index) => {
    return (
      <tr key={index}>
        <td></td>
        <td>{Board.title} </td>
        <td></td>
        <td></td>
        <td>{Board.createdAt}</td>
        <td></td>
        <td>
          <button onClick={onClickArticle}>글보기</button>
        </td>
      </tr>
    );
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "top",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <font size="5">board list</font>
      <div class="row">
        <table class="table table-hover table-condensed">
          <colgroup>
            <col width="80px" />
            <col width="*" />
            <col width="60px" />
            <col width="100px" />
            <col width="120px" />
            <col width="80px" />
          </colgroup>
          <thead class="pwc-table-head">
            <tr>
              <th>번호</th>
              <th scope="col">제목</th>
              <th scope="col">좋아요</th>
              <th scope="col">글쓴이</th>
              <th scope="col">날짜</th>
              <th scope="col">조회수</th>
            </tr>
          </thead>
          <tbody>{renderCards}</tbody>
        </table>
      </div>
      <br />
      <div class="row">
        <div class="pull-right">
          <button onClick={goWrite}>글쓰기</button>
        </div>
      </div>
    </div>
  );
}
