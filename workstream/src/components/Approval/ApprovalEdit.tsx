import { useEffect, useRef, useState } from 'react';
import classes from '../../pages/Approval/Approval.module.css';

import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectedActions } from '../../store/Approval/approval-slice';

import BoardTitle from '../../Layout/BoardLayout/BoardTitle';
import ApprovalEditButtons from './ApprovalButtonsGroup/ApprovalEditButtons';
import ApprovalComment from './ApprovalComment';
import CommonDetail from './ApprovalType/CommonDetail';
import CommonCreate from './ApprovalType/CommonCreate';
import ResinationCreate from './ApprovalType/ResinationCreate';
import ResinationDetail from './ApprovalType/ResinationDetail';
import ExecutionCreate from './ApprovalType/ExecutionCreate';
import ExecutionDetail from './ApprovalType/ExecutionDetail';
import CondolenceCreate from './ApprovalType/CondolenceCreate';
import TransportationCreate from './ApprovalType/TransportationCreate';
import ApprovalAttachment from './Attachment/ApprovalAttachment';

const ApprovalEdit = () => {
  const [temp, setTemp] = useState(false);

  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const dispatch = useDispatch();
  const location = useLocation();
  const isCreate = location.state?.isCreate;

  const boardTitle = {
    title: isCreate ? '전자결재 > 새 문서 작성' : '전자결재 > 문서 상세보기',
  };
  // useRef를 사용하여 이전 documentType 저장
  const prevDocumentType = useRef(documentType);

  useEffect(() => {
    if (prevDocumentType.current !== documentType) {
      // 이전 documentType와 현재 documentType이 다른 경우에만 실행
      dispatch(selectedActions.resetArray());
      prevDocumentType.current = documentType; // 이전 documentType 업데이트
      dispatch(selectedActions.updateDocumentType(documentType));
    }
  }, [documentType, dispatch]);

  return (
    <div className="page-wrapper">
      <BoardTitle title={boardTitle.title} />
      <div className="index-box">
        <div className={classes['inner-container']}>
          <div className={classes['approval__document']}>
            <ApprovalEditButtons temp={temp} type={'top'} />

            <div className={classes['approval-wrapper']}>
              {isCreate ? (
                <>
                  {documentType === 'APPROVAL_COMMON' && <CommonCreate />}
                  {documentType === 'RESIGNATION' && <ResinationCreate />}
                  {documentType === 'EXECUTION' && <ExecutionCreate />}
                  {documentType === 'CONDOLENCE' && <CondolenceCreate />}
                  {documentType === 'TRANSPORTATION' && <TransportationCreate />}
                </>
              ) : (
                <>
                  {documentType === 'APPROVAL_COMMON' && (
                    <CommonDetail temp={temp} setTemp={setTemp} />
                  )}
                  {documentType === 'RESIGNATION' && (
                    <ResinationDetail temp={temp} setTemp={setTemp} />
                  )}
                  {documentType === 'EXECUTION' && (
                    <ExecutionDetail temp={temp} setTemp={setTemp} />
                  )}
                </>
              )}
              <ApprovalAttachment />
            </div>
            <ApprovalEditButtons
              temp={temp}
              className={classes['approval-btn-box__bottom']}
              type={'bottom'}
            />
            {/* TODO: 댯글은 create제외 다 보이게 */}
            {!isCreate && !temp && !(documentType === 'EXECUTION') && <ApprovalComment />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalEdit;
