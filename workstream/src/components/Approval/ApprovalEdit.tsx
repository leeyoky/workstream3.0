import React from "react"
import store from "../../store"
import ApprovalEditButtons from "./ApprovalEditButtons"
import ApprovalAttachment from "./ApprovalAttachment"
import BoardTitle from "../../Layout/BoardTitle"
import Common from "./ApprovalType/Common"
import Resination from "./ApprovalType/Resination"

const ApprovalEdit = () => {
  const boardTitle = {
    title: '전자결재 > 새 결재 작성'
  }
  const documentType = store.getState().approval.documentType

  return (
    <React.Fragment>
      <BoardTitle title={boardTitle.title}/>
      <div className="index-box">
        <div className="inner-container">
          <ApprovalEditButtons />
          {documentType === 'common' && <Common /> }
          {documentType === 'resignation' && <Resination /> }
          <ApprovalAttachment />
        </div>
      </div>
    </React.Fragment>
  )
}

export default ApprovalEdit