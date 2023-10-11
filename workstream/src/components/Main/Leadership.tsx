import profile from '../../assets/img/profile.png'

const Leadership = () => {

  /* 부서 받아오기 */
  /* 이름 받아오기 */
  /* 직급 받아오기 */
  
  return (
  <div className='leadership-wrapper _card'>
    <div className='inner-box inner-box_leadership'>
      <div className='inner-box__title'>
        <i className="fa-solid fa-medal"></i>
      이달의 리더십
      </div>
      <div className="inner-box__content inner-box__content_leadership">
        <div className="emp-photo-box">
          <img src={profile} alt="" />
        </div>
        <div className='emp-content-box'>
          <div className='emp-content__title'>
            <strong>강이지 사원 / KM팀</strong>
          </div>
          <div className='emp-content__value'>
            <strong>소통, 도전정신</strong>
          </div>
          <div className='emp-content__paragraph'>
            <span>직원들과 소통을 잘하고, 새로운 것에 도전하려는 정신을 보여
              이달의 리더로 선정함
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Leadership