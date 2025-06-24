import { Box, Typography } from "@mui/material";
import VideoPlayer from "./VideoPlayer/VideoPlayer";

const HeroSection: React.FC = () => {
  return (
    <Box sx={{ textAlign: "center", mb: 15 }}>
      <Typography variant="h1" sx={{ mb: 5 }}>
        Let's start learning
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 800, mx: "auto", mb: 12.5 }}>
        Welcome to Learn Platform – where every day is a day to learn. Dive into
        the vast ocean of knowledge and empower yourself with the tools for a
        successful tomorrow. Happy learning!
      </Typography>

      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          mb: 6,
        }}
      >
        <VideoPlayer
          src="/videos/background.mp4"
          title="Introduction to Learn Platform"
          loop={false}
          aspectRatio="16/9"
        />
      </Box>
    </Box>
  );
};

export default HeroSection;
