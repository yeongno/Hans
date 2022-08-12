import {
  PAGE_FAVORITE,
  PAGE_HOME,
  PAGE_LOGIN,
  PAGE_ModifyMy,
  PAGE_MYPROFILE,
  PAGE_PROFILE,
  PAGE_REGISTER,
  PAGE_WRITE,
} from "../_actions/types";

export default function a(state = {}, action) {
  switch (action.type) {
    case PAGE_MYPROFILE:
      return { ...state, currentPage: action.payload };
      break;
    case PAGE_PROFILE:
      return { ...state, currentPage: action.payload };
      break;
    case PAGE_HOME:
      return { ...state, currentPage: action.payload };
      break;
    case PAGE_WRITE:
      return { ...state, currentPage: action.payload };
      break;
    case PAGE_REGISTER:
      return { ...state, currentPage: action.payload };
      break;
    case PAGE_LOGIN:
      return { ...state, currentPage: action.payload };
      break;

    default:
      return state;
  }
}
