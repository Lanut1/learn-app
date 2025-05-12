import {
  Button, Container, TextField, Typography, Alert,
  Box
} from "@mui/material";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { changePasswordSchema } from "../../../validators/changePasswordValidator";
import { ChangePasswordFormProps, ChangePasswordInputs } from "../../../types/account.types";
import { LockOutline } from "@mui/icons-material";
import { Link as RouterLink } from 'react-router-dom';
import FullPageLoader from "../../PageLoading/PageLoading";

const ChangePasswordForm = ({onSubmit, loading, error}: ChangePasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInputs>({
    resolver: joiResolver(changePasswordSchema),
  });

  return (
    <Container maxWidth="lg">
      {loading && <FullPageLoader/>}
      <Typography variant="h3" mb={8}>
        Security
      </Typography>
      <Box sx={{display: "flex", justifyContent: "flex-start", alignItems: "flex-start", gap: 4}}>
        <Typography variant="h5" sx={{display: "flex", alignItems: "center", gap: 1, fontWeight: 600, width: "40%"}}>
          <LockOutline/>
          Change Password
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("currentPassword")}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
          />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("newPassword")}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Box sx={{display: "flex", justifyContent: "flex-end", gap: 2, mt: 2}}>
            <Button
              component={RouterLink}
              to="/my-account"
              size="large"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
            >
              Change Password
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default ChangePasswordForm;
