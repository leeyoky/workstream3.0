import { useState, useEffect } from 'react';
import { getEmployeeInfo } from '../../../api/axios';
import classes from '../../../pages/Approval/ApprovalSelect.module.css';
import OrganizationAccordion from '../../Organization/OrganizationAccordion';
import { EmployeeItem } from '../../../types/Organization/OrganizationType';

const ApprovalOrganization = () => {
  const [searchText, setSearchText] = useState('');
  const [employeeData, setEmployeeData] = useState<EmployeeItem[]>([]);
  const [searchResults, setSearchResults] = useState<EmployeeItem[]>([]);
  const [empDeptCd, setEmpDeptCd] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeResponse = await getEmployeeInfo();
        const employeeData = employeeResponse.data.content;
        setEmployeeData(employeeData);
      } catch (error) {
        console.error("서버 통신 오류", error);
      }
    };

    fetchData();
  }, []);


  const performSearch = (searchText: string) => {
    const filteredEmployeeData = employeeData.filter((item) => {
      return item.empNm.includes(searchText);
    });
  
    setSearchResults(filteredEmployeeData);
    console.log(searchResults);

  };

  const searchButtonClickHandler = () => {
    performSearch(searchText);
    console.log('검색 버튼 클릭', searchText);
      if (searchResults.length > 0) {
      const deptCd = searchResults[0].deptCd;
      console.log("뭐요", deptCd);
      setEmpDeptCd(deptCd);
    }
  };


  return (
    <div className={classes['organization-selector__input-wrapper']}>
      <div className={classes['card']}>
        <div className={classes['card-header']}>
          <p>조직도</p>
          <hr />
        </div>
        <div className={classes['card-search']}>
          <input
            type="text"
            placeholder="사원을 검색해주세요"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={searchButtonClickHandler}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <OrganizationAccordion empDeptCd={empDeptCd} searchText={searchText}/>
      </div>
    </div>
  );
};

export default ApprovalOrganization;
