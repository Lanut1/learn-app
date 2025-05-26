import { Avatar, Paper, Typography } from "@mui/material";

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  description,
  image,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "background.default",
        px: 3,
        py: 4,
        height: "100%",
        width: 220,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Avatar
        src={image}
        alt={name}
        sx={{
          width: 140,
          height: 140,
          mb: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          border: "4px solid white",
        }}
      />
      <Typography variant="h5" component="h3" gutterBottom>
        {name}
      </Typography>
      <Typography
        variant="subtitle1"
        color="primary.main"
        gutterBottom
        sx={{ fontWeight: 500 }}
      >
        {role}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
};

export default TeamMember;
