import { Typography, Box } from "@mui/material";
import { useAuth } from "../context/authContext";
import { isTrainer } from "../utils/isTrainer";
import StudentView from "../components/MyAccount/StudentView/StudentView";
import TrainerView from "../components/MyAccount/TrainerView/TrainerView";
import FullPageLoader from "../components/PageLoading/PageLoading";
import AccountActions from "../components/MyAccount/AccountActions/AccountActions";
import TrainingsSection from "../components/MyAccount/TrainingSection/TrainingSection";

const MyAccountPage = () => {
  const { currentUser, loading } = useAuth();
  const isTrainerPage = isTrainer(currentUser?.role);

  if (loading) return (<FullPageLoader/>)

  return (
    <>
      {currentUser && 
        (
          <Box mx={12}>
            <Typography variant="h1" align="center" mb={10}>
              My Account
            </Typography>
            { isTrainerPage ? <TrainerView user={currentUser} /> : <StudentView user={currentUser} />}
            <AccountActions />
            <TrainingsSection />
          </Box>
        )
      }
    </>
  );
};

export default MyAccountPage;
