import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

const JoinUsSection: React.FC = () => {
  return (
    <Box
      sx={{ 
        py: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'background.default',
        borderRadius: '6px',
        width: '80%',
        margin: '0 auto'
      }}>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 180,
          height: 200,
          backgroundColor: 'primary.main',
          borderTopRightRadius: '100%',
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 200,
          height: 200,
          backgroundColor: '#FCD253',
          borderBottomLeftRadius: '100%',
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 185,
          height: 185,
          backgroundColor: 'background.default',
          borderBottomLeftRadius: '100%',
          zIndex: 1,
        }}
      />

      <Box
        component="img"
        src="/images/dots.svg"
        alt="dots"
        sx={{
          position: 'absolute',
          top: 0,
          left: '15%',
          zIndex: 0,
          objectFit: 'cover',
          width: '15%',
          height: '30%',
        }}
      />

      <Box
        component="img"
        src="/images/dots.svg"
        alt="dots"
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          zIndex: 0,
          objectFit: 'cover',
          width: '8%',
          height: '15%',
        }}
      />

      <Typography variant="h2" gutterBottom color="primary.main">
        Join us
      </Typography>
      <Typography variant="body1" color="text.primary" sx={{ mb: 3, maxWidth: '40%', textAlign: 'center' }}>
        Qui ut exercitation officia proident enim non tempor tempor ipsum ex nulla ea adipisicing sit consequat enim elit cupidatat o
      </Typography>
      <Button
        component={RouterLink}
        to="/join-us"
        variant="contained" 
        color="primary"
        sx={{ fontSize: '0.875rem', lineHeight: '1.375rem'}}
        size="large"
      >
        Join us
      </Button>
    </Box>
  );
};

export default JoinUsSection;
