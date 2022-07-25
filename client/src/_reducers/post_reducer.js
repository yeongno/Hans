// import react from "React";

import { POST_GET, POST_GO } from "../_actions/types";

export default function a(state = {}, action) {
  switch (action.type) {
    case POST_GO:
      return { ...state, postSuc: action.payload };
      break;
    case POST_GET:
      return { ...state, postSuc: action.payload };
      break;

    default:
      return state;
  }
}
