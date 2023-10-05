import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Employee {
  name: string;
}

interface ApprovalState {
  approvers: Employee[];
}

const initialState: ApprovalState = { 
  approvers: []
};

const approvalSlice = createSlice({
  name: 'approval',
  initialState,
  reducers: {
    addEmp(state, action: PayloadAction<Employee>) {
      console.log("클릭했숨당");
      const newEmp = action.payload;
      const isDuplicate = state.approvers.find((emp) => emp.name === newEmp.name);
      if(state.approvers.length < 4 && !isDuplicate ) {
        state.approvers.push(newEmp); // 직원 추가
        console.log('Added employee:', newEmp.name); // 직원 추가 로그
      }else{
        return;
      }
    },
    removeAllEmps(state) {
      state.approvers = [];
      console.log("일괄삭제");
    },
    undoEmp(state) {
      console.log("UNDO");
      if(state.approvers.length > 0){
        const popEmp = state.approvers.pop();
        if(popEmp){
          console.log("POP EMP");
        }else{
          console.log("THE ARRAY IS EMPTY");
          
        }
      }
    }
  },
});

export const selectedActions = approvalSlice.actions;

export default approvalSlice;
