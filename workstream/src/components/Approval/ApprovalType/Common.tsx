import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import logoSmall from '../../../assets/img/logo.png';
import classes from '../../../pages/Approval/Approval.module.css';
import TextEditor from '../../TextEditor';
import Signature from './Signature';
import { RootState } from '../../../store';
import { fetchApprovalData } from '../../../api/axios';

const Common = () => {
  const initialFormData = {
    executionDate: '',
    title: '',
    content: '',
  }

  const [formData, setFormData] = useState(initialFormData);

  const today = new Date();
  const getDate = today.toISOString().slice(0,10);
  const getDateRemoveBar = today.toISOString().slice(0,10).replace(/-/g, '');
  const documentType = useSelector((state:RootState) => state.approval.documentType);
  const userInfo = useSelector((state:RootState) => state.auth.userInfo);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitFrom = async(e: React.FormEvent) => {
    e.preventDefault();

    /* Validation Check */

    try{
      const postData = {
        
      }
      await fetchApprovalData(postData);
    } catch(error){
      console.log(error);
    }

  }
  
  return (
    <form onSubmit={submitFrom}>
      <header className={classes['header-type']}>
        <div className={classes['header-logo']}>
          <img src={logoSmall} alt="Logo" />
        </div>
        <div className={classes['header-box__wrapper']}>
          <div className={classes['header__left__common']}>
            <table className={classes['header-table__common']}>
              <tbody>
                <tr>
                  <th className={classes['header-table__approval-th']}>문서번호</th>
                  <td className={classes['header-table__approval-td']}>
                    <span>DS_{documentType === 'common' && <span>품의서</span>}
                    _본부/부서명_{getDateRemoveBar}_1</span>
                  </td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>품의일자</th>
                  <td>{getDate}</td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>시행일자</th>
                  <td>
                    <input 
                      type="text"
                      name="executionDate"
                      // value={formData.executionDate}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>부서명</th>
                  <td><span>{userInfo?.deptNm}</span></td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>기안자</th>
                  <td><span>{userInfo?.empNm}</span></td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>제목</th>
                  <td>
                    <input 
                      type="text" 
                      name="title"
                      />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Signature />
        </div>
      </header>
      <TextEditor />
      <footer>
        <div className={classes['footer-text']}>
          <span>위와 같이 품의하오니 검토 후 재가바랍니다.</span>
        </div>
        <p className={classes['footer']}>주식회사 데이터스트림즈</p>
      </footer>
  </form>
  )
}

export default Common