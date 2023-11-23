import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApprovalState, Employee } from "../../types/Approval/Approaval";

const initialState: ApprovalState = { 
  isEditMode: true,
  isDetailMode: true,
  documentType: '',
  selectedOption: 'approval', /* 결재 / 합의 */
  agreementType: 'sequential',  /* 순차 / 병렬 */
  approvers: [],
  isReference: false,
  title: '',
  content:'',
  executeDate: '',
  comment: '',
  pendingCnt: '',
  reasonRetire: '',
  finalSign: false,
  retireDate: '',
};
// 결재자는 기안자와 최종결재권자 포함 최대 6명
// 합의자는 최대 7명까지

const approvalSlice = createSlice({
  name: 'approval',
  initialState,
  reducers: {
    // 결재대기 문서 갯수 셋팅
    setPendingCnt(state, action) {
      state.pendingCnt = action.payload;
    },
    setReference(state, action) {
      state.isReference = action.payload;
    },
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
    addEmp(state, action: PayloadAction<Employee & { index: number }>) {
      const { empNo, name, rankName, duty, approvalType, index } = action.payload;
      const isDuplicate = state.approvers.find((emp) => emp.name === name);
    
      if (!isDuplicate) {
        state.approvers.push({ empNo, name, rankName, duty, approvalType, index });
      } else {
        // 이미 추가된 직원이 있을 때 index를 업데이트
        const existingEmpIndex = state.approvers.findIndex((emp) => emp.name === name);
        if (existingEmpIndex !== -1) {
          state.approvers[existingEmpIndex].index = index;
        }
      }
    },

    // 제목
    setTitle(state, action) {
      state.title = action.payload;
    },
    // 시행날짜
    setDate(state, action){
      state.executeDate = action.payload;
    },
    // 내용
    setContent(state, action) {
      state.content = action.payload;
    },

    /* 사직서 */
    setReasonRitire(state, action) {
      state.reasonRetire = action.payload;
    },
    setFinalSign(state, action) {
      state.finalSign = action.payload;
    },
    setRetireDate(state, action) {
      state.retireDate = action.payload;
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
    // 수정하기
    setIsEditMode(state, action) {
      state.isEditMode = action.payload;
    },
    setIsDetailMode(state, action) {
      state.isDetailMode = action.payload;
    },
    // 댓글
    setComment(state,action) {
      state.comment = action.payload;
    },
    resetArray(state) {
      state.documentType = '';
      state.selectedOption = '';
      state.agreementType = '';
      state.approvers = [];
      state.isEditMode = true;
    },
    resetDocument(state){
      state.selectedOption = '';
      state.agreementType = '';
      state.approvers = [];
      state.title = '';
      state.content = '';
      state.executeDate = '';
    }
  },
});

export const selectedActions = approvalSlice.actions;

export default approvalSlice;
