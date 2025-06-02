import { useState, useEffect } from 'react';
import standardRequest from '../utils/standardRequest';
import { useLocation } from 'react-router-dom';

export const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await standardRequest.get('/logged_in');
        setLoggedIn(response.data.logged_in);
      } catch (error) {
        console.error('Authentication check failed', error);
        setLoggedIn(false);
      }
    };
    checkAuthentication();
  }, [location]);

  return loggedIn;
};
