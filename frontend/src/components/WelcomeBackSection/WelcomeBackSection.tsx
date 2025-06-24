import { Container, Typography } from "@mui/material";
import { useAuth } from "../../context/authContext";

const WelcomeBackSection = () => {
  const { currentUser } = useAuth();
  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography gutterBottom variant="h1">
        Hi, {currentUser?.firstName} !
      </Typography>
      <Typography variant="body1" mx={20}>
        Welcome to Learn Platform - where every day is a day to learn. Dive into
        the vast ocean of knowledge and empower yourself with the tools for a
        successful tomorrow. Happy learning!
      </Typography>
    </Container>
  );
};

export default WelcomeBackSection;
