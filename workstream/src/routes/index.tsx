// routes.js
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from '../Layout/ToolBar/Header';
import SideToolBar from '../Layout/ToolBar/SideToolBar';
import MainPage from '../pages/MainPage';
import ApprovalPage from '../pages/Approval/ApprovalPage';
import ApprovalEdit from '../components/Approval/ApprovalEdit';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ApprovalManager from '../pages/Approval/ApprovalManager';
import NoticePage from '../pages/Notice/NoticePage';
import TodoPage from '../pages/Todo/TodoPage';

export function AuthenticatedRoutes() {
  const isSidebarOpen: boolean = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const isSubBarOpen: boolean = useSelector((state: RootState) => state.ui.isSubbarOpen);
  const isDarkMode: boolean = useSelector((state: RootState) => state.ui.isDarkMode);
  return (
    <React.Fragment>
      <Header />
      <div className={`test ${isDarkMode ? 'darkMode' : ''}`}>
        <SideToolBar />
        <main
          className={`index-wrapper ${!isSidebarOpen ? 'active' : ''} ${
            isSubBarOpen ? 'sub-bar' : ''
          } ${isDarkMode ? 'darkMode' : ''}`}>
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/notice" element={<NoticePage />} />
            <Route path="/approval/document" index element={<ApprovalPage />} />
            <Route path="/approval/temporary" element={<ApprovalPage />} />
            <Route path="/approval/pending" element={<ApprovalPage />} />
            <Route path="/approval/in-progress" element={<ApprovalPage />} />
            <Route path="/approval/completed" element={<ApprovalPage />} />
            <Route path="/approval/rejected" element={<ApprovalPage />} />
            <Route path="/approval/create" element={<ApprovalEdit />} />
            <Route path="/approval/detail/:id" element={<ApprovalEdit />} />
            <Route path="/approval/delegation" element={<ApprovalManager />} />
            <Route path="/todoList" element={<TodoPage />} />
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
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
