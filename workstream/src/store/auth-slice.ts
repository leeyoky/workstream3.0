import { createSlice } from '@reduxjs/toolkit';


interface AuthState {
  isLogin : boolean;
  token: string;
  empNo: string;
  userInfo: [];
}
// 한수진 "2022001454"
const initialState: AuthState = {
  isLogin: false, 
  token: '',
  empNo: '',
  userInfo: [],
}
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
    },
    setToken(state,action) {
      state.token = action.payload;
    },
    setEmpNo(state) {
      state.empNo = '2022001454'
    },
    setUserInfo(state, action){
      state.userInfo = action.payload;
    }
  }
})


export const authActions = authSlice.actions;

export default authSlice;