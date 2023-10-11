import React from 'react';
import classes from '../../pages/Approval/ApprovalSelect.module.css';
import { useState } from 'react';
import store, { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectedActions } from '../../store/Approval/approval-slice';

import ApprovalAgreement from './ApprovalAgreement';
import ApprovalSelect from './ApprovalLineSelect';

interface ApprovalEmpSelectorProps {
  onClose: () => void; // 모달 닫기 핸들러
}

const ApprovalEmpSelector:React.FC<ApprovalEmpSelectorProps> = (props) => {
  const [selectedOption, setSelectedOption] = useState<string>('approval');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const documentType = store.getState().approval.documentType;
  const approverArr = store.getState().approval.approvers;
  const approvers = useSelector((state: RootState) => state.approval.approvers);
  const agreements = useSelector((state: RootState) => state.approval.agreements)
  
  const agreementItems = ['합의', '합의'];
  const agreementEmployees = [...agreements].slice(0, 2).map((emp) => emp.name);

  // 결재라인 방식 선택
  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    dispatch(selectedActions.updateSelectedOption(e.target.value));
  };

  // 결재 직원을 전체 삭제
  const removeAllHandler = () => {
    dispatch(selectedActions.removeAllEmps());
  };

  // undo기능
  const undoHandler = () => {
    if (agreements.length > 0) {
      dispatch(selectedActions.undoAgreement());
    } else {
      dispatch(selectedActions.undoEmp());
    }
  };

  const goEdit = () => {
    
    if(documentType === ''){
      alert('작성할 문서가 선택되지 않았습니다.')
      return
    }
    if(selectedOption === ''){
      alert('결재라인 방식이 선택되지 않았습니다.')
      return
    }
    if(approverArr.length === 0){
      const isContinue = confirm('결재자가 선택되지 않았습니다. 건너뛰겠습니까?');
      if(!isContinue){
        return
      }
    }
    props.onClose();
    navigate('/approvalEdit')
  }

  return (
    <div className={classes['organization-selector__result-wrapper']}>
      <div className={classes['card']}>
        <ApprovalSelect
          selectedOption={selectedOption}
          selectChangeHandler={selectChangeHandler}
          undoHandler={undoHandler}
          removeAllHandler={removeAllHandler}
        />

        <div className={classes['emp-list__result']}>
          {/* 아무것도 선택하지 않았을 때, 결재 선택 */}
          {selectedOption === 'approval' && (
          <div className={classes['emp-list__1']}>
            {[1, 2, 3, 4].map((index) => (
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
            ))}
          </div>
        )}
          {/* 결재+합의 선택 */}
          {selectedOption === 'addAgreement' && (
            <>
              <div className={classes['emp-list__1']}>
                {[1, 2, 3, 4].map((index) => (
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
                ))}
              </div>
              <ApprovalAgreement agreementItems={agreementItems} agreementEmployees={agreementEmployees} />
            </>
          )}
        </div>
        <div className={classes['emp-list-result__btn-wrapper']}>
          <button onClick={goEdit}>완료</button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalEmpSelector;
