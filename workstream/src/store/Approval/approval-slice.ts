import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Employee {
  name: string;
}

interface ApprovalState {
  documentType: string;
  selectedOption: string;
  approvers: Employee[];
  agreements: Employee[];
}

const initialState: ApprovalState = { 
  documentType: '',
  selectedOption: '',
  approvers: [],
  agreements: [],
};
// 결재 직원 최대 수와 합의 직원 최대 수

const MAX_APPROVERS = 4;
const MAX_AGREEMENTS = 2;

const approvalSlice = createSlice({
  name: 'approval',
  initialState,
  reducers: {
    // 문서 종류
    updateDocumentType(state, action: PayloadAction<string>) {
      state.documentType = action.payload;
    },
    // 결재 라인 방식 선택 옵션
    updateSelectedOption(state, action: PayloadAction<string>) {
      state.selectedOption = action.payload;
    },
    // 결재 직원을 추가
    addEmp(state, action: PayloadAction<Employee>) {
      const newEmp = action.payload;
      const isDuplicate = state.approvers.find((emp) => emp.name === newEmp.name);
      if (state.approvers.length < MAX_APPROVERS  && !isDuplicate) {
        state.approvers.push(newEmp);
      } else {
        return;
      }
    },
    // 합의 직원을 추가
    addAgreement(state, action: PayloadAction<Employee>) {
      const newAgreement = action.payload;
      if (state.approvers.length === 4 && state.agreements.length < MAX_AGREEMENTS) {
        const isDuplicate = state.agreements.find((emp) => emp.name === newAgreement.name);
        const isDuplicateApprovers = state.approvers.find((emp) => emp.name === newAgreement.name)
        if (!isDuplicate && !isDuplicateApprovers) {
          state.agreements.push(newAgreement);
        } else {
          return;
        }
      }
    },
    updateApprovers(state, action: PayloadAction<Employee[]>) {
      state.approvers = [...action.payload];
    },
    updateAgreements(state, action: PayloadAction<Employee[]>) {
      state.agreements = [...action.payload];
    },
    removeAllEmps(state) {
      state.approvers = [];
      state.agreements = [];
    },
    removeAgreements(state){
      state.agreements = [];
    },
    undoEmp(state) {
      console.log('undoEmp');
      
      if (state.approvers.length > 0) {
        state.approvers.pop();
      }
    },
    undoAgreement(state) {
      console.log('undoAgreement');
      
      if (state.agreements.length > 0) {
        state.agreements.pop();
      }
    },
    resetArray(state) {
      state.documentType = '';
      state.approvers = [];
      state.agreements = [];
    }
  },
});

export const selectedActions = approvalSlice.actions;

export default approvalSlice;
