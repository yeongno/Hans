import {
  PAGE_FAVORITE,
  PAGE_HOME,
  PAGE_ModifyMy,
  PAGE_MYPROFILE,
  PAGE_PROFILE,
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
