import {
  TextField,
  Box,
  Typography,
  Button,
  Container,
  Avatar,
  Alert,
  MenuItem,
  Paper,
} from "@mui/material";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";

import { UserData } from "../../../types/auth.types";
import { updateProfileSchema } from "../../../validators/updateProfileValidator";
import FullPageLoader from "../../PageLoading/PageLoading";
import { SPECIALIZATIONS } from "../../Registration/RegistrationForm/utils";
import { useAuth } from "../../../context/authContext";
import theme from "../../../theme";

const EditProfile = () => {
  const { loading, error, updateUserData, currentUser } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<Partial<UserData>>({
    defaultValues: currentUser || {},
    resolver: joiResolver(updateProfileSchema),
    mode: "onChange",
  });

  const onSubmit = async (currentFormValues: Partial<UserData>) => {
    const changedFieldNames = Object.keys(dirtyFields) as Array<keyof UserData>;

    if (changedFieldNames.length === 0) {
      console.log("No changes detected. Submission cancelled.");
      return;
    }

    const payloadForServer: Partial<UserData> = {};

    changedFieldNames.forEach(fieldName => {
      (payloadForServer as any)[fieldName] = currentFormValues[fieldName];
    });

    console.log(payloadForServer);

    await updateUserData(payloadForServer);
  };

  const onInvalid = (validationErrors: any) => {
    console.error("Form validation failed:", validationErrors);
  };

  const isTrainer = currentUser?.role === "trainer";

  if (loading) return <FullPageLoader />;

  return (
    <Container maxWidth={false} sx={{ width: "90%", mx: "auto" }}>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
          }}
        >
          <Box
            sx={{ display: "flex", gap: 8, justifyContent: "space-between", width: '100%' }}
          >
            <Paper
              elevation={2}
              sx={{ padding: 4, borderRadius: 2, flexGrow: 1, maxWidth: '60%' }}
            >
              <Typography variant="h3" gutterBottom>
                Edit Profile
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                  <Avatar
                    alt={currentUser?.firstName}
                    src={currentUser?.photo || ""}
                    variant="square"
                    sx={{
                      width: 160,
                      height: 160,
                      mb: 2,
                      border: `2px solid ${theme.palette.primary.main}`,
                      borderRadius: 1,
                    }}
                  >
                    {!currentUser?.photo && currentUser?.firstName?.charAt(0).toUpperCase()}
                  </Avatar>
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    margin="normal"
                    {...register("firstName")}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    margin="normal"
                    {...register("lastName")}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    disabled
                    margin="normal"
                    {...register("email")}
                  />
                  <TextField
                    fullWidth
                    label="Username"
                    margin="normal"
                    {...register("username")}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    margin="normal"
                    {...register("address")}
                    error={!!errors.address}
                    helperText={errors.address?.message?.toString()}
                  />

                  {!isTrainer && (
                    <>
                      <Controller
                        control={control}
                        name="dob"
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            label="Date of Birth (optional)"
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(newValue) => {
                              field.onChange(newValue ? newValue.format('YYYY-MM-DD') : null);
                            }}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                margin: "normal",
                                error: !!errors.dob,
                                helperText: typeof errors.dob?.message === "string" ? errors.dob.message : undefined,
                              },
                            }}
                          />
                        )}
                      />
                    </>
                  )}
                </Box>
              </Box>
            </Paper>

            {isTrainer && (
              <Box sx={{ minWidth: 250, maxWidth: '30%' }}>
                <Controller
                  control={control}
                  name="specialization"
                  render={({ field }) => (
                    <TextField
                      select
                      fullWidth
                      label="Specialization"
                      margin="normal"
                      {...field}
                      error={!!errors.specialization}
                      helperText={typeof errors.specialization?.message === "string" ? errors.specialization.message : undefined}
                    >
                      {SPECIALIZATIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 5, mt: 4 }}>
            <Button
              size="large"
              variant="outlined"
              component={RouterLink}
              to="/my-account"
            >
              Cancel
            </Button>
            <Button
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default EditProfile;
