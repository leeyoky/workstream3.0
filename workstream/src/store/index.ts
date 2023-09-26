import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// 1. authSlice.reducer를 직접 사용하는 대신 combineReducers를 사용하여 rootReducer를 생성합니다.
const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };

export default store;

export type RootState = ReturnType<typeof store.getState>;