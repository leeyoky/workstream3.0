import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import SideToolBar from './components/SideToolBar';

import LoginPage from "./pages/LoginPage"
import MainPage from './pages/MainPage';
import AddressPage from './pages/AddressPage';
import ApprovalPage from './pages/ApprovalPage';

const AuthContext = createContext<{
  token: string | null,
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  token: null,
  setToken: () => {},
})

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  /* TODO: 로그인이 되어 있으면 MainPage */
  /* TODO: 로그인이 되어 있지 않으면 LoginPage */
  
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <React.StrictMode>
        <BrowserRouter>
          <Header/>
          {/* sideToolbar가 active면, margin-left: 4rem; */}
          <SideToolBar/>
          <div className="index-wrapper">
            <Routes>
              <Route path="/main" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/approval" element={<ApprovalPage />} />
              <Route path="/address" element={<AddressPage />} />
              {token ? <Route path="/" element={<Navigate to="/main" replace />} /> : <Route path="/" element={<Navigate to="/login" replace />} />}
            </Routes>
          </div>
        </BrowserRouter>
      </React.StrictMode>
    </AuthContext.Provider>
  )
}

export default App
