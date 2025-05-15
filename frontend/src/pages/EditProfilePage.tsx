import React from 'react';
import { Box, Typography } from '@mui/material';
import EditProfile from '../components/MyAccount/EditProfile/EditProfile';

const EditProfilePage: React.FC = () => {
  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h1" align="center" mb={10}>
        My Account
      </Typography>
      <EditProfile />
    </Box>
  );
};

export default EditProfilePage;
