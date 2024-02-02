const NewestEmp = () => {
  return (
    <div className="newestEmp-wrapper _card">
      <i className="fa-solid fa-caret-left"></i>
      <div className="inner-box inner-box-NewestEmp">
        <div className="inner-box__title">
          <i className="fa-solid fa-users"></i>
          최근 입사자
        </div>
        <div className="inner-box__content inner-box__content_leadership">
          <div className="emp-photo-box">
            <i className="fa-solid fa-user-tie"></i>
            {/* <img src={profile} alt="" /> */}
          </div>
          <div className="emp-content-box emp-content-box_NewestEmp">
            <div className="emp-content__title emp-content__title_NewestEmp">
              <strong>김춘배 / 인사총무</strong>
              <span>
                <i className="fa-solid fa-briefcase"></i>
                2023-10-11
              </span>
              <span>010-1234-1004</span>
              <span>nyanyanya@naya.com</span>
            </div>
          </div>
        </div>
      </div>
      <i className="fa-solid fa-caret-right"></i>
    </div>
  );
};

export default NewestEmp;
