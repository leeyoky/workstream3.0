import React from 'react';

interface ButtonProps {
  onShowModal: () => void; // 모달 열기 이벤트 핸들러
  children: React.ReactNode; // 버튼 내용을 동적으로 설정하기 위한 속성
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <div className="button-box">
      <button className="write-btn" onClick={props.onShowModal}>
        {props.children} {/* 버튼 내용을 props.children으로 출력 */}
      </button>
    </div>
  );
};

export default Button;
