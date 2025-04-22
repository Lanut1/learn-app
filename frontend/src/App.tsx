import "./App.css";
import { AuthProvider } from "./context/authContext";
import '@fortawesome/fontawesome-free/css/all.min.css';
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>

  );
}

export default App;
