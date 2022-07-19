import axios from "axios";
import { POST_GO } from "./types";

export function postGo(dataToSubmit1) {
  const request = axios
    .post("/api/posts/post", dataToSubmit1)
    .then((response) => response.data);

  return {
    type: POST_GO,
    payload: request,
  };
}
