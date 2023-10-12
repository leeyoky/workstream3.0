import { organization } from './DummyData';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectedActions } from '../../store/Approval/approval-slice'
import classes from '../../pages/Approval/ApprovalSelect.module.css';
import store from '../../store';
import { getDepartment } from '../../api/axios';
import { useEffect } from 'react';

type OrganizationItem = {
  name: string;
  class?: string;
  type?: string;
  children?: OrganizationItem[];
};

type Employee = {
  name: string;
}

const OrganizationAccordion = () => {

  const dispatch = useDispatch();
  const approvalState = store.getState().approval;

  // API Text
  const fetchOrganization = async() => {
    try {
      const response = await getDepartment();
      const data = response.data;
      console.log(data);
    }catch(error){
      console.log("서버통신오류");
    }
  }

  useEffect(()=> {
    console.log("useEffect");
    fetchOrganization();
  },[])
  
  const handleEmpClick = async (emp: Employee) => {
    if (approvalState.approvers.length < 4) {
      await dispatch(selectedActions.addEmp(emp)); // 결재 직원 추가
    }
    // 결재 + 합의가 선택되었을때
    if (approvalState.selectedOption === 'addAgreement' 
      && approvalState.approvers.length === 4 
      && approvalState.agreements.length < 3) {
      await dispatch(selectedActions.addAgreement(emp)); // 합의 직원 추가
    }
  };

  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [openDepth2, setOpenDepth2] = useState<number | null>(null);
  const [openDepth3, setOpenDepth3] = useState<number | null>(null); // depth 3 상태 추가

  const toggleAccordion = (index: number) => {
    if (openAccordion === index) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(index);
    }

    setOpenDepth2(null);
    setOpenDepth3(null); // depth 1 클릭 시 depth 3 초기화
  };

  const toggleDepth2 = (index: number) => {
    setOpenDepth2(openDepth2 === index ? null : index);
  };

  const toggleDepth3 = (index: number) => {
    setOpenDepth3(openDepth3 === index ? null : index);
  };

  const createAccordionItem = (item: OrganizationItem, depth: number, index: number) => {
    const isOpen = openAccordion === index;
    const isDepth2Open = openDepth2 === index;
    const isDepth3Open = openDepth3 === index; // depth 3 상태 추가
    
    const toggleFunction = () => {
      if (depth === 1) {
        toggleAccordion(index);
      } else if (depth === 2) {
        toggleDepth2(index);
      } else if (depth === 3) {
        toggleDepth3(index); // depth 3 클릭 시 depth 4 초기화
      }
    };

    const itemClass = `${classes['accordion-item']} ${classes[`depth${depth}`] || ''}`;

    return (
      <div key={index} className={itemClass}>
        <div className={classes['accordion-header']} onClick={toggleFunction}>
          {item.type === 'emp' ? (
            <>
            <i className="fa-solid fa-user" style={{color: '#607485'}}></i>
            <span onClick={()=> handleEmpClick(item)}>{item.name}</span>
            </>
          ) : (
            <>
            <i className="fa-solid fa-folder"></i>
            <span>{item.name}</span>
            </>
          )}
        </div>
        {item.children && ((depth === 1 && isOpen) || (depth === 2 && isDepth2Open) || (depth === 3 && isDepth3Open)) && (
          <div className={classes['accordion-content']}>
            {item.children.map((child, childIndex) =>
              createAccordionItem(child, depth + 1, childIndex)
              )}
          </div>
        )}
      </div>
    );
  };

  return (
      <div className={classes['accordion']}>
        {organization.map((item, index) => createAccordionItem(item, 1, index))}
      </div>
  )
}

export default OrganizationAccordion;
