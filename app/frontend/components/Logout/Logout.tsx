import React from 'react';
import { useNavigate } from 'react-router-dom';
import standardRequest from '../../utils/standardRequest';
import { Button } from '@mui/material';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await standardRequest.delete('/logout', {
        withCredentials: true,
      });

      standardRequest.defaults.headers['X-CSRF-Token'] =
        response.data.csrf_token;
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <Button variant="outlined" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
