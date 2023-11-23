import { useState, useEffect } from 'react';
import { getDepartment, getEmployeeInfo } from '../../api/axios';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { OrganizationItem, EmployeeItem } from '../../types/Organization/OrganizationType';

import classes from '../../pages/Approval/ApprovalSelect.module.css';
import EmpItem from './EmpItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface OrganizationAccordionProps {
  empDeptCd?: string | null; // 선택된 부서 코드
  searchText?: string
}

const OrganizationAccordion: React.FC<OrganizationAccordionProps> = ({ empDeptCd , searchText }) => {
  const [deptData, setDeptData] = useState<OrganizationItem[]>([]);
  const [employeeData, setEmployeeData] = useState<EmployeeItem[]>([]);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [openDepth2, setOpenDepth2] = useState<number | null>(null);
  const [openDepth3, setOpenDepth3] = useState<number | null>(null);
  const isReference = useSelector((state:RootState) => state.approval.isReference);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await getDepartment();
        const data = response.data;
        setDeptData(data);
        console.log(data);
      } catch (error) {
        console.error("서버 통신 오류", error);
      }
    };
    fetchOrganization();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeInfo();
        const data = response.data.content;
        console.log(data);
        setEmployeeData(data);
      } catch (error) {
        console.log("서버 통신 오류", error);
      }
    };
    fetchEmployee();
  }, []);

  useEffect(() => {
    console.log('useEffect' , empDeptCd);
    
    if (empDeptCd) {
      const deptItem = deptData.find((item) => item.deptCd === empDeptCd);
      console.log('deptItem', deptItem);
      
      if (deptItem) {
        setOpenAccordion(deptItem.level as number);
        setOpenDepth2(deptItem.level === 1 ? parseInt(deptItem.deptCd, 10) : null);
        setOpenDepth3(deptItem.level === 2 ? parseInt(deptItem.deptCd, 10) : null);
      }
    }
  }, [empDeptCd, deptData]);

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
    index: number
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
    console.log('empInfoString', empInfoString);

    e.dataTransfer.setData('empName', empInfoString);
    dispatch(uiActions.setDraggingItem(empNm));
  };

  const createAccordionItem = (item: OrganizationItem, index: number, level: number) => {
    const isOpen = openAccordion === index;
    const isDepth2Open = openDepth2 === index;
    const isDepth3Open = openDepth3 === index;

    const itemClass = `${classes['accordion-item']} ${classes[`depth${item.level}`] || ''}`;
    const hasSubDepartments = deptData.some((subDept) => subDept.upDeptCd === item.deptCd);
    const subEmployeeData = employeeData.filter((employee) => employee.deptCd === item.deptCd);
    const boss = employeeData.filter((employee) => employee.empNm === '이영상');

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
        <div className={classes['accordion-header']} onClick={toggleFunction}>
          <i className={`fa-solid fa-folder${isOpen ? '-open' : ''}`}></i>
          <span>{item.deptNm}</span>
          {isReference &&
          <button>+</button>
          }
        </div>

        {level === 0 && (
          <div className={classes['accordion-content']}>
            <div className={classes['accordion-item']}>
              <div
                className={classes['accordion-header']}
                draggable="true"
                onDragStart={(e) => handleDragStart(
                  e, boss[0].empNo, boss[0].empNm, boss[0].officeDutyNm, boss[0].rankNm, index)}
              >
                <i className="fa-solid fa-user" style={{ color: '#607485', fontSize: '13pt' }}></i>
                <span style={{ fontSize: '10pt', fontWeight: '500' }}>
                  {boss.length > 0 ? boss[0].empNm : ''}
                </span>
              </div>
            </div>
          </div>
        )}

        {((level === 1 && isOpen) || (level === 2 && isDepth2Open) || (level === 3 && isDepth3Open)) && (
          <div className={classes['accordion-content']}>
            {subEmployeeData.map((employee, employeeIndex) => (
              <EmpItem
                key={employeeIndex}
                empNo={employee.empNo}
                empNm={employee.empNm}
                rankNm={employee.rankNm}
                officeDutyNm={employee.officeDutyNm}
                handleDragStart={handleDragStart}
              />
            ))}
          </div>
        )}

        {hasSubDepartments && openAccordion === index && level === 1 && (
          <div className={classes['accordion-content']}>
            {deptData
              .filter((subDept) => subDept.upDeptCd === item.deptCd)
              .map((subDept, subIndex) => createAccordionItem(subDept, subIndex, level + 1))}
          </div>
        )}
        {openDepth2 === index && level === 2 && (
          <div className={classes['accordion-content']}>
            {deptData
              .filter((subDept) => subDept.upDeptCd === item.deptCd)
              .map((subDept, subIndex) => createAccordionItem(subDept, subIndex, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={classes['accordion']}>
      {deptData
        .filter((item) => item.level === 1 || item.level === 0)
        .map((item, index) => createAccordionItem(item, index, item.level))}
    </div>
  );
};

export default OrganizationAccordion;
