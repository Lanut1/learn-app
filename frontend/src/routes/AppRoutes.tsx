import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Layout from "../components/Layout/Layout";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import JoinUsPage from "../pages/JoinUsPage";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";
import BlogPage from "../pages/BlogPage";
import MyAccountPage from "../pages/MyAccountPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";

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
          {/* <Route path="/training" element={<Training />} />
          <Route path="/change-password" element={<ChangePassword />} /> */}
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
