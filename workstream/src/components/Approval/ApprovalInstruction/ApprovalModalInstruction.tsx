import { useSelector } from 'react-redux';
import { useState, ChangeEvent, useEffect } from 'react';
import Modal from '../../../Layout/Modal/Modal';
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import { RootState } from '../../../store';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../../store/Approval/approval-slice';
import useApprovalRequest from './../../../hooks/Approval/useApprovalRequest';
import { useDocumentData } from '../../../hooks/Approval/useDocumentData';
interface ApprovalModalInstructionProps {
  onClose: () => void; // 모달 닫기 핸들러
}

const ApprovalModalInstruction: React.FC<ApprovalModalInstructionProps> = props => {
  const [instruction, setInstruction] = useState('');
  const { id = '' } = useParams<string>();
  const getUserInfo = useSelector((state: RootState) => state.user.userInfo);
  const getDocumentTitle = useSelector((state: RootState) => state.approval.title);
  const userData = useSelector((state: RootState) => state.auth.userInfo?.empNo);
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const documentData = useDocumentData(documentType, id)?.data;
  const { instructionHandler } = useApprovalRequest();
  const dispatch = useDispatch();

  const matchingId = documentData?.line?.find(approval => approval.approver === userData)?.id || 0;

  /* 지시사항 세팅 */
  const instructionChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputComment = e.target.value;

    // 글의 길이 업데이트 및 200자 초과 여부 확인
    const newLength = inputComment.length;

    // 200자를 초과하면 알림 표시
    if (newLength > 200) {
      alert('지시사항은 200자를 초과할 수 없습니다.');
      return;
    }

    setInstruction(inputComment);
  };

  const handleCloseInstModal = () => {
    props.onClose();
  };

  useEffect(() => {
    dispatch(selectedActions.setComment(instruction));
  }, [instruction]);

  return (
    <Modal isOpen={true} onClose={props.onClose}>
      <div className={classes['instruction-container']}>
        <div className={classes['instruction-box']}>
          <div className={classes['instruction-type']}>결재</div>
          <div className={classes['instruction__approver-title']}>
            <div className={classes['instruction-title']}>문서 번호</div>
            <div className={classes['instruction-content']}>{id}</div>
          </div>
          <div className={classes['instruction__approver-title']}>
            <div className={classes['instruction-title']}>결재 문서명</div>
            <div className={classes['instruction-content']}>{getDocumentTitle}</div>
          </div>
          <div className={classes['instruction__approver-title']}>
            <div className={classes['instruction-title']}>최종결재자</div>
            <div className={classes['instruction-content']}>
              {getUserInfo.empNm} {getUserInfo.rankNm}
            </div>
          </div>
          <div className={`${classes['instruction__approver-title']} ${classes['textarea-box']}`}>
            <div className={classes['instruction-title']}>지시사항</div>
            <div className={classes['instruction-content']}>
              <textarea
                spellCheck="false"
                onChange={instructionChangeHandler}
                value={instruction}></textarea>
            </div>
          </div>
        </div>
        <div>
          <i className="fa-solid fa-xmark" onClick={handleCloseInstModal}></i>
        </div>
      </div>
      <div className={classes['instruction__button-box']}>
        <button className="btn btn-red" onClick={() => instructionHandler(matchingId, 'R')}>
          반려
        </button>
        <button className="btn btn-blue" onClick={() => instructionHandler(matchingId, 'Y')}>
          승인
        </button>
      </div>
    </Modal>
  );
};

export default ApprovalModalInstruction;
