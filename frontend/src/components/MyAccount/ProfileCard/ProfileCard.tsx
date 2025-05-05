import React from "react";
import { Typography, Avatar, Box } from "@mui/material";
import { UserData } from "../../../types/auth.types";
import theme from "../../../theme";
import UserStatus from "./components/UserStatus";
import InfoItem from "./components/InfoItem";

interface ProfileCardProps {
  user: UserData;
  isTrainer: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, isTrainer }) => {
  return (
    <Box sx={{width: "50%"}}>
      <Typography variant="h3" gutterBottom>My profile</Typography>
      <Box sx={{display: "flex", alignItems: "flex-start", justifyContent: "flex-start", gap: 3, mb: 3}}>
        <Avatar
          alt={user.firstName}
          src={user.photo}
          variant="square"
          sx={{ 
            width: 160,
            height: 160,
            mb: 2,
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: 1
          }}
        >
          {!user.photo && user.firstName.charAt(0).toUpperCase()}
        </Avatar>
        <UserStatus isActive={user.isActive}/>
      </Box>
      <InfoItem label="First Name" value={user.firstName}/>
      <InfoItem label="Last Name" value={user.lastName}/>
      <InfoItem label="User Name" value={user.username}/>
      {isTrainer && <InfoItem label="Specialization" value={user.specialization || "No specialization provided"}/>}
      {!isTrainer && <InfoItem label="Date of birth" value={user.dob || "No birthday provided"}/>}
      <InfoItem label="Address" value={user.address || "No address provided"}/>
      <InfoItem label="Email" value={user.email}/>
    </Box>
  );
};

export default ProfileCard;
