import { useSelector } from 'react-redux';
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import { RootState } from '../../../store';
interface ApprovalTypeCheckBoxProps {
  index: number;
  isDeferredCheck: boolean;
  isOverrideActive: boolean;
  deferClickHandler: () => void;
  overrideClickHandler: () => void;
  approvedYn: string;
}

const ApprovalTypeCheckBox: React.FC<ApprovalTypeCheckBoxProps> = ({
  index,
  isDeferredCheck,
  isOverrideActive,
  deferClickHandler,
  overrideClickHandler,
  approvedYn,
}) => {
  const approverEmps = useSelector((state: RootState) => state.approval.approvers);

  return (
    <>
      <label htmlFor="last" className="checkbox">
        <input
          style={{ visibility: index === approverEmps.length - 1 ? 'hidden' : 'visible' }}
          className={classes['button-box__checkbox']}
          type="checkbox"
          id="last"
          disabled={approvedYn !== 'N'}
          name={`approvalType_${index}`}
          checked={isDeferredCheck}
          onChange={deferClickHandler}></input>
      </label>
      <label htmlFor="pre" className="checkbox">
        <input
          style={{ visibility: index === approverEmps.length - 1 ? 'hidden' : 'visible' }}
          className={classes['button-box__checkbox']}
          type="checkbox"
          name="preliminaryApproval"
          id="pre"
          disabled={approvedYn !== 'N'}
          checked={isOverrideActive}
          onChange={overrideClickHandler}></input>
      </label>
    </>
  );
};

export default ApprovalTypeCheckBox;
