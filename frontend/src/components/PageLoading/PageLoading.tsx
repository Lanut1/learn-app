import { CircularProgress, Box, Typography } from '@mui/material';

const FullPageLoader: React.FC = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      bgcolor: 'rgba(255, 255, 255, 0.7)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1300,
    }}
  >
    <CircularProgress />
    <Typography variant='body2'>Loading...</Typography>
  </Box>
);

export default FullPageLoader;
