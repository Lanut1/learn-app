import React from "react";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { ROLES } from "./utils";
import { Link as RouterLink } from "react-router-dom";
import { Role } from "../../types/auth.types";
import { isTrainer } from "../../utils/isTrainer";

interface RegisterCardProps {
  variant: Role;
}

const JoinUsCard: React.FC<RegisterCardProps> = ({ variant }) => {
  const isTrainerVariant = isTrainer(variant);

  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: 1.5,
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 3,
          flex: 1,
        }}
      >
        <Typography variant="h2">
          {isTrainerVariant ? ROLES.trainer.title : ROLES.student.title}
        </Typography>
        <Typography variant="subtitle1" color="text.primary" sx={{ mb: 2 }}>
          {isTrainerVariant
            ? ROLES.trainer.description
            : ROLES.student.description}
        </Typography>
        <Button
          component={RouterLink}
          to={`/registration/${isTrainerVariant ? "trainer" : "student"}`}
          variant="contained"
          color="primary"
          sx={{ width: "fit-content" }}
          size="large"
        >
          Join us
        </Button>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: "50%", borderRadius: "0 12px 12px 0", objectFit: "cover" }}
        image={isTrainerVariant ? ROLES.trainer.image : ROLES.student.image}
        alt={isTrainerVariant ? ROLES.trainer.altText : ROLES.student.altText}
      />
    </Card>
  );
};

export default JoinUsCard;
