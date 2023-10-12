import React from 'react';
import logoSmall from '../../../assets/img/logo.png';
import classes from '../../../pages/Approval/Approval.module.css';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Common = () => {

  const approvers = useSelector((state: RootState) => state.approval.approvers);
  const agreement = useSelector((state: RootState) => state.approval.agreements);

  useEffect(() =>{
    console.log("기본품의서 재 랜더링");
    console.log('approvers:', approvers);
    console.log('agreements:', agreement);
  }, [approvers, agreement]);

  return (
    <React.Fragment>
      <div className={classes['approval-wrapper']}>
        <form>
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
                      <td></td>
                    </tr>
                    <tr>
                      <th className={classes['header-table__approval-th']}>품의일자</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th className={classes['header-table__approval-th']}>시행일자</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th className={classes['header-table__approval-th']}>부서명</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th className={classes['header-table__approval-th']}>기안자</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th className={classes['header-table__approval-th']}>제목</th>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={classes['header__right']}>
                <table className={classes['header-table']}>
                  <tbody>
                    <tr>
                      <th rowSpan={4} style={{ width: '30px' }}>결재</th>
                      <th className={classes['header-table__approval-th']}>결재1</th>
                      <th className={classes['header-table__approval-th']}>결재2</th>
                      <th className={classes['header-table__approval-th']}>결재3</th>
                      <th className={classes['header-table__approval-th']}>결재4</th>
                    </tr>
                    <tr>
                    {approvers.slice(0, 4).map((approver, index) => (
                        <td className={classes['approver-content']} key={index}>
                          {approver.name}
                        </td>
                      ))}
                    </tr>
                  <tr>
                    <th className={classes['header-table__approval-th']}>합의</th>
                    <th className={classes['header-table__approval-th']}>합의</th>
                    <th></th>
                    <th></th>
                  </tr>
                  <tr>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <td className={classes['agreement-content']} key={index}>
                        {agreement[index] ? agreement[index].name : ''}
                      </td>
                    ))}
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </header>
          <footer>
            <div className={classes['footer-text']}>
              <span>위와 같이 품의하오니 검토 후 재가바랍니다.</span>
            </div>
            <p className={classes['footer']}>주식회사 데이터스트림즈</p>
          </footer>
      </form>
    </div>
  </React.Fragment>
  )
}

export default Common