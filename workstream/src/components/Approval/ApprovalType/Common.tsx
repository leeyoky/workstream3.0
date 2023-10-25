import logoSmall from '../../../assets/img/logo.png';
import classes from '../../../pages/Approval/Approval.module.css';
import TextEditor from '../../TextEditor';
import Signature from './Signature';

const Common = () => {

  const today = new Date();
  const getDate = today.toISOString().slice(0,10);

  return (
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
                  <td className={classes['header-table__approval-td']}></td>
                </tr>
                <tr>
                  <th className={classes['header-table__approval-th']}>품의일자</th>
                  <td>{getDate}</td>
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