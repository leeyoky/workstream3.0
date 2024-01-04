import React, { useState, useEffect } from 'react';
import classes from '../../pages/Approval/ApprovalSelect.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { documentTypes } from '../../pages/Approval/ApprovalSearchTag';

interface ApprovalDocumentTypeProps {
  onChange: (documentType: string) => void;
}

const ApprovalModalDocument: React.FC<ApprovalDocumentTypeProps> = props => {
  const documentType = useSelector((state: RootState) => state.approval.documentType);
  const [activeDocumentType, setActiveDocumentType] = useState(documentType); // 초기 선택값 설정
  const [selectedDocumentType, setSelectedDocumentType] = useState(documentType);

  useEffect(() => {
    setActiveDocumentType(selectedDocumentType);
    props.onChange(selectedDocumentType);
  }, [selectedDocumentType]);

  const handleDocumentTypeSelect = (documentType: string) => {
    setSelectedDocumentType(documentType);
  };

  return (
    <div className={classes['document-selector-wrapper']}>
      <div className={classes['card']}>
        <div className={classes['card-header']}>
          <p>문서양식 선택</p>
          <hr />
        </div>
        <div className={classes['document-list']}>
          {documentTypes.map(docType => (
            <div
              key={docType.type}
              className={`${classes['document-item']} 
              ${activeDocumentType === docType.type ? classes['active'] : ''}`}
              onClick={() => {
                handleDocumentTypeSelect(docType.type);
              }}>
              <i className="fa-regular fa-file"></i>
              <span>{docType.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApprovalModalDocument;
