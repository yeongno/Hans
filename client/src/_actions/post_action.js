import axios from "axios";
import {
  POST_GET,
  POST_GO,
  POST_ONEGET,
  COMMENT_GO,
  POST_CMT_GET,
} from "./types";

export function postGo(dataToSubmit1) {
  const request = axios
    .post("/api/posts/post", dataToSubmit1)
    .then((response) => response.data);

  return {
    type: POST_GO,
    payload: request,
  };
}
//댓글 전송
export function commentGo(dataToSubmit1) {
  const request = axios
    .post("/api/comments/comment", dataToSubmit1)
    .then((response) => response.data);

  return {
    type: COMMENT_GO,
    payload: request,
  };
}

export function getPost(dataToSubmit1) {
  const request = axios
    .post("/api/posts/getPost", dataToSubmit1)
    .then((response) => response.data);

  return {
    type: POST_GET,
    payload: request,
  };
}
export function getOnePost(dataToSubmit1) {
  const request = axios
    .post("/api/posts/getOnePost", dataToSubmit1)
    .then((response) => response.data);

  return {
    type: POST_ONEGET,
    payload: request,
  };
}
//댓글 불러오기 액션
export function getThisComments(dataToSubmit1) {
  const request = axios
    .post("/api/comments/getThisComments", dataToSubmit1)
    .then((response) => response.data);

  return {
    type: POST_CMT_GET,
    payload: request,
  };
}
