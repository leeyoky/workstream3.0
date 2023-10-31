import classes from '../../pages/Approval/ApprovalSelect.module.css';

const EmpItem = ({ empNo, empNm, rankNm, officeDutyNm, handleDragStart }: { empNo: string, empNm: string, rankNm: string, officeDutyNm: string, handleDragStart: Function }) => {
  return (
    <div className={classes['accordion-item']}>
      <div
        className={classes['accordion-header']}
        draggable="true"
        onDragStart={(e) =>
          handleDragStart(e, empNo, empNm, rankNm, officeDutyNm)
        }
      >
        <i className="fa-solid fa-user" style={{ color: '#607485', fontSize: '13pt', paddingLeft: '5px' }}></i>
        <span style={{ fontSize: '10pt', fontWeight: '500' }}>
          {empNm}
        </span>
      </div>
    </div>
  );
};

export default EmpItem;
