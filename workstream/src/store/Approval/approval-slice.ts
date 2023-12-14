import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApprovalState, ccDept, Employee } from '../../types/Approval/Approaval';

const initialState: ApprovalState = {
  documentCnt: '',
  isEditMode: true,
  isDetailMode: true,
  isReviseMode: false,
  documentType: '',
  selectedOption: 'approval' /* 결재 / 합의 */,
  agreementType: 'sequential' /* 순차 / 병렬 */,
  approvers: [],
  ccDept: [],
  ccUser: [],
  isReference: false,
  title: '',
  content: '',
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
    // 결재 문서함 갯수
    setDocumentCnt(state, action) {
      state.documentCnt = action.payload;
    },
    // 결재대기 문서 갯수 셋팅
    setPendingCnt(state, action) {
      state.pendingCnt = action.payload;
    },
    // 참조자 부서 모달 on/off
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
      const isDuplicate = state.approvers.find(emp => emp.name === name);

      if (!isDuplicate) {
        state.approvers.push({ empNo, name, rankName, duty, approvalType, index });
      } else {
        // 이미 추가된 직원이 있을 때 index를 업데이트
        const existingEmpIndex = state.approvers.findIndex(emp => emp.name === name);
        if (existingEmpIndex !== -1) {
          state.approvers[existingEmpIndex].index = index;
        }
      }
    },

    // 참조 부서 추가
    addRefDepCd(state, action: PayloadAction<ccDept>) {
      const { deptCd, deptNm } = action.payload;

      // 이미 추가된 부서 코드가 아닌 경우에만 배열에 추가
      const isDuplicate = state.ccDept.some(dept => dept.deptCd === deptCd);
      if (!isDuplicate) {
        state.ccDept.push({ deptCd, deptNm });
      }
    },

    // 참조직원 추가
    addRefEmp(state, action: PayloadAction<Employee>) {
      const { empNo, name, rankName, duty, approvalType, index } = action.payload;
      const isDuplicate = state.ccUser.some(emp => emp.empNo === empNo);

      if (!isDuplicate) {
        state.ccUser.push({ empNo, name, rankName, duty, approvalType, index });
      }
    },
    // 전체 참조자/부서 삭제
    removeRef(state) {
      const confirmDelete = window.confirm('전체삭제 하시겠습니까?');
      if (confirmDelete) {
        (state.ccDept = []), (state.ccUser = []);
      }
    },
    // 참조부서 개별 삭제
    removeRefDept(state, action: PayloadAction<string>) {
      const confirmDelete = window.confirm('삭제하시겠습니까?');
      if (confirmDelete) {
        state.ccDept = state.ccDept.filter(dept => dept.deptCd !== action.payload);
      }
    },
    // 참조자 개별 삭제
    removeRefEmp(state, action: PayloadAction<string>) {
      const confirmDelete = window.confirm('삭제하시겠습니까?');
      if (confirmDelete) {
        state.ccUser = state.ccUser.filter(dept => dept.empNo !== action.payload);
      }
    },
    // 제목
    setTitle(state, action) {
      state.title = action.payload;
    },
    // 시행날짜
    setDate(state, action) {
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
    setRefDepCd(state, action: PayloadAction<ccDept[]>) {
      state.ccDept = action.payload;
    },
    setRefEmp(
      state,
      action: PayloadAction<
        {
          deptNm: string;
          empNm: string;
          empNo: string;
          id: number;
          officeDutyNm: string | null | undefined;
          rankNm: string;
        }[]
      >,
    ) {
      state.ccUser = action.payload.map(emp => ({
        empNo: emp.empNo,
        name: emp.empNm,
        duty: emp.officeDutyNm || '', // 적절한 기본값 사용
        rankName: emp.rankNm,
        approvalType: '', // 적절한 기본값 사용
        modDate: '', // 적절한 기본값 사용
        index: 0, // 적절한 기본값 사용
        approvedYn: '', // 적절한 기본값 사용
      }));
    },

    // 개별 삭제
    removeEmp(state, action: PayloadAction<string>) {
      const confirmDelete = window.confirm('삭제하시겠습니까?');
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
    setIsReviseMode(state, action) {
      state.isReviseMode = action.payload;
    },
    // 댓글
    setComment(state, action) {
      state.comment = action.payload;
    },
    resetArray(state) {
      /* detail에서 title받기 위해서 코드 삭제 2023.11.29 */
      state.selectedOption = '';
      state.agreementType = '';
      state.approvers = [];
      state.isEditMode = true;
      state.isReviseMode = false;
      state.ccDept = [];
      state.ccUser = [];
    },
    resetDocument(state) {
      state.selectedOption = '';
      state.agreementType = '';
      state.approvers = [];
      state.title = '';
      state.content = '';
      state.executeDate = '';
      state.ccDept = [];
      state.ccUser = [];
    },
    resetResination(state) {
      state.reasonRetire = '';
      state.retireDate = '';
      state.finalSign = false;
    },
  },
});

export const selectedActions = approvalSlice.actions;

export default approvalSlice;
