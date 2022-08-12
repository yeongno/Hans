import axios from "axios";
import {
  POST_GET,
  POST_GO,
  POST_ONEGET,
  COMMENT_GO,
  POST_CMT_GET,
  TOPIC_GET,
  TOPIC_GO,
  POST_TOPIC_SEARCH,
  POST_GET_TOPIC,
  FRIEND_GO,
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
//친구 추가
export function addFriendGo(dataToSubmit1) {
  const request = axios
    .post("/api/users/addFriend", dataToSubmit1)
    .then((response) => response.data);

  return {
    type: FRIEND_GO,
    payload: request,
  };
}
//토픽 전송
export function topicGo(dataToSubmit1) {
  const request = axios
    .post("/api/topics/topic", dataToSubmit1)
    .then((response) => response.data);

  return {
    type: TOPIC_GO,
    payload: request,
  };
}

//토픽 전송
export function topicSearch(dataToSubmit1) {
  const request = axios
    .post("/api/topics/getPostTopic", dataToSubmit1)
    .then((response) => response.data);

  return {
    type: POST_TOPIC_SEARCH,
    payload: request,
  };
}
export function getTopic(dataToSubmit1) {
  const request = axios
    .post("/api/topics/getTopic", dataToSubmit1)
    .then((response) => response.data);

  return {
    type: TOPIC_GET,
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
export function getPostTopic(dataToSubmit1) {
  const request = axios
    .post("/api/posts/getPostTopic", dataToSubmit1)
    .then((response) => response.data);

  return {
    type: POST_GET_TOPIC,
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
