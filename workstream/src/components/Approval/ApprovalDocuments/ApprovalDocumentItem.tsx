import React, { useState } from 'react';
import classes from '../../../pages/Approval/ApprovalSelect.module.css';

interface DocumentType {
  type: string;
  label: string;
  level: number;
  class: string;
  child?: DocumentType[];
}

interface ApprovalDocumentItemProps {
  docType: DocumentType;
  activeDocumentType: string;
  onSelect: (documentType: string) => void;
}

const ApprovalDocumentItem: React.FC<ApprovalDocumentItemProps> = ({
  docType,
  activeDocumentType,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (docType.child && docType.child.length > 0) {
      setIsOpen(!isOpen);
    } else {
      onSelect(docType.type);
    }
  };

  return (
    <div
      className={`${classes['document-item']} ${isOpen ? classes['open'] : ''} ${
        activeDocumentType === docType.type ? classes['active'] : ''
      }`}
      onClick={handleToggle}>
      <i
        className={`fa ${docType.class === 'folder' ? 'fa-folder' : 'fa-file'} ${classes['icon']}`}
      />
      <span>{docType.label}</span>
      {docType.child && docType.child.length > 0 && (
        <div className={classes['sub-documents']}>
          {docType.child.map(childDoc => (
            <ApprovalDocumentItem
              key={childDoc.type}
              docType={childDoc}
              activeDocumentType={activeDocumentType}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovalDocumentItem;
