import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fileUpload } from "../../../_actions/board_action";

function BoardFileUpload() {
  const closeWindow = () => window.close();
  const dispatch = useDispatch();
  const [UpFile, setFile] = useState();

  const onFileHandler = (event) => {
    setFile(event.currentTarget.id);
  };
  const submitImage = () => {
    document.getElementById("UpFile").submit();
  };
  /* const submitImage = (event) => {
    event.preventDefault();
    let body = {
      File: UpFile,
    };

    dispatch(fileUpload(body)).then((response) => {
      if (response.payload.success) {
        window.close();
      } else {
        alert("Failed to sign up");
        window.close();
      }
    });
  };*/
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
      <label>file upload</label>
      <form
        action="/api/Board/create"
        method="post"
        enctype="multipart/form-data"
        id="frm"
      >
        <input
          type="file"
          id="UpFile"
          name="UpFile"
          accept="image/*"
          onChange={onFileHandler}
        ></input>
        <button onClick={submitImage}>확인</button>
        <button onClick={closeWindow}>닫기</button>
      </form>
    </div>
  );
}

export default BoardFileUpload;
