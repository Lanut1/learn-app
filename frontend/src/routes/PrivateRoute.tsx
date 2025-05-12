import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  return !isAuthenticated && !loading ? <Navigate to="/login" replace/> : <Outlet />;
};

export default PrivateRoute;
