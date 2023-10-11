import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RootState } from './store/index';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Header from './Layout/Header';
import SideToolBar from './Layout/SideToolBar';
import ApprovalPage from './pages/Approval/ApprovalPage';
import AddressPage from './pages/AddressPage';
import NotFoundPage from './pages/NotFoundPage';
import ApprovalEdit from './components/Approval/ApprovalEdit';

function App() {
  const isSidebarOpen: boolean = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const isLogin: boolean = useSelector((state: RootState) => state.auth.isLogin);

  return (
    <React.Fragment>
      {isLogin ? (
        <React.Fragment>
          <Header />
          <div className='test'>
            <SideToolBar />
            <main className={`index-wrapper ${isSidebarOpen ? 'active' : ''}`}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/approval" element={<ApprovalPage />} />
                <Route path="/address" element={<AddressPage />} />
                <Route path="/approvalEdit" element={<ApprovalEdit />} />
                <Route path="/*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </React.Fragment>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </React.Fragment>
  );
}

export default App;
