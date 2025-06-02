import React from 'react';
import Logo from './Logo';
import { Grid } from '@mui/material';
import Logout from '../Logout/Logout';
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
  const loggedIn = useAuth();
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ padding: '0px 15px' }}
    >
      <Grid>
        <Logo />
      </Grid>
      <Grid>{loggedIn && <Logout />}</Grid>
    </Grid>
  );
};
