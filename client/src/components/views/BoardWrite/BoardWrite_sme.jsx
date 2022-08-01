import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerBoard } from "../../../_actions/board_action"; //게시글을 DB에 등록하기
import React, { useEffect, useState } from "react";

//스마트 에디터 파일 불러오기
//import SMEdit from "../../SmartEditer/js/HuskyEZCreator";
import HuskyEZCreator from "../../SmartEditor/js/HuskyEZCreator"; //HuskyEZCreator.js

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

  //스마트 에디터 Node.js 적용 프로젝트(진행중)
  const editor_object = HuskyEZCreator.oAppRef;
  const pasteHTML = () => {};
  const showHTML = () => {};
  const ubmitContents = () => {};
  //id가 smarteditor인 textarea에 에디터에서 대입
  editor_object.getById["smarteditor"].exec("UPDATE_CONTENTS_FIELD", []);
  //게시글 작성 취소
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
        <label>제목: </label>
        <input type="text" value={Title} onChange={onTitleHandler}></input>
        <br />
        <label> 내용: </label>

        <textarea
          value={TArea}
          onChange={onTAreaHandler}
          name="smarteditor"
          id="smarteditor"
          rows="10"
          cols="100"
          style="width:766px; height:412px; display:none;"
        ></textarea>
        <p>
          <input type="button" onclick={pasteHTML} value="본문에 내용 넣기" />
          <input type="button" onclick={showHTML} value="본문 내용 가져오기" />
        </p>
        <br />
        <button type="submit">저장하기</button>
        <button onClick={Cancel1}>취소하기</button>
      </form>
    </div>
  );
}

export default BoardWrite;
