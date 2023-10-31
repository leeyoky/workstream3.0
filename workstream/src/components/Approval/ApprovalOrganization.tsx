import { ChangeEvent, useState, useEffect } from 'react';
import { getEmployeeInfo } from '../../api/axios';
import classes from '../../pages/Approval/ApprovalSelect.module.css';
import OrganizationAccordion from '../Organization/OrganizationAccordion';
import { EmployeeItem } from '../Organization/OrganizationType';

const ApprovalOrganization = () => {
  const [searchText, setSearchText] = useState('');
  const [employeeData, setEmployeeData] = useState<EmployeeItem[]>([]);
  const [searchResults, setSearchResults] = useState<EmployeeItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeResponse = await getEmployeeInfo();
        const employeeData = employeeResponse.data.content;
        setEmployeeData(employeeData);
      } catch (error) {
        console.log("서버 통신 오류", error);
      }
    };

    fetchData();
  }, []);

  const searchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    performSearch(searchText);
  };

  const performSearch = (searchText: string) => {
    const filteredEmployeeData = employeeData.filter((item) => {
      return item.empNm.includes(searchText);
    });
  
    setSearchResults(filteredEmployeeData);
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
            onChange={searchChangeHandler}
          />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <OrganizationAccordion
          searchResults={searchResults} // 검색 결과를 전달
        />
      </div>
    </div>
  );
};

export default ApprovalOrganization;
