import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import MiniProfile from '../MiniProfile/MiniProfile';


const Header: React.FC = () => {
  const { isAuthenticated, logout, currentUser } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigationItems = [
    { name: 'Blog', path: '/blog' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About Us', path: '/about' }
  ];


  const renderNavigationItems = () => (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        alignItems: 'center',
        ml: 4
      }}
    >
      {navigationItems.map((item) => (
        <Typography
          key={item.name}
          component={RouterLink}
          to={item.path}
          variant="body2"
          sx={{ 
            mx: 2,
            textDecoration: 'none',
            position: 'relative',
            '&:hover': {
              color: 'primary.dark',
            },
          }}
        >
          {item.name}
        </Typography>
      ))}
    </Box>
  );

  const renderMobileNavigationItems = () => (
    <List>
      {navigationItems.map((item) => (
        <ListItem key={item.name} disablePadding>
          <ListItemButton 
            component={RouterLink} 
            to={item.path}
            onClick={toggleDrawer}
          >
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar position="static"
      sx={{ 
        backgroundColor: 'background.paper',
        boxShadow: 'none',
        borderBottom: 1,
        borderColor: 'divider',
        borderRadius: 2,
        elevation: 1
      }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h2"
              component={RouterLink}
              to="/"
              sx={{ 
                color: 'text.primary',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <img src="/images/logo.svg" alt="Learn Portal" height={40} />
              learn
            </Typography>
            {!isMobile && renderNavigationItems()}
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isAuthenticated ? (
                <MiniProfile onLogout={logout} username={currentUser?.username} userAvatar={currentUser?.photo} />
              ) : (
                <Box sx={{ ml: 2 }}>
                  <Typography
                    component={RouterLink}
                    to="/login"
                    color="primary"
                    variant='body2'
                    sx={{ mr: 2, textDecoration: 'none' }}
                  >
                    Sign In
                  </Typography>
                  <Button
                    component={RouterLink}
                    to="/join-us"
                    color="primary"
                    variant="contained"
                  >
                    Join Us
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isAuthenticated && <MiniProfile onLogout={logout} username={currentUser?.username} userAvatar={currentUser?.photo} />}
              <IconButton 
                color="primary" 
                aria-label="open drawer" 
                edge="end" 
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': { 
            width: '250px',
            padding: 2
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Box sx={{ px: 2 }}>
          {renderMobileNavigationItems()}
          
          {!isAuthenticated && (
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
              <Button
                component={RouterLink}
                to="/login"
                color="primary"
                variant="outlined"
                sx={{ mb: 1 }}
                fullWidth
                onClick={toggleDrawer}
              >
                Sign In
              </Button>
              <Button
                component={RouterLink}
                to="/join-us"
                color="primary"
                variant="contained"
                fullWidth
                onClick={toggleDrawer}
              >
                Join Us
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
