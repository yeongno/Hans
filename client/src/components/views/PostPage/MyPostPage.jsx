import { CameraOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row } from "antd";
import axios from "axios";
import { title } from "process";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postGo } from "../../../_actions/post_action";
import "./Post.css";

function MyPostPage() {
  const dispatch = useDispatch();

  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [FilePath, setFilePath] = useState("");
  const userFrom = localStorage.getItem("userId");
  const page = useSelector((state) => state.page.currentPage);
  const navigate = useNavigate();

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

  const onPost = () => {
    let body = {
      title: Title,
      content: Content,
      userFrom: userFrom,
      imagePath: FilePath,
    };
    dispatch(postGo(body)).then((response) => {
      if (response.payload.success) {
        alert("Successed to post up");
      } else {
        alert("Failed to post up");
      }
    });

    message.success("게시글을 작성하였습니다.");

    navigate(window.history.back());
  };

  const { TextArea } = Input;

  return (
    <div>
      <div style={{ display: "flex", width: "1500px", marginLeft: "120px" }}>
        <div style={{ width: "100px" }}>
          <div style={{ marginLeft: "30px" }}>
            <div
              style={{
                marginTop: "10px",
                border: "2px solid black",
                fontSize: "30px",
                borderRadius: "10px",
              }}
            >
              <span>제목</span>
            </div>
            <div
              style={{
                marginTop: "15px",
                border: "2px solid black",
                borderRadius: "10px",
                fontSize: "30px",
              }}
            >
              <span>내용</span>
            </div>
            <div
              style={{
                marginTop: "180px",
                border: "2px solid black",
                borderRadius: "10px",
                fontSize: "30px",
              }}
            >
              <span>사진</span>
            </div>
          </div>
        </div>
        <Form style={{ width: "1400px" }}>
          <Row justify="start" style={{ margin: 10 }}>
            <Col span={20}>
              <TextArea
                style={{
                  borderRadius: "5px",
                  width: "calc(100%)",
                  height: "calc(100%)",
                  overflow: "auto",
                  scrollbarWidth: "none",
                  resize: "none",
                  border: "2px solid black",
                }}
                placeholder="제목을 입력하세요"
                onChange={onTitleHandler}
                value={Title}
              />
            </Col>
          </Row>
          <Row justify="start" style={{ margin: 10, height: "200px" }}>
            <Col span={20}>
              <TextArea
                style={{
                  borderRadius: "5px",
                  width: "calc(100%)",
                  height: "calc(100%)",
                  overflow: "auto",
                  scrollbarWidth: "none",
                  border: "2px solid black",
                  resize: "none",
                }}
                placeholder="내용을 입력하세요"
                onChange={onContentHandler}
                value={Content}
              />
            </Col>
          </Row>

          <div style={{ display: "flex" }}>
            {/* <div style={{ width: "200px", height: "200px", background: "blue" }}>
          <button style={{ margin: "5.2rem 5.2rem" }}>
            <PlusSquareOutlined />
          </button>
        </div> */}

            <div
              style={{
                position: "relative",
                marginLeft: "15px",
                marginTop: "20px",
                width: "250px",
                height: "250px",
                paddingLeft: "25px",
                paddingTop: "25px",
                borderRadius: "30px",
                border: "5px solid gray",
              }}
            >
              {FilePath && (
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    position: "absolute",
                  }}
                >
                  <img
                    style={{
                      alignItems: "center",
                      width: "200px",
                      height: "200px",
                      justifyContent: "center",
                      boxShadow: "1px 1px 1px 1px inset",
                    }}
                    src={`http://localhost:5000/${FilePath}`}
                    alt="thumbnail"
                  />
                </div>
              )}
              <div
                style={{
                  position: "absoulte",
                  width: "200px",
                  height: "200px",
                }}
              >
                <Dropzone onDrop={onDrop} multiple={false} maxSize={10000000}>
                  {({ getRootProps, getInputProps }) => (
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                      }}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <Button
                        icon={<CameraOutlined />}
                        style={{ fontSize: "3rem", margin: "5rem 5rem" }}
                      />
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
            <div
              style={{
                width: "900px",
                paddingLeft: "795px",
                paddingTop: "40px",
                justifyContent: "center",
              }}
            >
              <button
                style={{
                  width: "100px",
                  height: "70px",
                  border: "2px solid black",
                  background: "none",
                  borderRadius: "5px",
                }}
                onClick={onPost}
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default MyPostPage;
