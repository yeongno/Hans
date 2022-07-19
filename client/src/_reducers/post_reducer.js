// import react from "React";

import { POST_GO } from "../_actions/types";

export default function a(state = {}, action) {
  switch (action.type) {
    case POST_GO:
      return { ...state, postSuc: action.payload };
      break;

    default:
      return state;
  }
}
