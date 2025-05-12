import { Check } from "@mui/icons-material";
import { Avatar, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

const ChangePasswordSuccess = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <Typography variant="h2">
        Password changed
      </Typography>
      <Avatar sx={{ bgcolor: 'success.main', width: 72, height: 72 }}>
        <Check sx={{ fontSize: 48 }} />
      </Avatar>
      <Button
        component={RouterLink}
        to="/my-account"
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 2 }}
      >
        Go to My Account
      </Button>
    </Container>
  )
};

export default ChangePasswordSuccess;
