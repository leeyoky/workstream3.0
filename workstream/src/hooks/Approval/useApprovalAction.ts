import { useSelector } from 'react-redux';
import { fetchApproveDocument, fetchComment, updateApproveDocument } from '../../api/axios';
import { selectedActions } from '../../store/Approval/approval-slice';
import { RootState } from '../../store';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/**
 * @description 결재와 관련 된 커스텀 훅
 */

const useApprovalAction = () => {
  const [approvedYn, setApprovedYn] = useState('');
  const [isInstModalOpen, setIsInstModalOpen] = useState(false);
  const instructionComment = useSelector((state: RootState) => state.approval.comment);

  const { id = '' } = useParams<string>();
  const dispatch = useDispatch();

  // 지시사항 모달 열기
  const handleShowInstModal = () => {
    setIsInstModalOpen(true);
  };
  // 지시사항 모달 닫기
  const handleCloseInstModal = () => {
    setIsInstModalOpen(false);
  };

  /**
   * @description 결재 승인 / 반려
   * @param approverId
   * @param result
   */
  const approveDocumentHandler = async (approverId: number, result: 'Y' | 'R') => {
    const confirmMsg = `${result === 'Y' ? '승인하시겠습니까?' : '반려하시겠습니까?'}`;
    if (window.confirm(confirmMsg)) {
      try {
        const approveData = {
          id: approverId,
          approvedYn: result,
        };
        const response = await fetchApproveDocument(approveData);
        console.log(response);
        if (response.status === 403) {
          alert('권한이 없습니다.');
        }
        if (response.status === 204) {
          setApprovedYn(result);
          alert(`${result === 'Y' ? '결재를 승인하였습니다.' : '결재를 반려하였습니다.'}`);
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  /**
   * @description 최종결재
   * @param approverId
   * @param result
   */
  const instructionHandler = async (approverId: number, result: 'Y' | 'R') => {
    const confirmMsg = `${result === 'Y' ? '승인하시겠습니까?' : '반려하시겠습니까?'}`;

    /* 승인 할때 */
    if (window.confirm(confirmMsg)) {
      const commentData = {
        apprId: id,
        comment: instructionComment,
      };
      const approveData = {
        id: approverId,
        approvedYn: result,
      };
      try {
        if (result === 'R' && !commentData.comment.trim()) {
          alert('반려의 경우 반려 사유는 필수 입력사항입니다.');
          return;
        }

        if (commentData.comment) {
          const response = await fetchComment(commentData);

          if (response.status === 201) {
            dispatch(selectedActions.setComment(''));
          }
        }
        const response = await fetchApproveDocument(approveData);
        console.log(response);
        if (response.status === 403) {
          alert('권한이 없습니다.');
        }
        if (response.status === 204) {
          setApprovedYn(result);
          alert(`${result === 'Y' ? '결재를 승인하였습니다.' : '결재를 반려하였습니다.'}`);
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  /**
   * @description 결재 승인 / 취소
   * @param id
   */
  const updateApprovalHandler = async (id: number) => {
    const confirmMsg = '기존의 결재를 회수하시겠습니까?';
    if (window.confirm(confirmMsg)) {
      try {
        const response = await updateApproveDocument(id);
        console.log(response);
        if (response.status === 204) {
          alert('결재회수 하였습니다.');
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return {
    approvedYn,
    setApprovedYn,
    isInstModalOpen,
    handleShowInstModal,
    handleCloseInstModal,
    approveDocumentHandler,
    updateApprovalHandler,
    instructionHandler,
  };
};

export default useApprovalAction;
