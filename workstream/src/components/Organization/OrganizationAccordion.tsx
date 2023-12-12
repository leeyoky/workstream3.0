import { useState, useEffect } from 'react';
import { getDepartment, getEmployeeInfo } from '../../api/axios';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { OrganizationItem, EmployeeItem } from '../../types/Organization/OrganizationType';

import classes from '../../pages/Approval/ApprovalSelect.module.css';
import EmpItem from './EmpItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectedActions } from '../../store/Approval/approval-slice';

interface OrganizationAccordionProps {
  searchText?: string;
  setSearchText?: any;
}

const OrganizationAccordion: React.FC<OrganizationAccordionProps> = ({
  searchText,
  setSearchText,
}) => {
  const [deptData, setDeptData] = useState<OrganizationItem[]>([]); /* 부서정보 */
  const [employeeData, setEmployeeData] = useState<EmployeeItem[]>([]); /* 직원정보 */
  const [openAccordion, setOpenAccordion] = useState<number | null>(null); /* 1레벨 아코디언 */
  const [openDepth2, setOpenDepth2] = useState<number | null>(null); /* 2레벨 아코디언 */
  const [openDepth3, setOpenDepth3] = useState<number | null>(null); /* 3레벨 아코디언 */
  const approvers = useSelector((state: RootState) => state.approval.approvers);
  const approvalApprovers = approvers.filter(approver => approver.approvalType === 'APPROVER');
  const isReference = useSelector((state: RootState) => state.approval.isReference);
  const ccDeptArr = useSelector((state: RootState) => state.approval.ccDept);
  const ccEmpArr = useSelector((state: RootState) => state.approval.ccUser);
  const loginUserInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const searchResultDept = employeeData.find(emp => emp.empNm === searchText);

  useEffect(() => {
    setSearchText(loginUserInfo?.empNm || '');
    console.log(searchText, 'searchText');
  }, []);

  useEffect(() => {
    // 검색어에 해당하는 사원이 있다면
    if (searchResultDept) {
      const deptItem = deptData.find(item => item.deptCd === searchResultDept.deptCd);

      const deptArr = [];
      let cd: string | undefined = searchResultDept.deptCd;

      deptArr.push(deptItem);

      while (cd !== '2009000001') {
        const dept = deptData.find(item => item.deptCd === cd);
        const upDept = deptData.find(item => item.deptCd === dept?.upDeptCd);
        cd = dept?.upDeptCd;
        deptArr.push(upDept);
      }

      deptArr.forEach(dept => {
        if (dept?.deptCd !== '2009000001') {
          const levelDept = deptData.filter(
            item => item.level === dept?.level && item.upDeptCd === dept.upDeptCd,
          );
          const index = levelDept.findIndex(item => item.deptCd === dept?.deptCd);
          const level = dept?.level;

          if (level === 1) {
            setOpenAccordion(index + 1);
          } else if (level === 2) {
            setOpenDepth2(index);
          } else if (level === 3) {
            setOpenDepth3(index);
          }
        }
      });
    } else {
      setOpenAccordion(null);
    }
  }, [searchText, deptData, employeeData]);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await getDepartment();
        const data = response.data;
        setDeptData(data);
      } catch (error) {
        console.error('서버 통신 오류', error);
      }
    };
    fetchOrganization();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeInfo();
        const data = response.data.content;
        setEmployeeData(data);
      } catch (error) {
        console.log('서버 통신 오류', error);
      }
    };
    fetchEmployee();
  }, []);

  const toggleAccordion = (index: number | null) => {
    if (openAccordion === index) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(index);
    }
    setOpenDepth2(null);
    setOpenDepth3(null);
  };

  const toggleDepth2 = (index: number | null) => {
    setOpenDepth2(openDepth2 === index ? null : index);
  };

  const toggleDepth3 = (index: number | null) => {
    setOpenDepth3(openDepth3 === index ? null : index);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLSpanElement>,
    empNo: string,
    empNm: string,
    rankNm: string,
    officeDutyNm: string,
    index: number,
  ) => {
    const empInfo = {
      empNo,
      name: empNm,
      rankName: rankNm,
      duty: officeDutyNm,
      approvalType: 'APPROVER',
      index,
    };

    // 객체를 문자열로 직렬화
    const empInfoString = JSON.stringify(empInfo);
    e.dataTransfer.setData('empName', empInfoString);
    dispatch(uiActions.setDraggingItem(empNm));
  };

  const addReference = (deptCd: string, deptNm: string) => {
    if (ccDeptArr.length < 10) {
      const ccDept = {
        deptCd,
        deptNm,
      };
      dispatch(selectedActions.addRefDepCd(ccDept));
    } else {
      alert('참조부서는 최대 10개 까지 추가 가능합니다.');
    }
  };

  /* 더블 클릭으로 직원 추가 */
  const addEmpHandler = (employee: any, index: any) => {
    const empData = {
      empNo: employee.empNo,
      name: employee.empNm,
      rankName: employee.rankNm,
      duty: employee.officeDutyNm,
      approvalType: 'APPROVER',
      index,
    };
    // 자기 자신인 경우 추가할 수 없음.
    if (employee.empNo === loginUserInfo?.empNo) {
      return;
    }
    // 참조자 추가 여부 확인
    if (!isReference) {
      // 승인자 추가
      if (approvalApprovers.length < 5) {
        dispatch(selectedActions.addEmp(empData));
      } else {
        alert('결재자는 기안자와 최종결재자를 포함한 최대 6명까지 선택 가능합니다.) ');
      }
    } else {
      if (ccEmpArr.length < 10) {
        dispatch(selectedActions.addRefEmp(empData));
      } else {
        alert('참조자는 10명 이상 추가할 수 없습니다.');
        return;
      }
    }
  };

  const createAccordionItem = (item: OrganizationItem, index: number, level: number) => {
    const isOpen = openAccordion === index;
    const isDepth2Open = openDepth2 === index;
    const isDepth3Open = openDepth3 === index;

    const itemClass = `${classes['accordion-item']} ${classes[`depth${item.level}`] || ''}`;
    const hasSubDepartments = deptData.some(subDept => subDept.upDeptCd === item.deptCd);
    const subEmployeeData = employeeData.filter(employee => employee.deptCd === item.deptCd);
    const boss = employeeData.filter(employee => employee.empNm === '이영상');

    const toggleFunction = () => {
      if (level === 0) {
        if (openAccordion === index) {
          toggleAccordion(null);
        } else {
          toggleAccordion(index);
        }
      } else if (level === 1) {
        toggleAccordion(index);
      } else if (level === 2) {
        toggleDepth2(index);
      } else if (level === 3) {
        toggleDepth3(index);
      }
    };

    return (
      <div key={index} className={itemClass}>
        <div className={classes['accordion-header']}>
          <div className={classes['accordion-header__toggle']} onClick={toggleFunction}>
            <i
              className={`fa-solid fa-folder${
                isOpen || isDepth2Open || isDepth3Open ? '-open' : ''
              }`}></i>
            <span>{item.deptNm}</span>
          </div>
          <div>
            {isReference && (
              <button onClick={() => addReference(item.deptCd, item.deptNm)}>+</button>
            )}
          </div>
        </div>

        {level === 0 && (
          <div className={classes['accordion-content']}>
            <div className={classes['accordion-item']}>
              <div
                className={classes['accordion-header']}
                draggable="true"
                onDragStart={e =>
                  handleDragStart(
                    e,
                    boss[0].empNo,
                    boss[0].empNm,
                    boss[0].officeDutyNm,
                    boss[0].rankNm,
                    index,
                  )
                }
                onClick={() => addEmpHandler(boss[0], index)}>
                <i className="fa-solid fa-user" style={{ color: '#607485', fontSize: '13pt' }}></i>
                <span style={{ fontSize: '10pt', fontWeight: '500' }}>
                  {boss.length > 0 ? boss[0].empNm : ''}
                </span>
              </div>
            </div>
          </div>
        )}

        {((level === 1 && isOpen) ||
          (level === 2 && isDepth2Open) ||
          (level === 3 && isDepth3Open)) && (
          <div className={classes['accordion-content']}>
            {subEmployeeData.map((employee, employeeIndex) => (
              <EmpItem
                key={employeeIndex}
                empNo={employee.empNo}
                empNm={employee.empNm}
                rankNm={employee.rankNm}
                officeDutyNm={employee.officeDutyNm}
                handleDragStart={handleDragStart}
                searchResultEmpNm={searchResultDept?.empNm || ''}
                addEmpHandler={() => addEmpHandler(employee, index)}
              />
            ))}
          </div>
        )}

        {hasSubDepartments && openAccordion === index && level === 1 && (
          <div className={classes['accordion-content']}>
            {deptData
              .filter(subDept => subDept.upDeptCd === item.deptCd)
              .map((subDept, subIndex) => createAccordionItem(subDept, subIndex, level + 1))}
          </div>
        )}
        {openDepth2 === index && level === 2 && (
          <div className={classes['accordion-content']}>
            {deptData
              .filter(subDept => subDept.upDeptCd === item.deptCd)
              .map((subDept, subIndex) => createAccordionItem(subDept, subIndex, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={classes['accordion']}>
      {deptData
        .filter(item => item.level === 1 || item.level === 0)
        .map((item, index) => createAccordionItem(item, index, item.level))}
    </div>
  );
};

export default OrganizationAccordion;
