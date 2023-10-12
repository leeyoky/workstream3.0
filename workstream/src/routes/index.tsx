// routes.js
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from '../Layout/Header';
import SideToolBar from '../Layout/SideToolBar';
import MainPage from '../pages/MainPage';
import ApprovalPage from '../pages/Approval/ApprovalPage';
import ApprovalEdit from '../components/Approval/ApprovalEdit';
import NotFoundPage from '../pages/NotFoundPage';
import AddressPage from '../pages/AddressPage';
import LoginPage from '../pages/LoginPage';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


export function AuthenticatedRoutes() {
  const isSidebarOpen: boolean = useSelector((state: RootState) => state.ui.isSidebarOpen);

  return (
    <React.Fragment>
      <Header />
      <div className='test'>
        <SideToolBar />
        <main className={`index-wrapper ${isSidebarOpen ? 'active' : ''}`}>
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/approval" element={<ApprovalPage />} />
            <Route path="/approval/edit" element={<ApprovalEdit />} />
            <Route path="/address" element={<AddressPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </React.Fragment>
  );
}

export function UnauthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
