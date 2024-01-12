import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userSSN: null as number | null,
    address: '',
    homePhone: '',
    mobilePhone: '',
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
  },
  reducers: {
    // 주민번호
    setSSN(state, action) {
      state.userSSN = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
    setHomePhone(state, action) {
      state.homePhone = action.payload;
    },
    setMobilePhone(state, action) {
      state.mobilePhone = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    resetArray(state) {
      (state.userSSN = null),
        (state.address = ''),
        (state.homePhone = ''),
        (state.mobilePhone = '');
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
