import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode correctly

function isTokenExpired(token) {
  const decodedToken = jwtDecode(token);
  const currentTime = Math.trunc(Date.now() / 1000);
  return currentTime > decodedToken.exp;
}

function AuthWrapper(WrappedComponent) {

  const HOC = (props) => {
    const storedUserData = localStorage.getItem('userData');
    const storedAccessToken = storedUserData ? JSON.parse(storedUserData).token : null;
    if (!storedAccessToken || isTokenExpired(storedAccessToken)) {
      return <Navigate to="/get-started" replace />;
    } else {
      return <WrappedComponent {...props} />;
    }
  }
  return HOC
}

export default AuthWrapper;

