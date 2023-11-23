import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import uiSlice from "./ui-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import approvalSlice from "./Approval/approval-slice";
import thunk from "redux-thunk";
import textEditorSlice from "./textEditor-slice";
import fileSlice from "./file-slice";
import userSlice from "./User/user-slice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["err"],
};

// 1. authSlice.reducer를 직접 사용하는 대신 combineReducers를 사용하여 rootReducer를 생성합니다.
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  ui: uiSlice.reducer,
  approval: approvalSlice.reducer,
  textEditor: textEditorSlice.reducer,
  file: fileSlice.reducer,
  user: userSlice.reducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // 사이트 최초 접근 시 로딩 시간이 오래걸리는 문제
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, // 직렬화 체크를 비활성화합니다.
    }).concat(thunk);
  },
  devTools: true,
});

const persistor = persistStore(store);

export { store, persistor };

export default store;

export type RootState = ReturnType<typeof store.getState>;