import React, { useEffect, useState } from "react";
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
import { UserData } from "../../../types/auth.types";
import { updateProfileSchema } from "../../../validators/updateProfileValidator";
import FullPageLoader from "../../PageLoading/PageLoading";
import { SPECIALIZATIONS } from "../../Registration/RegistrationForm/utils";
import { useAuth } from "../../../context/authContext";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import theme from "../../../theme";

const EditProfile = () => {
  const { loading, error, updateUserData, currentUser } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Partial<UserData>>({
    defaultValues: currentUser || {},
    resolver: joiResolver(updateProfileSchema),
  });

  const [previewPhoto, setPreviewPhoto] = useState<string | null>(
    currentUser?.photo || null,
  );

  useEffect(() => {
    if (currentUser) {
      reset(currentUser);
      setPreviewPhoto(currentUser.photo || null);
    }
  }, [currentUser, reset]);

  const handlePhotoUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewPhoto(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: Partial<UserData>) => {
    if (previewPhoto !== currentUser?.photo) {
      data.photo = previewPhoto || "";
    }

    await updateUserData(data);
  };

  const isTrainer = currentUser?.role === "trainer";

  if (loading) return <FullPageLoader />;

  return (
    <Container maxWidth={false} sx={{ width: "90%", mx: "auto" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
          }}
        >
          <Box
            sx={{ display: "flex", gap: 8, justifyContent: "space-between" }}
          >
            <Paper
              elevation={2}
              sx={{ padding: 4, borderRadius: 2, maxWidth: "50%" }}
            >
              <Typography variant="h3" gutterBottom>
                Edit Profile
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                  <Avatar
                    alt={currentUser?.firstName}
                    src={previewPhoto || ""}
                    variant="square"
                    sx={{
                      width: 160,
                      height: 160,
                      mb: 2,
                      border: `2px solid ${theme.palette.primary.main}`,
                      borderRadius: 1,
                    }}
                  >
                    {!previewPhoto &&
                      currentUser?.firstName.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" gutterBottom>
                      Upload a profile photo
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Your photo should be in PNG or JPG format
                    </Typography>
                    <Button variant="outlined" component="label" size="small">
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handlePhotoUploadChange}
                      />
                    </Button>
                    {previewPhoto && (
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ ml: 2 }}
                        onClick={() => setPreviewPhoto(null)}
                      >
                        Remove
                      </Button>
                    )}
                  </Box>
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                  <TextField
                    label="First Name"
                    margin="normal"
                    {...register("firstName")}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                  <TextField
                    label="Last Name"
                    margin="normal"
                    {...register("lastName")}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                  <TextField
                    label="Email"
                    disabled
                    margin="normal"
                    {...register("email")}
                  />
                  <TextField
                    label="Username"
                    margin="normal"
                    {...register("username")}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />

                  {!isTrainer && (
                    <>
                      <Controller
                        control={control}
                        name="dob"
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            value={
                              field.value ? dayjs(field.value as string) : null
                            }
                            label="Date of Birth (optional)"
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                margin: "normal",
                              },
                            }}
                          />
                        )}
                      />
                      <TextField
                        label="Address"
                        margin="normal"
                        {...register("address")}
                        error={!!errors.address}
                        helperText={errors.address?.message?.toString()}
                      />
                    </>
                  )}
                </Box>
              </Box>
            </Paper>

            {isTrainer && (
              <Controller
                control={control}
                name="specialization"
                render={({ field }) => (
                  <TextField
                    select
                    sx={{ maxWidth: "30%" }}
                    label="Specialization"
                    margin="normal"
                    {...field}
                  >
                    {SPECIALIZATIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
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
