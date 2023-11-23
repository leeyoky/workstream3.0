import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice ({
  name: 'user',
  initialState: {
    userSSN: null as number | null,
    address: '',
    homePhone: '',
    mobilePhone: '',
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
    }
}
})

export const userAction = userSlice.actions;

export default userSlice;
