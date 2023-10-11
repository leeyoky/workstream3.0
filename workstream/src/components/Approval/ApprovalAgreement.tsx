// ApprovalAgreement.tsx
import React from 'react';
import classes from '../../pages/Approval/ApprovalSelect.module.css';

interface ApprovalAgreementProps {
  agreementItems: string[];
  agreementEmployees: string[]; // 합의 직원 이름 배열 추가
}

const ApprovalAgreement: React.FC<ApprovalAgreementProps> = ({ agreementItems, agreementEmployees }) => {
  return (
    <div className={classes['emp-list__agreement']}>
      {agreementItems.map((item, index) => (
        <div key={index} className={classes['emp-item-wrapper']}>
          <p>{item}</p>
          <div className={classes['emp-item']}>
            {agreementEmployees[index] ? (
              <>
              <i className="fa-solid fa-user"></i>
              <span>{agreementEmployees[index]}</span>
              </>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApprovalAgreement;
