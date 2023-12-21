import { ApprovalData, ResignationData } from '../types/Approval/Approaval';

export const isApprovalData = (data: any): data is ApprovalData => {
  return data && 'approval' in data;
};

export const isResignationData = (data: any): data is ResignationData => {
  return data && 'resignation' in data;
};
