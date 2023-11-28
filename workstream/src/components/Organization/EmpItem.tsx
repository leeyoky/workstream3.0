import { useRef, useEffect } from 'react';
import classes from '../../pages/Approval/ApprovalSelect.module.css';

const EmpItem = ({ 
  empNo, 
  empNm, 
  rankNm, 
  officeDutyNm, 
  handleDragStart, 
  searchResultEmpNm 
}: { 
  empNo: string, 
  empNm: string, 
  rankNm: string, 
  officeDutyNm: string, 
  handleDragStart: Function, 
  searchResultEmpNm: string 
}) => {
  const isSearchResult = empNm === searchResultEmpNm;
  const accordionHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearchResult && accordionHeaderRef.current) {
      // 스크롤 위치를 조절하는 코드
      accordionHeaderRef.current.scrollIntoView({ behavior: 'auto', block: 'center', inline:'center' });
    }
  }, [isSearchResult]);

  return (
    <div className={classes['accordion-item']}>
      <div
        ref={accordionHeaderRef}
        className={`${classes['accordion-header']} ${isSearchResult ? classes['search-result'] : ''}`}
        draggable
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
