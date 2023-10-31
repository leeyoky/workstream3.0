import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Employee {
  id: number;
  empNo: number;
  name: string;
  duty: string;
  rankName: string;
  approvalType: string;
  index: number;
}

interface ApprovalState {
  documentType: string;   // 품의서 종류
  selectedOption: string;   // 결재방식 선택
  approvalType: string;   
  agreementType: string;    // 힙의방식 선택
  approvers: Employee[];
}

const initialState: ApprovalState = { 
  documentType: '',
  selectedOption: '',
  approvalType: '',
  agreementType: '',
  approvers: [],
};
// 결재자는 기안자와 최종결재권자 포함 최대 6명
// 합의자는 최대 7명까지

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

    // 합의 라인 방식 선택 옵션
    updateSelectedAgreementOption(state, action: PayloadAction<string>) {
      state.agreementType = action.payload;
    },

    // 결재 직원을 추가
    addEmp(state, action: PayloadAction<Employee>) {
      const newEmp = action.payload;
      const isDuplicate = state.approvers.find((emp) => emp.name === newEmp.name);
      // 새로운 배열을 생성하고 새로운 직원을 추가
      if (!isDuplicate) {
        state.approvers = [...state.approvers, newEmp];
      } else {
        return;
      }
    },

    // 직원 중 결재직원 선택
    updateApprovers(state, action: PayloadAction<{ indexes: number[]; approvalType: string }>) {
      const { indexes, approvalType } = action.payload;
      // 선택한 직원들의 index를 사용하여 approvalType을 업데이트
      state.approvers = state.approvers.map((employee, index) => {
        if (indexes.includes(index)) {
          return { ...employee, approvalType };
        }
        return employee;
      });
    },
    setApprovers(state, action: PayloadAction<Employee[]>) {
      state.approvers = action.payload;
    },
    // 개별 삭제
    removeEmp(state, action: PayloadAction<string>){
      const confirmDelete = window.confirm('식제하시겠습니까?');
      if (confirmDelete) {
        state.approvers = state.approvers.filter(employee => employee.name !== action.payload);
      }
    },
    removeAllEmps(state) {
      state.approvers = [];
    },
    resetArray(state) {
      state.documentType = '';
      state.selectedOption = '';
      state.agreementType = '';
      state.approvers = [];
    }
  },
});

export const selectedActions = approvalSlice.actions;

export default approvalSlice;
