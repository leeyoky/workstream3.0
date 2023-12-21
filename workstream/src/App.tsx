import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/index';
import { AuthenticatedRoutes, UnauthenticatedRoutes } from './routes';
import AlertManager from './helpers/AlertManager';

function App() {
  const isLogin: boolean = useSelector((state: RootState) => state.auth.isLogin);
  const token = useSelector((state: RootState) => state.auth.token);
  useEffect(() => {}, [isLogin]);
  return (
    <React.Fragment>
      <AlertManager />
      {token ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
    </React.Fragment>
  );
}

export default App;
