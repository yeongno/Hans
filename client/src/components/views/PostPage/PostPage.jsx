import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postGo } from "../../../_actions/post_action";

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

  const navigate = useNavigate();

  const getmongo = (event) => {
    event.preventDefault();

    const mongodb = axios.get("/api/dbsrc").then(function (response) {
      return response.data;
    });

    return mongodb;
  };
  const onContent = (event) => {
    setContents(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log("Title", Title);
    console.log("Content", Content);
    let body = {
      title: Title,
      content: Content,
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
        <button onClick={onSubmitHandler}>Submit</button>
        <input type="text" value={Contentset} onChange={onContent} />
      </form>
      <button onClick={getmongo}>gd</button>
    </div>
  );
}

export default PostPage;
