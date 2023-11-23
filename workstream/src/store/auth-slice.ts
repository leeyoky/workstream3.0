import { createSlice } from '@reduxjs/toolkit';
import { EmployeeItem } from '../types/Organization/OrganizationType';
interface AuthState {
  isLogin : boolean;
  token: string;
  empNo: string;
  userInfo?: EmployeeItem;
}
// 한수진 "2022001454"
// 김원봉 "2022001453"
const initialState: AuthState = {
  isLogin: false, 
  token: '',
  empNo: '202201453',
  userInfo: {
    boss: '',
    deptCd: '',
    deptNm: '',
    email: '',
    empNm: '',
    empNo: '',
    loginId: '',
    officeDuty: '',
    officeDutyNm: '',
    rank: '',
    rankNm: '',
  },
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
      state.empNo = '2022001464'
    },
    setUserInfo(state, action){
      state.userInfo = action.payload;
    }
  }
})


export const authActions = authSlice.actions;

export default authSlice;