import axios from "axios";
import { REGISTER_BOARD } from "./types";
import { FILE_UPLOAD } from "./types";

export function fileUpload(dataToSubmit) {
  const request = axios
    .post("/api/Board/create", dataToSubmit)
    .then((response) => response.data);

  return {
    type: FILE_UPLOAD,
    payload: request,
  };
}

export function registerBoard(dataToSubmit) {
  const request = axios
    .post("/api/Board/create", dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_BOARD,
    payload: request,
  };
}
