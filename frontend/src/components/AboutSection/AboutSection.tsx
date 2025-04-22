import { Box, Typography } from "@mui/material";

const AboutSection: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h1" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', mb: 10 }}>
        Welcome to the about us section of Learn Platform, where we aim to provide you with a deeper 
        understanding of our philosophy, values, and mission. Established in 2023, Learn Platform was born out of a 
        passion for learning and a belief in the power of knowledge to transform lives.
      </Typography>
      
      <Box 
        component="img"
        src="/images/team.png"
        alt="Team meeting"
        sx={{ 
          maxWidth: '100%',
          height: 'auto',
          mb: 7,
          maxHeight: 500
        }}
      />
    </Box>
  );
};

export default AboutSection;
