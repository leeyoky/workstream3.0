import { useDispatch } from 'react-redux';
import IndexPage from '../IndexPage';
import { useEffect, useState } from 'react';
import { uiActions } from '../../store/ui-slice';
import { columns } from './AddressPageTag';
import classes from './AddressPage.module.css';
import { fetchAddress } from '../../api/endpoints/address';
import { AddressData } from '../../types/Main/Main';

const AddressPage = () => {
  const [addressData, setAddressData] = useState<AddressData[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAddressData();
    dispatch(uiActions.setSubToolBar(false));
  }, []);

  const fetchAddressData = async () => {
    try {
      const response = await fetchAddress();
      console.log(response.data);
      setAddressData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IndexPage boardTitle="사내연락망">
      <div className="board-wrapper">
        <table className="table-board">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>
                  <span>
                    <span>{column.name}</span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={classes['address-tbody']}>
            {addressData.map((item, index) => (
              <tr className="table-hover" key={index}>
                <td>
                  <span>{item.deptNm}</span>
                </td>
                <td>
                  <span>{item.empNm}</span>
                </td>
                <td>
                  <span>{item.officeDuty}</span>
                </td>
                <td>
                  <span>{item.rank}</span>
                </td>
                <td>
                  <span>{item.extNum}</span>
                </td>
                <td>
                  <span>{item.dirNum}</span>
                </td>
                <td>
                  <span>{item.email}</span>
                </td>
                <td>
                  <span>{item.skypeId}</span>
                </td>
                <td>
                  <span>{item.cellphone}</span>
                </td>
                <td>
                  <span>{item.tel}</span>
                </td>
                <td>
                  <span>{item.enterDate}</span>
                </td>
                <td>
                  <span>{item.birth}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </IndexPage>
  );
};

export default AddressPage;
