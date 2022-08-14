import { CameraOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Select, Input, message, Row, Form } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { postGo, getTopic } from "../../../../../_actions/post_action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  myFavorite,
  myProfileModify,
} from "../../../../../_actions/page_action";
const { Option } = Select;

function Modify(props) {
  const page = useSelector((state) => state.page);
  let navigate = useNavigate();
  const [Title, setTitle] = useState();
  const [Content, setContent] = useState(props.content);
  const [FilePath, setFilePath] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    fetchPostList();
  }, []);

  const fetchPostList = () => {
    axios
      .post("/api/posts/getImgeFile", { _id: props.postFrom })
      .then((response) => {
        if (response.data.success) {
          setFilePath(response.data.posts[0].imagePath);
        }
      });
  };

  const [image, setImage] = useState(""); //이미지 첨부 관련 변수
  const [Topics, setTopics] = useState([]); //토픽 데이터 불러오기 위한 변수
  const [Topic, setTopic] = useState(props.topic); //토픽 설정 변수
  const [Thumbnail, setThumbnail] = useState(
    "uploads/postImg/default-profile-img.png"
  );

  const [flag, setFlag] = useState(false);
  const imgLink = "http://localhost:5000"; //이미지 경로 설정 변수
  const userFrom = localStorage.getItem("userId"); //ID불러오기
  const userName = localStorage.getItem("name"); //이름(닉네임) 불러오기

  //토픽 불러오기
  useEffect(() => {
    fetchTopicList();
  }, []);
  const fetchTopicList = () => {
    dispatch(getTopic({ type: "TOPIC" })).then((response) => {
      if (response.payload.success) {
        setTopics(response.payload.topics);
      } else {
        alert("Load Error");
      }
    });
  };
  //이미지 첨부하기 위한 코드입니다.
  //어뎁터 정의 함수
  const customUploadAdapter = (files) => {
    return {
      upload() {
        //메소드 선언
        return new Promise((resolve, reject) => {
          let formdata = new FormData();
          const config = {
            header: { "content-type": "multipart/form-data" },
          };
          files.file.then((postFile) => {
            formdata.append("file", postFile);

            axios
              .post("/api/users/uploadfiles", formdata, config)
              .then((response) => {
                if (response.data.success) {
                  setFlag(true);
                  setFilePath(response.data.url);
                  setThumbnail(response.data.url);
                  const postFileImg = response.data.url;
                  axios
                    .post("/api/users/uploadPostFileImg", {
                      _id: localStorage.getItem("userId"),
                      postFileImg: postFileImg,
                    })
                    .then((response) => {
                      if (response.data.success) {
                        console.log(response.data.result);
                      } else {
                        alert("이미지 업로드를 실패했습니다.");
                      }
                    });
                }
                resolve({
                  //이미지 첨부 후 에디터에 해당 이미지의 링크가 담긴 태그(<img src="...">)를 자동으로 생성합니다.
                  default: `${imgLink}/${response.data.url}`,
                });
              })
              .catch((err) => reject(err));
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    //에디터에 어뎁터를 활성화하기 위한 팩토리 메소드
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }
  //------------------------------
  function Cancel1() {
    navigate("../PostList");
  }
  const onTopicHandler = (value) => {
    setTopic(value);
  };
  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const topicList = Topics.map((topics, index) => {
    return <Option value={topics.topicName}>{topics.topicName}</Option>;
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (Topic === "") {
      return alert("토픽을 선택하세요.");
    } else if (Title === "") {
      return alert("제목을 입력하세요.");
    } else if (Content === "") {
      return alert("내용을 입력하세요.");
    } else {
      let body = {
        topic: Topic,
        title: Title,
        content: Content,
        userFrom: userFrom,
        writer: userName,
        imagePath: Thumbnail,
      };
      dispatch(postGo(body)).then((response) => {
        if (response.payload.success) {
          alert("Successed to post up");
          console.log(response);
          navigate("../PostList");
        } else {
          console.log(response.payload);
          alert("Failed to post up");
        }
      });
    }
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
  return (
    <div>
      <div style={{ width: "20%", marginTop: "3%", marginRight: "5%" }}>
        <Form>
          <div>
            <Select
              style={{
                borderRadius: "8px",
                width: "120px",
              }}
              onChange={onTopicHandler}
              value={Topic}
              defaultValue={Topic}
            >
              <Option value="">Select Topic</Option>
              {topicList}
            </Select>
            <Input
              style={{
                borderRadius: "8px",
                marginLeft: "122px",
                width: "1041px",
              }}
              placeholder="제목을 입력하세요"
              defaultValue={props.title}
              type="text"
              value={Title}
              onChange={onTitleHandler}
            />
            <br />
            <CKEditor
              editor={ClassicEditor}
              config={{
                //에디터에 업로드 플러그인을 적용시킵니다.
                language: "ko",
                extraPlugins: [uploadPlugin],
              }}
              data={Content}
              placeholder="내용을 입력하세요"
              onReady={(editor) => {}}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
            />
          </div>
          <Button
            style={{
              background: "#0174DF",
              color: "white",
              borderRadius: "5px",
            }}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Modify;
