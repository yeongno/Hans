import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerBoard } from "../../../_actions/board_action";
import React, { useState } from "react";
//import Modal from "./BoardFileUpload"; //모달 팝업창
import FormData from "form-data";

function BoardWrite() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Title, setTitle] = useState("");
  const [TArea, setTArea] = useState("");
  const [UpFile, setUpFile] = useState([]);

  const getFile = (e) => {
    const len = e.event.files.length;
    for (let i = 0; i < len; i++) {
      setUpFile(e.target.files[0]);
      console.log(UpFile);
    }
  };

  const userFrom = localStorage.getItem("userId");

  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const onTAreaHandler = (event) => {
    setTArea(event.currentTarget.value);
  };

  /* const showPopup = () => {
    window(
      "BoardFileUpload",
      "FileAttach",
      "width=400, height=300, left=100, top=50"
    );
  }; */
  /* const onUpFileHandler = (event) => {
    setUpFile(event.currentTarget.value);
  }; */

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

  const attachImage = () => {
    window.open(
      "BoardFileUpload",
      "Image Upload",
      "width=400, height=300, left=100, top=50"
    );
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
      <div>
        <h1>App</h1>
      </div>
      <font size="6">Write your Message</font>
      <form encType="multipart/form-data">
        <label>제목 : </label>
        <input type="text" value={Title} onChange={onTitleHandler}></input>
        <br />
        <label> 내용 : </label>
        <textarea value={TArea} onChange={onTAreaHandler}></textarea>
        <br />
        <label>이미지 첨부 : </label>
        <input type="file" name="image" accept="image/*" onChange={getFile} />
        <button onClick={attachImage}>파일첨부</button>
        <br />
        <button onClick={onSubmitHandler}>저장하기</button>
        <button onClick={Cancel1}>취소하기</button>
      </form>
    </div>
  );
}

export default BoardWrite;
