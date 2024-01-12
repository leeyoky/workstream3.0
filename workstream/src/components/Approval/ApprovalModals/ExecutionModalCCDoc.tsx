import { useEffect, useState } from 'react';
import classes from '../../../pages/Approval/Approval.module.css';
import { useApprovalList } from '../../../hooks/Approval/useApprovalList';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { ApprovalData, ApprovalListItem } from '../../../types/Approval/Approaval';
import { formatDateOnly } from '../../../helpers/formatDateTime';
import { DOCUMENT_TYPES } from '../../../constants/constants';
import Pagination from '../../../Layout/BoardLayout/Pagination/Pagination';
import Modal from '../../../Layout/Modal/Modal';
import { getApprovalData } from '../../../api/axios';

interface ExecutionModalCCDocProps {
  onClose: () => void;
  onData: (data: ApprovalData[]) => void;
}
/**
 * 시행문 작성 시, select 버튼을 누르면 나타나는 모달
 * @param props
 * @returns
 */
const ExecutionModalCCDoc: React.FC<ExecutionModalCCDocProps> = props => {
  const [ccDocData, setCcDocData] = useState<ApprovalListItem[]>([]);
  const { listData } = useApprovalList('modDate,desc');
  const dispatch = useDispatch();

  useEffect(() => {
    setQueryParam();
    setCcDocData(listData);
  }, [listData]);

  const setQueryParam = () => {
    // 페이지 세팅
    dispatch(uiActions.selectPage(0));
    dispatch(uiActions.selectPageSize(15));
    // 가져 오고자 하는 문서함의 상태 : 완료된 문서
    dispatch(uiActions.selectMenu('completed'));
    dispatch(uiActions.setState('APPROVED'));
    // 가져 오고자 하는 문서의 TYPE
    dispatch(uiActions.setDocType('APPROVAL_COMMON'));
  };

  const fetchDocumentData = async (id: string) => {
    try {
      const response = await getApprovalData(id);
      const data = response.data;

      if (data && data.approval) {
        console.log('data', data);
        props.onClose();
        // 부모 컴포넌트로 전달 시, 배열로 감싸서 전달
        props.onData([data]);
      } else {
        console.error('undefined');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseInstModal = () => {
    props.onClose();
  };

  return (
    <Modal isOpen={true} onClose={props.onClose} className="approval_execution-ccdoc-modal">
      <div className={classes['execution-modal-wrapper']}>
        <div className={classes['execution-modal__x-mark-wrapper']}>
          <span>
            <span>참조문서 선택</span>
          </span>
          <span>
            <i className="fa-solid fa-xmark" onClick={handleCloseInstModal}></i>
            <div className={classes['execution-modal__info-wrapper']}>
              <p>완료 된 문서 기준입니다.</p>
            </div>
          </span>
        </div>
        <div className={classes['approval_excution-table-wrapper']}>
          <table className={classes['approval_excution-table']}>
            <tr>
              <th>문서번호</th>
              <th>제목</th>
              <th>문서종류</th>
              <th>기안부서</th>
              <th>기안자</th>
              <th>작성일자</th>
              <th>시행일자</th>
              <th>첨부</th>
            </tr>
            {ccDocData.map((item, index) => (
              <tr key={index} className="table-hover">
                <td>{item.id}</td>
                <td>
                  <span onClick={() => fetchDocumentData(item.id)}>{item.title}</span>
                </td>
                <td>{DOCUMENT_TYPES[item.docType]}</td>
                <td>{item.regUsrDeptNm}</td>
                <td>{item.regUsrNm}</td>
                <td>{formatDateOnly(item.modDate)}</td>
                <td>{formatDateOnly(item.executeDate || '')}</td>
                <td>
                  {item.fileCount > 0 && (
                    <span className="approval-list__paperclip">
                      <i className="fa-solid fa-paperclip"></i>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
        <Pagination />
      </div>
    </Modal>
  );
};

export default ExecutionModalCCDoc;
