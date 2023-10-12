// App.js
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/index';
import { AuthenticatedRoutes, UnauthenticatedRoutes } from './routes';

function App() {
  const isLogin: boolean = useSelector((state: RootState) => state.auth.isLogin);

  return (
    <React.Fragment>
      {isLogin ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
    </React.Fragment>
  );
}

export default App;
