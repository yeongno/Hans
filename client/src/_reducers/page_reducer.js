import { PAGE_FAVORITE, PAGE_ModifyMy } from "../_actions/types";

export default function a(state = {}, action) {
  switch (action.type) {
    case PAGE_ModifyMy:
      return { ...state, myModify: action };
      break;
    case PAGE_FAVORITE:
      return { ...state, myModify1: action };
      break;
    default:
      return state;
  }
}
