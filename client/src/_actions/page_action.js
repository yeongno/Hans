import { PAGE_FAVORITE, PAGE_ModifyMy } from "./types";

export function myProfileModify(dataToSubmit1) {
  return {
    type: PAGE_ModifyMy,
    payload: dataToSubmit1,
  };
}

export function myFavorite(dataToSubmit1) {
  return {
    type: PAGE_FAVORITE,
    payload: dataToSubmit1,
  };
}
