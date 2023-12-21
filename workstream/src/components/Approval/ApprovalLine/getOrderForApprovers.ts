import { Employee } from '../../../types/Approval/Approaval';

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
