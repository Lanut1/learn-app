import React from "react";
import { Box } from "@mui/material";

import { UserData } from "../../../types/auth.types";
import ProfileCard from "../ProfileCard/ProfileCard";
import TrainersList from "./components/TrainersList";

interface StudentViewProps {
  user: UserData;
}

const StudentView: React.FC<StudentViewProps> = ({ user }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 5,
      }}
    >
      <ProfileCard user={user} isTrainer={false} />
      <TrainersList/>
    </Box>
  );
};

export default StudentView;
