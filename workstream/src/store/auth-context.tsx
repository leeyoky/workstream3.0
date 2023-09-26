// AuthContext.tsx

import React, { createContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// AuthContext의 타입 정의
interface AuthContextType {
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
  // 로그인 여부
  const [isLogin, setIsLogin] = useState(false);
  const [onActive, setOnActive] = useState(false);
  const [token, setToken] = useState('');
  const [sideBarClass, setSideBarClass] = useState('');
  
  const navigate = useNavigate();
  
  useEffect(() => {

    const storedUserLoginInfo = localStorage.getItem('token');
    
    // 컴포넌트가 마운트될 때 초기 로딩 시 실행
    
    if (storedUserLoginInfo !== null) {
      setIsLogin(true);
      setToken(storedUserLoginInfo)
      console.log("Available Token");
    }
    if(storedUserLoginInfo === null){
      setIsLogin(false);
      console.log("Unvailable Token");
      navigate('/login')
    }
  }, []);

  // 사이드 메뉴 토글 
  const toggleActive = () => {
    setOnActive(!onActive);
    setSideBarClass(onActive? '': 'active')
  };

  return (
    <AuthContext.Provider
      value={{
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
