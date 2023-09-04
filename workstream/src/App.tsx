import React, { createContext, useState } from 'react';
import LoginPage from "./pages/LoginPage"
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';

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
            <Routes>
              {/* {token ? <Route path="/main" element={<MainPage />} /> : <Route path="/" element={<LoginPage />} />} */}
              <Route path="/main" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              {token ? <Route path="/" element={<Navigate to="/main" replace />} /> : <Route path="/" element={<Navigate to="/login" replace />} />}
            </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </AuthContext.Provider>
  )
}

export default App
