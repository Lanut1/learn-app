import { Box } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{ backgroundColor: "background.paper" }}
    >
      <Header />

      <Box component="main" flexGrow={1} pt={6} pb={15}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
