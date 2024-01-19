import React from 'react';
import Modal from '../../../Layout/Modal/Modal';
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import ApprovalEmpSelector from '../ApprovalLine/ApprovalEmpSelector';
import ApprovalOrganization from '../ApprovalLine/ApprovalOrganization';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../../store/Approval/approval-slice';
import { updatedApprovalLine } from '../../../api/axios';
import { useParams } from 'react-router-dom';
import { updateApprovalLineData } from '../../../types/Approval/Approaval';
interface ApprovalCreateProps {
  onClose: () => void; // 모달 닫기 핸들러
  isEdit?: boolean; // 편집
}

/**
 * 결재자 지정 버튼을 누르면 나타나는 결재자 편집 모달
 * @param props
 * @returns
 */

const ApprovalModalEmpEdit: React.FC<ApprovalCreateProps> = props => {
  const newUpdateApprovers = useSelector((state: RootState) => state.approval.updateApprovers);
  const isDetail = useSelector((state: RootState) => state.approval.isDetailMode);
  const isEdit = useSelector((state: RootState) => state.approval.isEditMode);
  const approvers = useSelector((state: RootState) => state.approval.updateApprovers);
  const { id = '' } = useParams();
  const dispatch = useDispatch();
  const isDetailMode = isDetail === true && isEdit === false;

  const closeModalHandler = () => {
    props.onClose();
    dispatch(selectedActions.setApprovers(newUpdateApprovers));
  };

  const approvalLineChangeHandler = async (id: string) => {
    const result = window.confirm('지금 상태로 결재라인을 수정하시겠습니까?');
    if (result) {
      // 리덕스에서 approver 배열을 가져와서 approvedYn이 'Y'인 걸 제외하고 새배열 만들기
      const updateApprovers = approvers.filter(approver => approver.approvedYn === 'N');
      const formDataArray: updateApprovalLineData[] = updateApprovers.map(approver => ({
        apprType: approver.approvalType,
        approver: approver.empNo,
        deferredYn: approver.deferredYn,
        overrideYn: approver.overrideYn,
        order: approver.order,
      }));
      console.log('approvers', approvers);
      try {
        console.log('formDataArray', formDataArray);
        const response = await updatedApprovalLine(id, formDataArray);
        if (response.status === 204) {
          alert('수정 성공');
          props.onClose();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Modal isOpen={true} isEdit={props.isEdit} onClose={props.onClose}>
      <div className={classes['approval-container']}>
        <div className={classes['organizaion-selector-wrapper']}>
          <React.Fragment>
            <ApprovalOrganization />
            <ApprovalEmpSelector isEdit={props.isEdit} />
          </React.Fragment>
        </div>
        <div className={classes['button--box']}>
          <button
            className={classes['button--complete']}
            onClick={isDetailMode ? () => approvalLineChangeHandler(id) : closeModalHandler}>
            {isDetailMode ? '수정' : '완료'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ApprovalModalEmpEdit;
