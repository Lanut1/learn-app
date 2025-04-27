import { Container, Typography } from "@mui/material";
import JoinUsCard from "../components/JoinUsCard/JoinUsCard";

const JoinUsPage: React.FC = () => {
  return (
    <Container sx={{display: 'flex', flexDirection: 'column', gap: 9 }}>
      <Typography variant="h1" sx={{textAlign: 'center'}}>
        Join Us
      </Typography>
      <JoinUsCard variant="trainer"/>
      <JoinUsCard variant="student"/>
    </Container>
  )
}

export default JoinUsPage;
