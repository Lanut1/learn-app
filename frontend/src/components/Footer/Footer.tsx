import React, { useState } from "react";
import {
  Box,
  Typography,
  Link,
  Button,
  Divider,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputBase,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  EmailOutlined,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [language, setLanguage] = useState<string>("en");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  const handleLanguageChange = (e: SelectChangeEvent): void => {
    setLanguage(e.target.value);
  };

  const productLinks = [
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
  ];

  const resourcesLinks = [
    { name: "Blog", path: "/blog" },
    { name: "Webinars", path: "/blog" },
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const legalLinks = [
    { name: "Terms of Service", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
        pt: 6,
        pb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          alignItems: "flex-start",
          px: 2,
        }}
      >
        <Typography
          variant="h3"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="/images/logo.svg"
            alt="Learn Portal"
            sx={{
              height: 40,
            }}
          />
          learn
        </Typography>

        <Box>
          <Typography variant="h4" gutterBottom>
            Product
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
            {productLinks.map((link) => (
              <Box component="li" key={link.name} sx={{ mb: 1 }}>
                <Link
                  component={RouterLink}
                  to={link.path}
                  variant="body2"
                  underline="none"
                  sx={{
                    color: "text.primary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {link.name}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="h4" gutterBottom>
            Resources
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
            {resourcesLinks.map((link) => (
              <Box component="li" key={link.name} sx={{ mb: 1 }}>
                <Link
                  component={RouterLink}
                  to={link.path}
                  variant="body2"
                  underline="none"
                  sx={{
                    color: "text.primary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {link.name}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="h4" gutterBottom>
            Company
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
            {companyLinks.map((link) => (
              <Box component="li" key={link.name} sx={{ mb: 1 }}>
                <Link
                  component={RouterLink}
                  to={link.path}
                  variant="body2"
                  underline="none"
                  sx={{
                    color: "text.primary",
                    "&:hover": { color: "primary.dark" },
                  }}
                >
                  {link.name}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
        <Box>
          <Typography
            variant="body1"
            sx={{ color: "primary.main" }}
            gutterBottom
          >
            Subscribe to our newsletter
          </Typography>
          <Typography variant="body2" gutterBottom>
            For product announcements and exclusive insights
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubscribe}
            noValidate
            sx={{
              display: "flex",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              overflow: "hidden",
              maxWidth: 480,
              width: "100%",
              bgcolor: "background.paper",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
                bgcolor: "background.paper",
              }}
            >
              <EmailOutlined color="action" />
            </Box>
            <InputBase
              placeholder="Input your email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              sx={{
                fontSize: "0.875rem",
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 0,
                px: 3,
                fontWeight: 600,
                fontSize: "0.875rem",
                textTransform: "none",
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <FormControl size="small" sx={{ mb: 2, bgcolor: "background.paper" }}>
          <Select
            value={language}
            onChange={handleLanguageChange}
            displayEmpty
            variant="outlined"
            sx={{
              fontSize: "0.875rem",
            }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            <MenuItem value="de">German</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Learn Portal.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: { xs: "flex-start", md: "flex-end" },
              flexWrap: "wrap",
            }}
          >
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                component={RouterLink}
                to={link.path}
                color="text.secondary"
                variant="body2"
                underline="none"
                sx={{
                  "&:hover": { color: "primary.main" },
                }}
              >
                {link.name}
              </Link>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton size="small" color="primary">
            <FacebookIcon />
          </IconButton>
          <IconButton size="small" color="primary">
            <TwitterIcon />
          </IconButton>
          <IconButton size="small" color="primary">
            <LinkedInIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
