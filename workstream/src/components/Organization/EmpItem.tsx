import { useRef, useEffect } from 'react';
import classes from '../../pages/Approval/ApprovalSelect.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const EmpItem = ({
  empNo,
  empNm,
  rankNm,
  officeDutyNm,
  handleDragStart,
  searchResultEmpNm,
  addEmpHandler,
}: {
  empNo: string;
  empNm: string;
  rankNm: string;
  officeDutyNm: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleDragStart: Function;
  searchResultEmpNm: string;
  addEmpHandler: () => void;
}) => {
  const isSearchResult = empNm === searchResultEmpNm;
  const accordionHeaderRef = useRef<HTMLDivElement>(null);
  const loginUsername = useSelector((state: RootState) => state.auth.userInfo?.empNm);
  const isLoginUser = empNm === loginUsername;

  useEffect(() => {
    // 검색 시, 해당 직원의 위치만큼 스크롤 해주는 코드
    if ((isSearchResult || isLoginUser) && accordionHeaderRef.current) {
      accordionHeaderRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center',
      });
    }
  }, [isSearchResult]);

  return (
    <div className={classes['accordion-item']}>
      <div
        ref={accordionHeaderRef}
        className={`${classes['accordion-header']} ${
          isSearchResult ? classes['search-result'] : ''
        }`}
        draggable
        onDragStart={e => handleDragStart(e, empNo, empNm, rankNm, officeDutyNm)}
        onClick={addEmpHandler}>
        <i
          className="fa-solid fa-user"
          style={{ color: '#607485', fontSize: '13pt', paddingLeft: '5px' }}></i>
        <span style={{ fontSize: '10pt', fontWeight: '500' }}>{empNm}</span>
      </div>
    </div>
  );
};

export default EmpItem;
