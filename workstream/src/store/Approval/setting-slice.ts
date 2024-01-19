import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  progressReason: '',
  startDate: '',
  endDate: '',
};

const approvalSettingSlice = createSlice({
  name: 'approvalSetting',
  initialState,
  reducers: {
    setprogressReason(state, action) {
      state.progressReason = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
  },
});

export const approvalSettingActions = approvalSettingSlice.actions;

export default approvalSettingSlice;
