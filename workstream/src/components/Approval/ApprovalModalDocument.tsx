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
  const [openFolders, setOpenFolders] = useState<string[]>([]); // 레벨 2 폴더들의 목록

  useEffect(() => {
    setActiveDocumentType(selectedDocumentType);
    props.onChange(selectedDocumentType);
  }, [selectedDocumentType]);

  const handleDocumentTypeSelect = (documentType: string) => {
    setSelectedDocumentType(documentType);
  };

  const handleFolderToggle = (folderType: string) => {
    // 폴더를 토글하는 로직을 추가
    setActiveDocumentType(prevActiveType => (prevActiveType === folderType ? '' : folderType));
    // 레벨 2 폴더를 열거나 닫을 때 openFolders 목록을 업데이트
    setOpenFolders(prevOpenFolders => {
      if (prevOpenFolders.includes(folderType)) {
        return prevOpenFolders.filter(folder => folder !== folderType);
      } else {
        return [...prevOpenFolders, folderType];
      }
    });
    console.log(openFolders);
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
              className={`${classes['document-item']} ${
                activeDocumentType === docType.type ? classes['active'] : ''
              } ${classes[docType.class]}`}
              onClick={() => {
                if (docType.level === 1) {
                  handleFolderToggle(docType.type);
                } else {
                  handleDocumentTypeSelect(docType.type);
                }
              }}>
              <i className={`fa-solid ${docType.class === 'folder' ? 'fa-folder' : 'fa-file'}`}></i>
              <span>{docType.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApprovalModalDocument;
