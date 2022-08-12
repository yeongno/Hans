import {
  PAGE_FAVORITE,
  PAGE_HOME,
  PAGE_LOGIN,
  PAGE_ModifyMy,
  PAGE_MYPROFILE,
  PAGE_PROFILE,
  PAGE_REGISTER,
  PAGE_WRITE,
} from "./types";

export function myProFile(dataToSubmit1) {
  return {
    type: PAGE_MYPROFILE,
    payload: dataToSubmit1,
  };
}

export function proFile(dataToSubmit1) {
  return {
    type: PAGE_PROFILE,
    payload: dataToSubmit1,
  };
}
export function home(dataToSubmit1) {
  return {
    type: PAGE_HOME,
    payload: dataToSubmit1,
  };
}
export function write(dataToSubmit1) {
  return {
    type: PAGE_WRITE,
    payload: dataToSubmit1,
  };
}
export function login(dataToSubmit1) {
  return {
    type: PAGE_LOGIN,
    payload: dataToSubmit1,
  };
}
export function register(dataToSubmit1) {
  return {
    type: PAGE_REGISTER,
    payload: dataToSubmit1,
  };
}
