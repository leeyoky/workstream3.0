import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FileState {
  files: File[];
}

const initialState: FileState = {
  files: [], // 초기 상태를 빈 배열로 설정
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    updateSelectedFiles: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
    },
  },
});

export const fileActions = fileSlice.actions;

export default fileSlice;
