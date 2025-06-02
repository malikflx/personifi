import React, { JSX, useEffect, useState } from 'react';
import standardRequest from '../utils/standardRequest';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await standardRequest.get('/logged_in');
        setAuthenticated(response.data.logged_in);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthentication();
  }, []);

  if (loading) return null;

  return authenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
