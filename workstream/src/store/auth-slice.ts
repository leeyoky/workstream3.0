import { createSlice } from '@reduxjs/toolkit';
import { loginUserItem } from '../types/Organization/OrganizationType';
interface AuthState {
  isLogin: boolean;
  token: string;
  userInfo?: loginUserItem;
}
// 한수진 "2022001454"
// 김원봉 "2022001453"
const initialState: AuthState = {
  isLogin: false,
  token: '',
  userInfo: {
    deptCd: '',
    deptNm: '',
    empNo: '',
    empNm: '',
  },
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
      state.token = '';
      state.userInfo = initialState.userInfo;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    deleteToken(state) {
      state.token = '';
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
