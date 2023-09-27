import React, { useState, useEffect } from "react"
import BoardTitle from "../UI/BoardTitle"
import SearchForm from "../UI/SearchForm"
import {getUsersInfo} from "../api/axios"

interface addressType {
  name: string,
  department: string,
  email: string,
  join_date: number,
  phone: number,
  ext_number: number,
  position: string,
  responsibility: string,
  home_number: string,
  birthday: number,
  project: string,
}

const AddressPage = () => {
  const [address, setAddress] = useState<addressType[]>([]);

  const boardTitle = {
    title: '연락처'
  }
  const searchForm = {
    name: '이름'
  }
  const fetchAddressInfoHandler = async() => {
    try{
      const response = await getUsersInfo();
      const data = response.data;
      
      console.log(data);
      
      const transformedAddress = data.map((addressData:addressType) => {
        return {
          name: addressData.name,
          department: addressData.department,
          email: addressData.email,
          phone: addressData.phone,
          birthday: addressData.birthday,
          ext_number: addressData.ext_number,
          join_date: addressData.join_date,
          position: addressData.position,
          responsibility: addressData.responsibility,
          home_number: addressData.home_number,
          project: addressData.project,
        }
      })
      setAddress(transformedAddress)
    } catch(error) {
      console.log("서버통신 오류");
    }

  }

  useEffect(()=> {
    fetchAddressInfoHandler();
  },[])

  return (
    <React.Fragment>
      <BoardTitle title={boardTitle.title}/>
      <div className="index-box">
      <SearchForm name={searchForm.name}/>
      <div className="board-wrapper">
        <table className="table-board">
          <thead>
            <tr className="bg-grey-lighten-5">
              <th>이름</th>
              <th>부서</th>
              <th>직책</th>
              <th>직위</th>
              <th>내선</th>
              <th>핸드폰</th>
              <th>Email</th>
              <th>자택번호</th>
              <th>입사일</th>
              <th>생일</th>
              <th>소속그룹</th>
              <th>현재프로젝트</th>
            </tr>
          </thead>
          <tbody>
            {address.map((item, index) => (
              <tr key={index} className="table-hover">
                <td>{item.name}</td>
                <td>{item.department}</td>
                <td>{item.responsibility}</td>
                <td>{item.position}</td>
                <td>{item.ext_number}</td>
                <td>{item.position}</td>
                <td>{item.email}</td>
                <td>{item.home_number}</td>
                <td>{item.join_date}</td>
                <td>{item.birthday}</td>
                <td> - </td>
                <td>{item.project}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </React.Fragment>
  )
}

export default AddressPage