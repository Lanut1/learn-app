import React from "react";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/authContext";

export interface SubmittedData {
  username: string;
  password: string;
  email: string;
}

interface SuccessRegistrationProps {
  submittedData: SubmittedData;
}

const SuccessRegistration: React.FC<SuccessRegistrationProps> = ({ submittedData }) => {
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();
    const response = await login(submittedData.email, submittedData.password);
    if (response) {
      navigate("/my-account");
    } else {
      console.error("Login failed");
    }
};

  return (
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3}}>
      <Typography variant="h2" gutterBottom>
        Registration
      </Typography>
      <Avatar sx={{ bgcolor: 'success.main', width: 72, height: 72 }}>
        <Check sx={{ fontSize: 48 }} />
      </Avatar>
      <Typography variant="h5" gutterBottom textAlign='center' width='35%'>
        Congratulations, you have successfully registered with Learn Platform! Here is your credentials that you can change in your account
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2}}>
        <Typography variant="h5" sx={{display: 'flex', flexDirection: "column" }}>
          <strong>Username:</strong> {submittedData.username}
        </Typography>
        <Typography variant="h5" sx={{display: 'flex', flexDirection: "column" }}>
          <strong>Password:</strong> {submittedData.password}
        </Typography>
      </Box>
      <Button
        component={RouterLink}
        to="/my-account"
        onClick={handleLogin}
        variant="contained"
        size="large"
      >
        My account
      </Button>
    </Container>
  );
};

export default SuccessRegistration;
