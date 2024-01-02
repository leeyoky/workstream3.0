import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
/* import { createLogger } from "redux-logger"; */

import authSlice from './auth-slice';
import uiSlice from './ui-slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import approvalSlice from './Approval/approval-slice';
import thunk from 'redux-thunk';
import textEditorSlice from './textEditor-slice';
import fileSlice from './file-slice';
import userSlice from './User/user-slice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['err'],
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

const isDevelopment = process.env.NODE_ENV === 'development';

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false, // 직렬화 체크 비활성화
    });

    if (isDevelopment) {
      // 개발 모드에서만 사용할 미들웨어 추가
      // middleware.push(createLogger());
    }

    return middleware.concat(thunk);
  },
  devTools: isDevelopment,
});

const persistor = persistStore(store);

export { store, persistor };

export default store;

export type RootState = ReturnType<typeof store.getState>;
