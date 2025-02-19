import React from 'react';
import { Box, Typography } from '@mui/material';

const Logo = () => {
  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: '600' }}
      >{`Personifi`}</Typography>
    </Box>
  );
};

export default Logo;
