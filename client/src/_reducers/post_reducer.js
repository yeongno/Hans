// import react from "React";

import {
  POST_GET,
  POST_GO,
  POST_ONEGET,
  UPDATE_FAVORITE,
  COMMENT_GO,
  POST_CMT_GET,
  TOPIC_GO,
  TOPIC_GET,
} from "../_actions/types";

export default function a(state = {}, action) {
  switch (action.type) {
    case POST_GO:
      return { ...state, postSuc: action.payload };
      break;
    case POST_GET:
      return { ...state, postSuc: action.payload };
      break;
    case POST_ONEGET:
      return { ...state, postSuc: action.payload };
      break;
    case COMMENT_GO:
      return { ...state, postSuc: action.payload };
      break;
    case POST_CMT_GET:
      return { ...state, postSuc: action.payload };
      break;
    case TOPIC_GO:
      return { ...state, postSuc: action.payload };
      break;
    case TOPIC_GET:
      return { ...state, postSuc: action.payload };
      break;
    default:
      return state;
  }
}
