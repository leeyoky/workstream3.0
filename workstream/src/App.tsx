import React, { useContext } from 'react';
import { Route, Navigate, BrowserRouter, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import AuthContext from './store/auth-context';
import Header from './components/Header';
import SideToolBar from './components/SideToolBar';

function App() {
  const ctx = useContext(AuthContext);

  return (
      <React.Fragment>
        {/* 사용자가 로그인한 경우 */}
        {ctx?.isLogin && (
          <React.Fragment>
            <Header />
            <SideToolBar />
            <main className={`index-wrapper ${ctx?.sideBarClass}`}>
            <Routes>
              <Route path="/main" element={<MainPage/>}/>
            </Routes>
            </main>
          </React.Fragment>
        )}
        {/* 사용자가 로그인하지 않았을 때 */}
        {!ctx?.isLogin && <Navigate to="/login" />}
        {/* 로그인 페이지 */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </React.Fragment>
  );
}

export default App;
