import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import FullPageLoader from "../components/PageLoading/PageLoading";


const PrivateRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return (<FullPageLoader/>)
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
