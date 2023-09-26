import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isLogin : boolean;
  token: string;
}
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false, 
    token: '',
  } as AuthState,

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
    }
  }
})


export const authActions = authSlice.actions;

export default authSlice;