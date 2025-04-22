import { Box, Typography } from "@mui/material";
import { teamMembers } from "./members.utils";
import TeamMember from "./TeamMember/TeamMember";

const TeamSection: React.FC = () => {
  return (
    <Box sx={{ px: 15, backgroundColor: "background.paper", display: "flex", justifyContent: "space-between" }}>
      <Box textAlign={"left"} maxWidth={"40%"}>
        <Typography variant="h2" gutterBottom sx={{ mb: 2 }}>
          Our Team
        </Typography>
        <Typography 
          variant="body1" 
        >
          At Learn Platform, we believe in a collaborative approach. Our talented team of educators and designers 
          create quality content.
        </Typography>
      </Box>
        
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              description={member.description}
              image={member.image}
            />
        ))}
      </Box>
    </Box>
  );
};

export default TeamSection;
