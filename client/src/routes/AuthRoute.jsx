import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

const AuthRoute = () => {
  const { token, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;

  if (token) {
    return <Navigate to="/user/me" replace />;
  }

  return <Outlet />;
};

export default AuthRoute;
