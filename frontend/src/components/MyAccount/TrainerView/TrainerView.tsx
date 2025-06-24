import React from "react";
import { Box } from "@mui/material";

import { UserData } from "../../../types/auth.types";
import ProfileCard from "../ProfileCard/ProfileCard";
import StudentsList from "./components/StudentsList";

interface TrainerViewProps {
  user: UserData;
}

const TrainerView: React.FC<TrainerViewProps> = ({ user }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 5,
      }}
    >
      <ProfileCard user={user} isTrainer />
      <StudentsList/>
    </Box>
  );
};

export default TrainerView;
