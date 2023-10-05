import classes from '../../pages/Approval/ApprovalSelect.module.css';

import { useState } from 'react';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { selectedActions } from '../../store/Approval/approval-slice';

import ApprovalAgreement from './ApprovalAgreement';
import ApprovalSelect from './ApprovalSelect';

const ApprovalLineSelector = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const dispatch = useDispatch();
  const approvers = useSelector((state: RootState) => state.approval.approvers);

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const removeAllHandler = () => {
    dispatch(selectedActions.removeAllEmps());
  };

  const undoHandler = () => {
    dispatch(selectedActions.undoEmp());
  };

  const numberOfItems = selectedOption === 'addAgreement' ? 7 : 4;

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
          {(selectedOption === 'approval' || selectedOption === '') && (
            <div className={classes['emp-list__1']}>
              {Array.from({ length: numberOfItems }, (_, index) => (
                <div key={index} className={classes['emp-item-wrapper']}>
                  <p>결재{index + 1}</p>
                  <div className={classes['emp-item']}>
                    {approvers[index] ? (
                      <>
                        <i className="fa-solid fa-user"></i>
                        <span>{approvers[index].name}</span>
                      </>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedOption === 'addAgreement' && (
            <>
              <div className={classes['emp-list__1']}>
                {Array.from({ length: numberOfItems }, (_, index) => (
                  <div key={index} className={classes['emp-item-wrapper']}>
                    <p>결재{index + 1}</p>
                    <div className={classes['emp-item']}>
                      {approvers[index] ? (
                        <>
                          <i className="fa-solid fa-user"></i>
                          <span>{approvers[index].name}</span>
                        </>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <ApprovalAgreement />
            </>
          )}
        </div>
        <div className={classes['emp-list-result__btn-wrapper']}>
          <button>반영</button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalLineSelector;
