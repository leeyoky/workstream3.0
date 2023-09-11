// AuthContext.tsx

import React, { createContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// AuthContext의 타입 정의
interface AuthContextType {
  isLogin: boolean;
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
  onActive: boolean;
  toggleActive: () => void;
  sideBarClass: string;
}

// createContext를 사용하여 컨텍스트를 생성합니다.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 컴포넌트 속성 타입 정의
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [onActive, setOnActive] = useState(false);
  const [sideBarClass, setSideBarClass] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 로딩 시 실행
    const storedUserLoginInfo = localStorage.getItem('token');
    
    if (storedUserLoginInfo === '') {
      // 'token'이 로컬 스토리지에 있을 때 로그인 상태로 설정
      setIsLogin(false);
      console.log("unvailable Token");
      navigate('/login')
    }
  }, [navigate]);

  // 로그인
  const loginHandler = () => {
    setIsLogin(true);
  };

  // 로그아웃
  const logoutHandler = () => {
    localStorage.removeItem('token')
    console.log("========  DELETE TOKEN ===========");
    setIsLogin(false);
    console.log("========  LOGOUT ===========");
    
  };

  // 사이드 메뉴 토글 
  const toggleActive = () => {
    setOnActive(!onActive);
    setSideBarClass(onActive? '': 'active')
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin: isLogin,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onActive: onActive,
        toggleActive: toggleActive,
        sideBarClass: sideBarClass,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
