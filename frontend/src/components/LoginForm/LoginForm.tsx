import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../context/authContext';
import FullPageLoader from '../PageLoading/PageLoading';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../../types/auth.types';
import { loginSchema } from '../../validators/loginValidator';
import { joiResolver } from '@hookform/resolvers/joi';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: joiResolver(loginSchema),
  });

  const onSubmit = async (data: LoginCredentials) => {
    const user = await login(data.email, data.password);
    if (user) navigate('/my-account');
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
        <Box sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Sign In
            </Typography>
            <Typography variant="body1">
              Welcome back
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {loading && <FullPageLoader/>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={ loading }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="fas fa-envelope" />
                    </InputAdornment>
                  ),
                }
              }}
            />

            <TextField
              fullWidth
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={loading}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="fas fa-lock" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{ mt: 2, mb: 3, py: 1.5 }}
            >
              Sign In
            </Button>

            <Typography variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", mb: 2, mx: "auto" }}>
              OR
            </Typography>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.primary">
                Don't have an account?{' '}
                <Link component={RouterLink} to="/join-us" underline="hover" fontWeight="medium">
                  Sign up
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
    </Container>
  );
};

export default LoginForm;
