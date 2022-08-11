import { combineReducers } from "redux";
import user from "./user_reducer";
import post from "./post_reducer";
import page from "./page_reducer";
// import comment from './comment_reducer'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  // whitelist: ["page", "post", "user"],
  // blacklist -> 그것만 제외합니다
};

const counterPersistConfig = {
  key: "counter",
  storage: storage,
};

// const rootReducer = combineReducers({
//   counterReducer: persistReducer(counterPersistConfig, counterReducer),
// });
const rootReducer = combineReducers({
  // user,
  // post,
  page1: persistReducer(persistConfig, page),
});

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;
