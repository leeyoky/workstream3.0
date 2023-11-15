import React, { useEffect, useRef, useState } from "react"
import classes from '../../pages/Approval/Approval.module.css';
import ApprovalEditButtons from "./ApprovalEditButtons"
import ApprovalAttachment from "./ApprovalAttachment"
import BoardTitle from "../../Layout/BoardTitle"
import Resination from "./ApprovalType/ResinationCreate"
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { selectedActions } from "../../store/Approval/approval-slice";
import { useSelector } from "react-redux";
import CommonCreate from "./ApprovalType/CommonCreate";
import { useLocation } from "react-router-dom";
import CommonDetail from "./ApprovalType/CommonDetail";
import ApprovalComment from "./ApprovalComment";

const ApprovalEdit = () => {
  const [temp, setTemp] = useState(false);
  const [data, setData] = useState(null);

  const documentType = useSelector((state : RootState) => state.approval.documentType);
  const dispatch = useDispatch();
  const location = useLocation();
  const isCreate = location.state?.isCreate;
  
  const boardTitle = {
    title: isCreate? '전자결재 > 새 결재 작성' : '전자결재 > 문서 상세보기'
  }
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
            <ApprovalEditButtons temp={temp} />

            <div className={classes['approval-wrapper']}>
              {isCreate ? (
                <>
                {documentType === 'APPROVAL_COMMON' && <CommonCreate /> }
                {documentType === 'RESIGNATION' && <Resination /> }
                </>
              ):(
                <CommonDetail temp={temp} setTemp={setTemp} setData={setData}/>
              )}
              
            <ApprovalAttachment />
            </div>
            {!isCreate &&
            <ApprovalComment />
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ApprovalEdit