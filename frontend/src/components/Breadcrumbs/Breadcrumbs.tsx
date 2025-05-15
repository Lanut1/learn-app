import { Breadcrumbs, Link, Typography } from "@mui/material";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

const defaultBreadcrumbItems: BreadcrumbItem[] = [
  { label: "My Account", href: "/my-account" },
  { label: "Add Trainer" },
];

const BreadcrumbsNavigation = ({ breadcrumbItems = defaultBreadcrumbItems }: { breadcrumbItems?: BreadcrumbItem[] }) => {
  return (
    <Breadcrumbs sx={{ mb: 3 }}>
      {breadcrumbItems.map((item, index) =>
        item.href ? (
          <Link key={index} underline="hover" color="inherit" href={item.href}>
            {item.label}
          </Link>
        ) : (
          <Typography key={index} color="text.primary">
            {item.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNavigation;
