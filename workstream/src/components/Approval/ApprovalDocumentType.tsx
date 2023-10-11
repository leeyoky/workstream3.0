import { useState } from 'react';
import classes from '../../pages/Approval/ApprovalSelect.module.css';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../store/Approval/approval-slice';

const ApprovalDocumentType = () => {
  const documentTypes = [
    { type: 'common', label: '기본 품의서' },
    { type: 'resignation', label: '사직원' },
  ];

  const [activeDocumentType, setActiveDocumentType] = useState('');
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  
  const dispatch = useDispatch();

  const handleDocumentTypeSelect = (documentType: string) => {
    setSelectedDocumentType(documentType);
    dispatch(selectedActions.updateDocumentType(documentType));
  };
  return (
    <div className={classes['document-selector-wrapper']}>
      <div className={classes['card']}>
        <div className={classes['card-header']}>
          <p>문서양식 선택</p>
          <hr />
        </div>
        <div className={classes['card-search']}>
          <input type="text" placeholder="문서 양식을 검색해주세요." />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className={classes['document-list']}>
          {documentTypes.map((docType) => (
            <div
              key={docType.type}
              className={`${classes['document-item']} 
              ${activeDocumentType === docType.type ? classes['active'] : ''}`}
              onClick={() => {
                handleDocumentTypeSelect(docType.type);
                setActiveDocumentType(docType.type);
              }}
            >
              <i className="fa-regular fa-file"></i>
              <span>{docType.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ApprovalDocumentType