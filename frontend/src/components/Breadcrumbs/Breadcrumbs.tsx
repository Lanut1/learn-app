import { Breadcrumbs, Link, Typography } from "@mui/material";

const BreadcrumbsNavigation = ({currentPage = "Add Trainer"}: {currentPage?: string} ) => {
  return (
    <Breadcrumbs sx={{ mb: 3 }}>
      <Link underline="hover" color="inherit" href="/my-account">
        My Account
      </Link>
      <Typography color="text.primary">{currentPage}</Typography>
    </Breadcrumbs>
  );
};

export default BreadcrumbsNavigation;
