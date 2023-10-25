import React, { useEffect, useRef } from "react"
import classes from '../../pages/Approval/Approval.module.css';
import ApprovalEditButtons from "./ApprovalEditButtons"
import ApprovalAttachment from "./ApprovalAttachment"
import BoardTitle from "../../Layout/BoardTitle"
import Resination from "./ApprovalType/Resination"
import Common from "./ApprovalType/Common";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { selectedActions } from "../../store/Approval/approval-slice";

const ApprovalEdit = () => {
  const boardTitle = {
    title: '전자결재 > 새 결재 작성'
  }
  const documentType = useSelector((state : RootState) => state.approval.documentType);
  const dispatch = useDispatch();

  // useRef를 사용하여 이전 documentType 저장
  const prevDocumentType = useRef(documentType);


  useEffect(() => {
    if (prevDocumentType.current !== documentType) {
      // 이전 documentType와 현재 documentType이 다른 경우에만 실행
      dispatch(selectedActions.resetArray());
      prevDocumentType.current = documentType; // 이전 documentType 업데이트
      dispatch(selectedActions.updateDocumentType(documentType));
    }
  }, [documentType, dispatch])

  return (
    <React.Fragment>
      <BoardTitle title={boardTitle.title}/>
      <div className="index-box">
        <div className={classes['inner-container']}>
          <div className={classes['approval__document']}>
            <ApprovalEditButtons />
            <div className={classes['approval-wrapper']}>
              {documentType === 'common' && <Common /> }
              {documentType === 'resignation' && <Resination /> }
            </div>
            <ApprovalAttachment />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ApprovalEdit