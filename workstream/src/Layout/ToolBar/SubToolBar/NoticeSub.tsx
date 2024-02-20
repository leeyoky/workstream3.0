import { useState } from 'react';
import SubToolBar from '../SubToolBar';
import Button from '../../Button';
import CreateNoticeModal from '../../../components/Notice/CreateNoticeModal';

const NoticeSub = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태

  // 모달 열기 이벤트 핸들러
  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 이벤트 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <SubToolBar>
      <div className="sub-toolbar-menu-box">
        <Button onShowModal={handleShowModal}>공지 작성</Button>
        {isModalOpen && <CreateNoticeModal onClose={handleCloseModal} />}
      </div>
      <div className="sub-toolbar-menu-box notice-sub-menus">
        <strong>메인</strong>
        <ul>
          <li>
            <a>
              <span>공지사항</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="sub-toolbar-menu-box notice-sub-menus">
        <strong>작성</strong>
        <ul>
          <li>
            <a>
              <span>임시저장</span>
            </a>
          </li>
          <li>
            <a>
              <span>Email</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="sub-toolbar-menu-box notice-sub-menus">
        <strong>보관함</strong>
        <ul>
          <li>
            <a>
              <span>보낸 메일함</span>
            </a>
          </li>
        </ul>
      </div>
    </SubToolBar>
  );
};

export default NoticeSub;
