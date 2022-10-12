import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { getJWT } from '../lib/userService';

const ProtectedRoutes = () => {
  const auth = getJWT();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
