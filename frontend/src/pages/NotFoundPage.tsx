import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Typography variant="h1" fontWeight="bold" mb={2}>
        404
      </Typography>
      <Typography variant="h3" mb={2}>
        Page Not Found
      </Typography>
      <Typography variant="body1" mb={4} color="text.secondary">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button variant="contained" size="large" component={RouterLink} to="/">
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
