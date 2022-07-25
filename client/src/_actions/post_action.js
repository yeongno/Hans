import axios from "axios";
import { POST_GET, POST_GO } from "./types";

export function postGo(dataToSubmit1) {
  const request = axios
    .post("/api/posts/post", dataToSubmit1)
    .then((response) => response.data);

  return {
    type: POST_GO,
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
