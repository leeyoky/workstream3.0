import React from 'react';
import classes from '../../pages/Approval/ApprovalSelect.module.css';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ApprovalAgreement from './ApprovalAgreement';

const ApprovalEmpResult: React.FC<{ selectedOption: string }> = ({ selectedOption }) => {
  
  const agreementItems = ['합의', '합의'];
  const approvers = useSelector((state: RootState) => state.approval.approvers);
  const agreements = useSelector((state: RootState) => state.approval.agreements);
  const agreementEmployees = [...agreements].slice(0, 2).map((emp) => emp.name);
  
  useEffect(() =>{
    console.log('편집창 approvers:', approvers);
    console.log('편집창 agreements:', agreements);
  }, [approvers, agreements])

  const renderApprovers = () => {
    return [1, 2, 3, 4].map((index) => (
      <div key={index} className={classes['emp-item-wrapper']}>
        <p>결재{index}</p>
        <div className={classes['emp-item']}>
          {approvers[index - 1] ? (
            <>
              <i className="fa-solid fa-user"></i>
              <span>{approvers[index - 1].name}</span>
            </>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
      </div>
    ));
  }
  return (
    <div className={classes['emp-list__result']}>
      {selectedOption === 'approval' && (
        <div className={classes['emp-list__1']}>
          {renderApprovers()}
        </div>
      )}
      {selectedOption === 'addAgreement' && (
        <>
          <div className={classes['emp-list__1']}>
            {renderApprovers()}
          </div>
          <ApprovalAgreement agreementItems={agreementItems} agreementEmployees={agreementEmployees} />
        </>
      )}
    </div>
  );
};

export default ApprovalEmpResult;
