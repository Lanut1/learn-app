import React, { useState } from 'react';
import { 
  Avatar, 
  Box, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  Typography, 
  Switch, 
  Divider,
  useTheme
} from '@mui/material';
import { 
  Person as PersonIcon,
  Logout as LogoutIcon,
  DarkMode as DarkModeIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface MiniProfileProps {
  username?: string;
  userAvatar?: string;
  email?: string;
  onLogout: () => void;
  onThemeToggle?: (isDarkMode: boolean) => void;
  darkMode?: boolean;
}

const MiniProfile: React.FC<MiniProfileProps> = ({
  username = 'User',
  userAvatar,
  email = 'user@example.com',
  onLogout,
  onThemeToggle,
  darkMode = false
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMyAccountClick = () => {
    navigate('/my-account');
    handleCloseMenu();
  };

  const handleLogoutClick = () => {
    handleCloseMenu();
    onLogout();
    navigate('/');
  };
  
  const handleThemeToggle = () => {
    if (onThemeToggle) {
      onThemeToggle(!darkMode);
    }
  };

  return (
    <>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8
          }
        }}
        onClick={handleOpenMenu}
      >
        <Typography
          variant="body2"
          sx={{ 
            mr: 2,
            fontWeight: 700,
            color: 'text.primary',
            fontFamily: 'fontFamilySecondary',
          }}
        >
          {username}
        </Typography>

        <Avatar 
          src={userAvatar} 
          sx={{ 
            width: 51, 
            height: 51,
            border: `2px solid ${theme.palette.primary.main}`
          }}
        >
          {!userAvatar && username.charAt(0).toUpperCase()}
        </Avatar>
      </Box>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            elevation: 4,
            sx: {
              width: 240,
              mt: 1.5,
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
          list: {
            sx: {
              p: 0,
              m: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src={userAvatar}
            sx={{ 
              width: 48, 
              height: 48,
              mr: 2,
              border: `2px solid ${theme.palette.primary.main}`
            }}
          >
            {!userAvatar && username.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {username}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              {email}
            </Typography>
          </Box>
        </Box>
        
        <Divider/>
        
        <MenuItem onClick={handleMyAccountClick} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <Typography variant="body2">My Account</Typography>
        </MenuItem>
        
        {onThemeToggle && (
          <MenuItem sx={{ py: 1.5, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemIcon>
                <DarkModeIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <Typography variant="body2">Night mode</Typography>
            </Box>
            <Switch 
              size="small" 
              checked={darkMode} 
              onChange={handleThemeToggle}
              slotProps={{
                input: {
                  'aria-label': 'toggle dark mode'
                }
              }}
              color="primary"
            />
          </MenuItem>
        )}
        
        <MenuItem onClick={handleLogoutClick} sx={{ py: 1.5, mt: 0 }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          <Typography variant="body2">Sign out</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MiniProfile;
