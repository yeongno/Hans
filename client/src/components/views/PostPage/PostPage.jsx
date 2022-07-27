import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postGo } from "../../../_actions/post_action";
import "./Post.css";

function PostPage() {
  const dispatch = useDispatch();

  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Contentset, setContents] = useState("");

  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const onContentHandler = (event) => {
    setContent(event.currentTarget.value);
  };

  // const getmongo = (event) => {
  //   let body = {
  //     title: Title,
  //     content: Content,
  //     userFrom,
  //   };
  //   event.preventDefault();

  //   axios.post("/api/dbsrc", body).then(function (response) {
  //     if (response.data.success) {
  //       setGood(response.data.content);
  //     } else {
  //       alert("omg");
  //     }
  //   });
  // };
  const onContent = (event) => {
    setContents(event.currentTarget.value);
  };
  const userFrom = localStorage.getItem("userId");
  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log("Title", Title);
    console.log("Content", Content);
    let body = {
      title: Title,
      content: Content,
      userFrom: userFrom,
    };
    dispatch(postGo(body)).then((response) => {
      if (response.payload.success) {
        alert("Successed to post up");
        console.log(response);
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
          <label>Title</label>
          <input type="text" value={Title} onChange={onTitleHandler} />
        </div>
        <div>
          <label>Content</label>
          <input type="text" value={Content} onChange={onContentHandler} />
        </div>
        <button onClick={onSubmitHandler}>Submit1</button>
        <input type="text" value={Contentset} onChange={onContent} />
      </form>
    </div>
  );
}

export default PostPage;
