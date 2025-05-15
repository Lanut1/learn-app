import React from "react";
import { Typography, Box } from "@mui/material";
import FullPageLoader from "../components/PageLoading/PageLoading";
import { useAuth } from "../context/authContext";
import { isTrainer } from "../utils/isTrainer";
import TrainerTrainingView from "../components/MyAccount/TrainingSection/TrainerTrainingView";
import StudentTrainingView from "../components/MyAccount/TrainingSection/StudentTrainingView";
import BreadcrumbsNavigation, {
  BreadcrumbItem,
} from "../components/Breadcrumbs/Breadcrumbs";

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "My Account", href: "/my-account" },
  { label: "Trainings" },
];

const TrainingsPage: React.FC = () => {
  const { currentUser, loading } = useAuth();

  const isTrainerRole = isTrainer(currentUser?.role);

  if (loading) return <FullPageLoader />;

  return (
    <Box mx={12}>
      <BreadcrumbsNavigation breadcrumbItems={breadcrumbItems} />
      <Typography variant="h1" align="center" mb={5}>
        Trainings
      </Typography>
      {isTrainerRole ? <TrainerTrainingView /> : <StudentTrainingView />}
    </Box>
  );
};

export default TrainingsPage;
