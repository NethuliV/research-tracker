import React, { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RequireAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useContext(AuthContext);
  const token = auth?.token ?? null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
