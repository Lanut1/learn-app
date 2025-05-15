import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Layout from "../components/Layout/Layout";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import JoinUsPage from "../pages/JoinUsPage";

import BlogPage from "../pages/BlogPage";
import MyAccountPage from "../pages/MyAccountPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import { RegistrationForm } from "../components/Registration/RegistrationForm/RegistrationForm";

import EditProfilePage from "../pages/EditProfilePage";
import AddTrainerPage from "../pages/AddTrainerPage";
import TrainingsPage from "../pages/TrainingsPage";
import AddTrainingPage from "../pages/AddTrainingPage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join-us" element={<JoinUsPage />} />
        <Route path="/registration/trainer" element={<RegistrationForm variant="trainer" />} />
        <Route path="/registration/student" element={<RegistrationForm variant="student" />} />
        <Route path="/blog" element={<BlogPage/>} />

        <Route element={<PrivateRoute />}>
          <Route path="/my-account" element={<MyAccountPage />} />
          <Route path="/my-account/change-password" element={<ChangePasswordPage />} />
          <Route path="/my-account/edit-profile" element={<EditProfilePage/>} />
          <Route path="/my-account/add-trainer" element={<AddTrainerPage />} />
          <Route path="/my-account/trainings" element={<TrainingsPage />} />
          <Route path="/my-account/trainings/add-training" element={<AddTrainingPage/>} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
