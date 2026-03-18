import { Route, Router } from "react-router-dom";
import Register from "../pages/Register";
import { Navigate } from "react-router-dom";

import React, { useContext } from 'react'
import UserContext from "../context/UserContext";

const ProtectedRoutes = ({children}) => {
 const {token, loading} = useContext(UserContext)

 if (loading) return <div>Loading...</div>;

 if(!token){
  return <Navigate to="/login" replace />
 }
  return children
}

export default ProtectedRoutes
