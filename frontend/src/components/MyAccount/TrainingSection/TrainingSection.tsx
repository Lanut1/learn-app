import React from "react";
import { Button, Typography, Box } from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';

const TrainingsSection: React.FC = () => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center"}} mt={10}>
      <Typography variant="h1">
        My Trainings
      </Typography>
      <Typography variant="h6" fontWeight={400} sx={{width: "50%"}}>
        The Training Section is interactive, allowing you to engage with trainers and fellow learners, participate in quizzes, and track your progress. All our courses are flexible and adaptable to your schedule and learning speed.
      </Typography>
      <Button variant="contained" size="large" sx={{ mt: 2 }} component={RouterLink} to="/my-account/trainings">
        View Trainings
      </Button>
    </Box>
  );
};

export default TrainingsSection;
