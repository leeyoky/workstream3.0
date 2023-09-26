import React from 'react';

import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom';
import { RootState } from './store/index';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Header from './Layout/Header';
import SideToolBar from './Layout/SideToolBar';
import ApprovalPage from './pages/ApprovalPage';
import AddressPage from './pages/AddressPage';
import NotFoundPage from './pages/NotFoundPage';


function App() {

  const isLogin: boolean = useSelector((state: RootState) => state.auth.isLogin);

  return (
      <React.Fragment>
        {isLogin && (
          <React.Fragment>
            <Header />
            <SideToolBar />
            <main className={`index-wrapper`}>
            <Routes>
              <Route path='/approval' element={<ApprovalPage/>} />
              <Route path='/address' element={<AddressPage/>} />
              <Route path='/*' element={<NotFoundPage/>} />
            </Routes>
            <Routes>
              <Route path="/main" element={<MainPage/>}/>
            </Routes>
            </main>
          </React.Fragment>
        )}
        {!isLogin && (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        )}
        {/* 로그인 페이지 */}
        
      </React.Fragment>
  );
}

export default App;
