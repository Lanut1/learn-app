import HeroSection from "../components/HeroSection/HeroSection";
import JoinUsSection from "../components/JoinUsSection/JoinUsSection";
import NewsSection from "../components/NewsSection/NewsSection";
import FullPageLoader from "../components/PageLoading/PageLoading";
import WelcomeBackSection from "../components/WelcomeBackSection/WelcomeBackSection";
import { useAuth } from "../context/authContext";

const HomePage: React.FC = () => {
  const {isAuthenticated, loading } = useAuth();

  if (loading) return (<FullPageLoader/>)

  return (
    <>
      {isAuthenticated ? (
        <>
          <WelcomeBackSection />
          <NewsSection />
        </>
      ) : (
        <>
          <HeroSection />
          <JoinUsSection />
        </>
      )}
    </>
  );
};

export default HomePage;
