import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { postGo, getTopic } from "../../../_actions/post_action";
import "./Post.css";
//에디터 생성에 필요한 모듈을 불러오기
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

//텍스트 에디터로 CK에디터5를 사용했습니다
//CKEditor를 사용하기 위해서는 아래 명령어를 통해 해당 모듈을 설치해야 합니다.
//종합설치
//npm install --save multer dotenv path mime-types uuid
//개별 설치
//npm install multer --save
//npm install dotenv --save
//npm install path --save
//npm install mime-types --save
//npm install uuid --save
//*클라이언트 폴더에도 설치할 것

function PostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Title, setTitle] = useState("제목을 입력하세요"); //제목 변수
  const [Content, setContent] = useState("내용을 입력하세요"); //내용 변수
  const [image, setImage] = useState(""); //이미지 첨부 관련 변수
  const [Topics, setTopics] = useState([]); //토픽 데이터 불러오기 위한 변수
  const [Topic, setTopic] = useState(""); //토픽 설정 변수

  const [flag, setFlag] = useState(false);
  const imgLink = "http://localhost:3000/images"; //이미지 경로 설정 변수
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
  const customUploadAdapter = (loader) => {
    return {
      upload() {
        //메소드 선언
        return new Promise((resolve, reject) => {
          const data = new FormData();
          loader.file.then((file) => {
            data.append("name", file.name);
            data.append("file", file);

            axios
              .post("/api/posts/upload", data)
              .then((res) => {
                if (!flag) {
                  setFlag(true);
                  setImage(res.data.filename);
                }
                resolve({
                  //이미지 첨부 후 에디터에 해당 이미지의 링크가 담긴 태그(<img src="...">)를 자동으로 생성합니다.
                  default: `${imgLink}/${res.data.filename}`,
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
  const onTopicHandler = (event) => {
    setTopic(event.currentTarget.value);
  };
  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const topicList = Topics.map((topics, index) => {
    return <option value={topics.topicName}>{topics.topicName}</option>;
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log("Title", Title);
    console.log("Content", Content);
    let body = {
      topic: Topic,
      title: Title,
      content: Content,
      userFrom: userFrom,
      writer: userName,
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
  };
  return (
    <div>
      <form>
        <div>
          <h2>Write Page</h2>
          <select onChange={onTopicHandler} value={Topic}>
            <option>Select Topic</option>
            {topicList}
          </select>
          <input
            type="text"
            size="100"
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
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
          <br />
        </div>
        <div></div>
        <button onClick={onSubmitHandler}>Submit1</button>
        <button onClick={Cancel1}>Cancel</button>
      </form>
    </div>
  );
}

export default PostPage;
