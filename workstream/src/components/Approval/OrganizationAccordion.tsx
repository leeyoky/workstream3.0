import { useState, useEffect } from 'react';
import classes from '../../pages/Approval/ApprovalSelect.module.css';
import { getDepartment, getEmployeeInfo } from '../../api/axios';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

type OrganizationItem = {
  deptCd: number;
  deptNm: string;
  deptOrder: number;
  deptType: string;
  isFinal: string;
  level: number;
  modDate: string;
  modUsr: string;
  regDate: string;
  regUsr: string;
  upDeptCd: number;
  upDeptNm: string;
};
type EmployeeItem = {
  boss: string;
  deptCd: number;
  deptNm: string;
  email: string;
  empNm: string;
  empNo: string;
  loginId: string;
  officeDuty: string;
  officeDutyNm: string;
  rank: string;
  rankNm: string;
}

const OrganizationAccordion = () => {
  const [deptData, setDeptData] = useState<OrganizationItem[]>([]);
  const [employeeData, setEmployeeData] = useState<EmployeeItem[]>([]);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [openDepth2, setOpenDepth2] = useState<number | null>(null);
  const [openDepth3, setOpenDepth3] = useState<number | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await getDepartment();
        const data = response.data;
        setDeptData(data);
        console.log(data);
      } catch (error) {
        console.log("서버 통신 오류", error);
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
    e:React.DragEvent<HTMLSpanElement>, 
    empNo: string,
    empNm:string, 
    rankNm: string,
    officeDutyNm:string, 
    ) => {
      const empInfo = {
      empNo,
      name: empNm,
      rankName : rankNm,
      duty : officeDutyNm,
      approvalType: 'approve',
    }
    
    // 객체를 문자열로 직렬화 
    const empInfoString = JSON.stringify(empInfo)

    e.dataTransfer.setData('empName', empInfoString);
    dispatch(uiActions.setDraggingItem(empNm));
  };

  const createAccordionItem = (item: OrganizationItem, index: number, level: number) => {
    const isOpen = openAccordion === index;
    const isDepth2Open = openDepth2 === index;
    const isDepth3Open = openDepth3 === index;

    const itemClass = `${classes['accordion-item']} ${classes[`depth${item.level}`] || ''} ${openAccordion === index ? 'active' : ''}`;
    const hasSubDepartments = deptData.some((subDept) => subDept.upDeptCd === item.deptCd);

    const toggleFunction = async () => {
      if (level === 0) {
        if(openAccordion === index ) {
          toggleAccordion(null);
        }else{
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

    const subEmployeeData = employeeData.filter((employee) => employee.deptCd === item.deptCd);
    const boss = employeeData.filter((employee) => employee.empNm === '이영상');

    return (
      <div key={index} className={itemClass}>
        <div className={classes['accordion-header']} onClick={toggleFunction}>
        {level === 0 && <i className="fa-solid fa-folder-open"></i>}
        {level !== 0 && <i className="fa-solid fa-folder"></i>}  
          <span>{item.deptNm}</span>
        </div>

        { level === 0 &&
        <div className={classes['accordion-content']}>
          <div className={classes['accordion-item']}>
          <div 
            className={classes['accordion-header']}
            draggable="true"
            onDragStart={(e) => handleDragStart(
              e,boss[0].empNo ,boss[0].empNm, boss[0].officeDutyNm, boss[0].rankNm, )}
              >
            <i className="fa-solid fa-user" style={{ color: '#607485', fontSize: '13pt' }}></i>
            <span style={{ fontSize: '10pt', fontWeight: '500' }}>
            {boss.length > 0 ? boss[0].empNm : ''}</span>
          </div>
          </div>
        </div>}
        
        {
        ((level === 1 && isOpen ) || (level === 2 && isDepth2Open ) || (level === 3 && isDepth3Open)) &&
        (
          <div className={classes['accordion-content']}>
            {subEmployeeData.map((employee, employeeIndex) => (
              <div key={employeeIndex} className={classes['accordion-item']}>
                <div 
                  className={classes['accordion-header']}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(
                    e,employee.empNo ,employee.empNm, employee.officeDutyNm, employee.rankNm )}
                  >
                  <i className="fa-solid fa-user" style={{ color: '#607485', fontSize: '13pt', paddingLeft: '5px' }}></i>
                  <span style={{ fontSize: '10pt' }}>
                    {employee.empNm}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {hasSubDepartments && openAccordion === index && level === 1 && (
          <div className={classes['accordion-content']}>
            {deptData
              .filter((subDept) => subDept.upDeptCd === item.deptCd)
              .map((subDept, subIndex) => createAccordionItem(subDept, subIndex, level + 1))
              
            }
          </div>
        )}
        {openDepth2 === index && level === 2 && (
          <div className={classes['accordion-content']}>
            {deptData
              .filter((subDept) => subDept.upDeptCd === item.deptCd)
              .map((subDept, subIndex) => createAccordionItem(subDept, subIndex, level + 1))
            }
          </div>
        )}

      </div>
    );
  };

  return (
    <div className={classes['accordion']}>
      {deptData
        .filter((item) => item.level === 1 || item.level === 0 )
        .map((item, index) => createAccordionItem(item, index, item.level))
      }
    </div>
  );
};

export default OrganizationAccordion;
