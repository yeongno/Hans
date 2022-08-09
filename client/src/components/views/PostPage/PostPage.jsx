import { CameraOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import axios from "axios";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { postGo } from "../../../_actions/post_action";
import "./Post.css";

function PostPage() {
  const dispatch = useDispatch();

  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Contentset, setContents] = useState("");

  const [FilePath, setFilePath] = useState("");

  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const onContentHandler = (event) => {
    setContent(event.currentTarget.value);
  };
  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/users/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        setFilePath(response.data.url);
        axios
          .post("/api/users/uploadFileImg", {
            _id: localStorage.getItem("userId"),
            tempImg: FilePath,
          })
          .then((response) => {
            if (response.data.success) {
            }
          });
      } else {
        alert("비디오 업로드를 실패했습니다.");
      }
    });
  };

  const onContent = (event) => {
    setContents(event.currentTarget.value);
  };
  const userFrom = localStorage.getItem("userId");
  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log("Title", Title);
    console.log("Content", Content);
    console.log("FilePath", FilePath);
    let body = {
      title: Title,
      content: Content,
      userFrom: userFrom,
      imagePath: FilePath,
    };
    dispatch(postGo(body)).then((response) => {
      if (response.payload.success) {
        alert("Successed to post up");
        console.log(response);
      } else {
        console.log(response.payload.req);
        alert("Failed to post up");
      }
    });
  };

  return (
    <div>
      <Form>
        <div>
          {/* Drop Zone */}
          <div
            style={{
              width: "100px",
              height: "100px",
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
            // className={top.dropZone}
          >
            {FilePath && (
              <div>
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    border: "1px solid lightgray",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50px",
                    boxShadow: "1px 1px 1px 1px inset",
                  }}
                  src={`http://localhost:5000/${FilePath}`}
                  alt="thumbnail"
                />
              </div>
            )}
            <Dropzone onDrop={onDrop} multiple={false} maxSize={10000000}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: "67%",
                    left: "67%",
                    opacity: "75%",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <Button
                    icon={<CameraOutlined />}
                    style={{ fontSize: "3rem" }}
                  />
                </div>
              )}
            </Dropzone>
          </div>
          <label>Title</label>
          <input type="text" value={Title} onChange={onTitleHandler} />
        </div>
        <div>
          <label>Content</label>
          <input type="text" value={Content} onChange={onContentHandler} />
        </div>
        <button onClick={onSubmitHandler}>Submit1</button>
        <input type="text" value={Contentset} onChange={onContent} />
      </Form>
    </div>
  );
}

export default PostPage;
