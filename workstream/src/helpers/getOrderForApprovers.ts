import { Employee } from '../types/Approval/Approaval';

/**
 * 합의 병렬일때 합의가 연속 될 시, 같은 order를 부여해서 새로운 배열을 생성
 * @param approvers
 * @param agreementType
 * @returns
 */
const getOrderForApprovers = (approvers: Employee[], agreementType: string) => {
  let order = 0;
  let prevApprovalType = '';

  return approvers.map(approver => {
    if (agreementType === 'parallel') {
      if (approver.approvalType === 'CONSENSUAL') {
        if (prevApprovalType !== 'CONSENSUAL') {
          order += 1;
        }
        prevApprovalType = 'CONSENSUAL';
      } else {
        order += 1;
        prevApprovalType = '';
      }
    } else {
      order += 1;
      prevApprovalType = '';
    }

    return {
      ...approver,
      order: order,
    };
  });
};

export { getOrderForApprovers };
