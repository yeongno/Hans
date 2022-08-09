import { CameraOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, message, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";

function Modify(props) {
  const [Title, setTitle] = useState();
  const [Content, setContent] = useState();
  const [FilePath, setFilePath] = useState("");
  useEffect(() => {
    fetchPostList();
  }, [1]);

  const fetchPostList = () => {
    axios
      .post("/api/posts/getImgeFile", { _id: props.postFrom })
      .then((response) => {
        if (response.data.success) {
          setFilePath(response.data.posts[0].imagePath);
        }
      });
  };
  console.log(FilePath);
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChangeContent = (event) => {
    setContent(event.target.value);
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
        console.log(FilePath, " sfa");
        axios
          .post("/api/users/uploadFileImg", {
            _id: localStorage.getItem("userId"),
            tempImg: FilePath,
          })
          .then((response) => {
            if (response.data.success) {
              console.log(response.data.result);
            }
          });
      } else {
        alert("비디오 업로드를 실패했습니다.");
      }
    });
  };
  const onSubmit = () => {
    axios
      .post("/api/posts/updatePost", {
        _id: props.postFrom,
        title: Title,
        content: Content,
        imagePath: FilePath,
      })
      .then(function (response) {
        if (response.data.success) {
        } else {
          alert("게시글을 업로드하지 못하였습니다.");
        }
      });
    message.success("게시글을 수정하였습니다.");
    window.location.reload();
  };
  const { TextArea } = Input;
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div
        style={{
          display: "flex",
          width: "95%",
          background: "#f0e6e6",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            width: "20%",
            display: "block",
            height: "100%",
          }}
          justify="end"
        >
          <div
            style={{
              width: "100%",
              paddingLeft: "40%",
              marginTop: "1rem",
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: "100%",
                marginTop: "10%",
                fontWeight: "bold",
              }}
            >
              <div
                style={{
                  background: "#c8c8c8",
                  padding: "1rem",
                  borderRadius: "5px",
                }}
              >
                <span>Title</span>
              </div>
            </div>
            <div
              style={{
                display: "inline-block",
                width: "100%",
                marginTop: "10%",
                fontWeight: "bold",
              }}
            >
              <div
                style={{
                  background: "#c0b0b0",
                  padding: "1rem",
                  borderRadius: "5px",
                }}
              >
                <span>Contents</span>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "70%",
            margin: "1rem auto",
            height: "100%",
          }}
        >
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
                }}
                placeholder="제목을 입력하세요"
                defaultValue={props.title}
                onChange={onChangeTitle}
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
                  resize: "none",
                }}
                placeholder="내용을 입력하세요"
                defaultValue={props.content}
                onChange={onChangeContent}
                value={Content}
              />
            </Col>
          </Row>
        </div>
        <div
          style={{
            width: "20%",
            marginTop: "3%",
            marginRight: "5%",
          }}
        >
          <div
            style={{
              height: "150px",
              width: "150px",
              position: "absolute",
            }}
          >
            {FilePath && (
              <div>
                <img
                  style={{
                    height: "150px",
                    width: "150px",
                    position: "absolute",
                  }}
                  src={`http://localhost:5000/${FilePath}`}
                  alt="img"
                />
              </div>
            )}

            <Dropzone onDrop={onDrop} multiple={false} maxSize={10000000}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    margin: "3rem 3rem",
                    position: "absolute",
                    opacity: "75%",
                    background: "gray",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {!FilePath && (
                    <Button
                      icon={<PlusOutlined />}
                      style={{ fontSize: "3rem" }}
                    />
                  )}
                  {FilePath && (
                    <Button
                      icon={<CameraOutlined />}
                      style={{ fontSize: "3rem" }}
                    />
                  )}
                </div>
              )}
            </Dropzone>
          </div>
          <div style={{ width: "150px", height: "150px" }}></div>
          <div>
            <Button
              style={{
                background: "#c2c2c2",
                borderRadius: "5px",
                marginTop: "20%",
                marginLeft: "50%",
              }}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modify;
