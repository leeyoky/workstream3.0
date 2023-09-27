import React, { createContext, useState, ReactNode } from 'react';

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
  const [onActive, setOnActive] = useState(false);
  const [sideBarClass, setSideBarClass] = useState('');
  

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
