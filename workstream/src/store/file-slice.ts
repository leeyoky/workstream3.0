import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileState {
  files: File[];
  serverFiles: [];
}

const initialState: FileState = {
  files: [], // 초기 상태를 빈 배열로 설정
  serverFiles: [],
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    updateSelectedFiles: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
    },
    updateServerFiles(state, action) {
      state.serverFiles = action.payload;
    },
    resetFiles(state) {
      state.files = [];
    },
    resetServerFiles(state) {
      state.serverFiles = [];
    },
  },
});

export const fileActions = fileSlice.actions;

export default fileSlice;
