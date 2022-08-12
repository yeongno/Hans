import axios from "axios";
import { VisitBooks_GO, VisitBooks_GET } from "./types";

//방명록 등록
export function vbookGo(dataToSubmit1) {
  const request = axios
    .post("/api/visitorBooks/vBook", dataToSubmit1)
    .then((response) => response.data);

  return {
    type: VisitBooks_GO,
    payload: request,
  };
}

//댓글 불러오기 액션
export function getThisVBooks(dataToSubmit1) {
  const request = axios
    .post("/api/visitorBooks/getThisVBooks", dataToSubmit1)
    .then((response) => response.data);

  return {
    type: VisitBooks_GET,
    payload: request,
  };
}
