import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Layout from "../components/Layout/Layout";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/registration" element={<Registration />} />
        <Route path="/registration-verification" element={<RegistrationVerification />} /> */}

        <Route element={<PrivateRoute />}>
          {/* <Route path="/my-account" element={<MyAccount />} />
          <Route path="/training" element={<Training />} />
          <Route path="/change-password" element={<ChangePassword />} /> */}
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
