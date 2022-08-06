import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { TextArea } = Input;

//썸네일 생성
//window에서 ffmpeg 다운 후
//npm install fluent-ffmpeg --save
const PrivateOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];
const CategoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Auto & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "pets & Animals" },
];

function UploadVideoPage(props) {
  //redux의 state에 있는 모든 user 정보들이 선언한 해당 변수에 담긴다.
  const user = useSelector((state) => state.user);

  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState("Film & Animation");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");
  const navigate = useNavigate();

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);

        let variable = {
          url: response.data.url,
          fileName: response.data.fileName,
        };
        setFilePath(response.data.url);
        axios.post("/api/video/thumbnail", variable).then((response) => {
          if (response.data.success) {
            setDuration(response.data.duration);
            setThumbnailPath(response.data.url);
          } else {
            alert("썸네일 생성에 실패 했습니다.");
          }
        });
      } else {
        alert("비디오 업로드를 실패했습니다.");
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      title: VideoTitle,
      descripttion: Description,
      privacy: Private,
      filePath: FilePath,
      Category: Category,
      duration: Duration,
      thumbnail: ThumbnailPath,
    };
    console.log(variables);
    axios.post("api/video/uploadVideo", variables).then((response) => {
      if (response.data.success) {
        message.success("성공적으로 업로드를 했습니다.");

        setTimeout(() => {
          navigate("/postlist");
        }, 3000);
      } else alert("비디오 업로드에 실패 했습니다.");
    });
  };

  return (
    <div>
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Title level={2}>Upload Video</Title>
        </div>
        <Form onSubmit={onSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* Drop Zone */}
            <Dropzone onDrop={onDrop} multiple={false} maxSize={10000000}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <Button
                    icon={<PlusOutlined />}
                    style={{ fontSize: "3rem" }}
                  />
                </div>
              )}
            </Dropzone>

            {/* thumbNail Zone */}
            {ThumbnailPath && (
              <div>
                <img
                  src={`http://localhost:5000/${ThumbnailPath}`}
                  alt="thumbnail"
                />
              </div>
            )}
          </div>
          <br />
          <br />
          <label>Title</label>
          <Input value={VideoTitle} onChange={onTitleChange} />
          <br />
          <br />
          <label>Descripttion</label>
          <TextArea onChange={onDescriptionChange} value={Description} />
          <br />
          <br />
          <select>
            {PrivateOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <br />
          <br />
          <select>
            {CategoryOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <br />
          <br />{" "}
          <Button type="primary" size="large" onClick={onSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default UploadVideoPage;
