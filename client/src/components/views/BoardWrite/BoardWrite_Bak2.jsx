import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerBoard } from "../../../_actions/board_action";
import React, { useState } from "react";

function BoardWrite() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Title, setTitle] = useState("");
  const [TArea, setTArea] = useState("");

  const userFrom = localStorage.getItem("userId");

  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const onTAreaHandler = (event) => {
    setTArea(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log("title", Title);
    console.log("content", TArea);

    let body = {
      title: Title,
      content: TArea,
      userFrom: userFrom,
    };
    dispatch(registerBoard(body)).then((response) => {
      if (response.payload.success) {
        navigate("../BoardList");
      } else {
        alert("Failed to sign up");
      }
    });
  };

  const Cancel1 = () => {
    navigate("../BoardList");
  };

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
      <font size="6">Write your Message</font>
      <form onSubmit={onSubmitHandler}>
        <label>제목 : </label>
        <input type="text" value={Title} onChange={onTitleHandler}></input>
        <br />
        <label> 내용 : </label>
        <textarea value={TArea} onChange={onTAreaHandler}></textarea>
        <br />
        <button type="submit">저장하기</button>
        <button onClick={Cancel1}>취소하기</button>
      </form>
    </div>
  );
}

export default BoardWrite;
